import {
  readJson,
  rateLimit,
  sameOrigin,
  RequestError,
} from "@/lib/request-guard";

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request))
      throw new RequestError("Request not allowed.", 403);
    if (!rateLimit(request, "contact", 5))
      return Response.json(
        { error: "Please wait a minute before trying again." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    const body = await readJson(request, 12000);
    if (
      body.website !== undefined &&
      (typeof body.website !== "string" || body.website.length)
    )
      throw new RequestError("Unable to submit this form.");
    const { name, email, message } = body;
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > 100 ||
      /[\r\n]/.test(name)
    )
      throw new RequestError("Enter a name between 1 and 100 characters.");
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    )
      throw new RequestError("Enter a valid email address.");
    if (
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.length > 2000
    )
      throw new RequestError(
        "Write a message between 10 and 2,000 characters.",
      );
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !to || !from)
      return Response.json(
        {
          error:
            "Message delivery is currently unavailable. Your message has not been sent. Please use a direct contact link if one is listed.",
        },
        { status: 503 },
      );
    const { Resend } = await import("resend");
    const { data, error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject: `Portfolio message from ${name.trim()}`,
      replyTo: email.trim(),
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });
    if (error || !data?.id)
      return Response.json(
        {
          error:
            "The email service could not accept your message. Please try again later.",
        },
        { status: 502 },
      );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof RequestError
            ? error.message
            : "Your message could not be sent. Please try again later.",
      },
      { status: error instanceof RequestError ? error.status : 500 },
    );
  }
}
