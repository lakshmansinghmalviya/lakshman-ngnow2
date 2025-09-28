import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    // Create transporter
    const userMail = process.env.GMAIL_USER || "lslakshman2024@gmail.com"
    const userPwd = process.env.GMAIL_APP_PASSWORD || "ceqfndbqtwobaxdc"
    const sendToWhom = process.env.SEND_TO_WHOM_EMAIL || "care@enginow.in"

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userMail,
        pass: userPwd,
      },
    })

    // Email content
    const mailOptions = {
      from: `"Enginow Newsletter" <${userMail}>`,
      to: sendToWhom,
      subject: `New Newsletter Subscription`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 24px;">New Newsletter Subscription</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Enginow Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Subscriber Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Subscribed At:</td>
                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #28a745; font-weight: bold;">📧 Add this email to your newsletter list</p>
          </div>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    console.log("✅ Newsletter subscription sent successfully to care@enginow.in")
    console.log("📧 Subscriber:", email)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    })

  } catch (error) {
    console.error("❌ Error sending newsletter subscription:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to subscribe. Please try again."
      },
      { status: 500 }
    )
  }
}