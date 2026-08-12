import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("TENTATIVA DE ENVIO - Chave de API carregada?", !!process.env.RESEND_API_KEY);
  
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Chave do Resend ausente no .env.local" }, { status: 500 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.RESEND_TO_EMAIL || email],
      subject: `[SYSTEM_ALERT] Nova conexão de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="dark">
          <meta name="supported-color-schemes" content="dark">
        </head>
        <body style="background-color: #050505; margin: 0; padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#050505" style="background-color: #050505; color: #E0E0E0; font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; border: 1px solid #1A1A1B; border-radius: 8px;">
            <tr>
              <td style="padding: 40px;">
                <div style="border-bottom: 2px solid #00f3ff; padding-bottom: 20px; margin-bottom: 30px;">
                  <h2 style="color: #00f3ff; margin: 0; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                    // INCOMING_TRANSMISSION
                  </h2>
                  <p style="color: #888; font-size: 12px; margin-top: 5px;">Secure communication established.</p>
                </div>
                
                <div style="margin-bottom: 25px;">
                  <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase;">[NAME_ID]</p>
                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #ffffff;">${name}</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                  <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase;">[COMM_LINK]</p>
                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #00f3ff;"><a href="mailto:${email}" style="color: #00f3ff; text-decoration: none;">${email}</a></p>
                </div>
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0a0a0a" style="background-color: #0a0a0a; border: 1px solid #1A1A1B; border-radius: 4px;">
                  <tr>
                    <td style="padding: 20px;">
                      <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase;">[PAYLOAD_DATA]</p>
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d0d0d0; white-space: pre-wrap;">${message}</p>
                    </td>
                  </tr>
                </table>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1A1A1B; text-align: center;">
                  <p style="color: #555; font-size: 10px; margin: 0;">// SYSTEM_ROUTINE_COMPLETED</p>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
