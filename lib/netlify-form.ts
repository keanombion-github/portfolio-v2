export async function submitNetlifyForm(
  form: HTMLFormElement,
  formName: "contact" | "recommendation",
  timeoutMs: number,
) {
  const data = new FormData(form);
  data.set("form-name", formName);
  const body = new URLSearchParams();
  for (const [key, value] of data) {
    if (typeof value === "string") body.append(key, value);
  }
  const response = await fetch("/form-definitions.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) {
    throw new Error("Your message could not be submitted. Please try again or email me directly.");
  }
}
