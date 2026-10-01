export class RequestError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export async function readJson(
  request: Request,
  maxBytes = 16000,
): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new RequestError("Send a JSON request.", 415);
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError("A request body is required.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError("Your message is too large.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new RequestError("Invalid JSON.");
  }
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new RequestError("Invalid request.");
  return value as Record<string, unknown>;
}

// Best-effort, bounded per-instance protection. Not a distributed rate limiter.
// Forwarded IPs must be overwritten by a trusted hosting proxy in production.
const buckets = new Map<string, { count: number; expires: number }>();
export function rateLimit(
  request: Request,
  scope: string,
  limit: number,
): boolean {
  const now = Date.now();
  for (const [key, bucket] of buckets)
    if (bucket.expires <= now) buckets.delete(key);
  const ip =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim()
      .slice(0, 100) || "unknown";
  const key = `${scope}:${ip}`;
  const bucket = buckets.get(key);
  if (bucket) {
    bucket.count++;
    return bucket.count <= limit;
  }
  if (buckets.size >= 2000) return false;
  buckets.set(key, { count: 1, expires: now + 60000 });
  return true;
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const host = request.headers.get("host") || new URL(request.url).host;
    return (
      ["http:", "https:"].includes(originUrl.protocol) &&
      originUrl.host === host
    );
  } catch {
    return false;
  }
}
