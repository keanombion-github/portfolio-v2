import { getIdentity } from "@/lib/auth";
import {
  readJson,
  rateLimit,
  sameOrigin,
  RequestError,
} from "@/lib/request-guard";

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request))
      throw new RequestError("This request is not allowed.", 403);
    if (!rateLimit(request, "recommendations", 5))
      return Response.json(
        { error: "Please wait a minute before trying again." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    const data = await readJson(request, 16000);
    if (
      data.website !== undefined &&
      (typeof data.website !== "string" || data.website.length)
    )
      throw new RequestError("Your recommendation could not be submitted.");
    const value = (key: string) =>
      typeof data[key] === "string" ? data[key].trim() : "";
    const name = value("name"),
      email = value("email"),
      role = value("role"),
      relationship = value("relationship"),
      quote = value("quote");
    if (!name || name.length > 100 || /[\r\n]/.test(name))
      throw new RequestError("Please enter a name under 100 characters.");
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new RequestError("Please enter a valid email address.");
    if (!relationship || relationship.length > 200 || role.length > 150)
      throw new RequestError(
        "Please check your role and working relationship.",
      );
    if (quote.length < 30 || quote.length > 3000)
      throw new RequestError("Please write between 30 and 3,000 characters.");
    if (data.consent !== "yes")
      throw new RequestError(
        "Please confirm permission to publish your recommendation.",
      );
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !to || !from)
      throw new RequestError(
        "Recommendation delivery is not available yet. Your recommendation has not been sent. Please try again later.",
        503,
      );
    const identity = await getIdentity();
    const identityNote = identity
      ? `GitHub identity confirmed by server: ${identity.profile} (${identity.name})`
      : "Submitted without GitHub sign-in.";
    const { Resend } = await import("resend");
    const { data: sent, error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Recommendation for review from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nRole: ${role || "Not supplied"}\nRelationship: ${relationship}\nPermission to publish: Yes\n${identityNote}\n\n${quote}\n\nReview before adding to the public recommendations.`,
    });
    if (error || !sent?.id)
      throw new RequestError(
        "Your recommendation could not be delivered. Please try again later.",
        502,
      );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof RequestError
            ? error.message
            : "Your recommendation could not be delivered. Please try again later.",
      },
      { status: error instanceof RequestError ? error.status : 502 },
    );
  }
}
