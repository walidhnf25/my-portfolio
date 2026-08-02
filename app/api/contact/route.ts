import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); border-radius: 16px 16px 0 0; padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      New Portfolio Message
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.8);">
                      You received a new contact form submission
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Card -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- Sender Info -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e4e4e7;">
                    <table width="100%" cellpadding="0" cellspacing="0" valign="middle">
                      <tr>
                        <!-- Avatar -->
                        <td width="40" style="vertical-align: middle;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); border-radius: 50%; text-align: center;">
                            <span style="color: #ffffff; font-size: 16px; font-weight: 600; line-height: 40px; display: inline-block;">
                              ${name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <!-- Name & Email -->
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <h2 style="margin: 0 0 2px 0; font-size: 14px; font-weight: 600; color: #18181b; line-height: 1.3;">
                            ${name}
                          </h2>
                          <p style="margin: 0; font-size: 13px; color: #71717a; line-height: 1.3;">
                            <a href="mailto:${email}" style="color: #71717a; text-decoration: none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Subject -->
                ${subject ? `
                <tr>
                  <td style="padding-top: 24px;">
                    <span style="display: inline-block; font-size: 11px; font-weight: 600; color: #0d9488; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      Subject
                    </span>
                    <p style="margin: 0; font-size: 16px; color: #27272a; font-weight: 500;">
                      ${subject}
                    </p>
                  </td>
                </tr>
                ` : ''}

                <!-- Message -->
                <tr>
                  <td style="padding-top: 24px;">
                    <span style="display: inline-block; font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      Message
                    </span>
                    <div style="background-color: #f4f4f5; border-radius: 12px; padding: 20px;">
                      <p style="margin: 0; font-size: 15px; color: #27272a; line-height: 1.6; white-space: pre-wrap;">
${message}
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Quick Reply Button -->
                <tr>
                  <td style="padding-top: 28px;">
                    <a href="mailto:${email}?subject=${encodeURIComponent(subject || 'Re: Your message')}" style="display: inline-block; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 14px; font-weight: 600;">
                      Quick Reply
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; border-radius: 0 0 16px 16px; padding: 24px 32px; border-top: 1px solid #e4e4e7;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">
                      Sent from portfolio website · ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["walidhnf12@gmail.com"],
      subject: subject || `New message from ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}