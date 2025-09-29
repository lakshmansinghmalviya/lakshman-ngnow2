import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            firstName,
            lastName,
            email,
            phone,
            whatsapp,
            linkedin,
            city,
            state,
            education,
            experience,
            motivation,
            referralCode,
            agreeTerms,
            agreeMarketing,
        } = body

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !city || !state) {
            return NextResponse.json(
                { success: false, error: "Required fields are missing" },
                { status: 400 }
            )
        }

        // Create transporter
        const userMail = process.env.GMAIL_USER || "lslakshman2024@gmail.com"
        const userPwd = process.env.GMAIL_APP_PASSWORD || "lsouyiqiylvmbinr"
        const sendToWhom = process.env.SEND_TO_WHOM_EMAIL || "care@enginow.in"

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: userMail,
                pass: userPwd,
            },
        })

        // Email template
        const mailOptions = {
            from: `"Enginow Enrollments" <${userMail}>`,
            to: sendToWhom,
            subject: `New Enrollment: ${firstName} ${lastName}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg,#667eea,#764ba2); color: white; padding: 20px; text-align: center; border-radius: 8px;">
            <h2 style="margin: 0;">🎉 New Premium Course Enrollment</h2>
            <p style="margin: 5px 0 0;">Enginow - Learn Fast, Understand Better</p>
          </div>
          <div style="padding: 20px;">
            <h3>Student Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td><b>Full Name:</b></td><td>${firstName} ${lastName}</td></tr>
              <tr><td><b>Email:</b></td><td>${email}</td></tr>
              <tr><td><b>Phone:</b></td><td>${phone}</td></tr>
              <tr><td><b>WhatsApp:</b></td><td>${whatsapp}</td></tr>
              <tr><td><b>LinkedIn:</b></td><td><a href="${linkedin}" target="_blank">${linkedin}</a></td></tr>
              <tr><td><b>City:</b></td><td>${city}</td></tr>
              <tr><td><b>State:</b></td><td>${state}</td></tr>
              <tr><td><b>Education:</b></td><td>${education}</td></tr>
              <tr><td><b>Experience:</b></td><td>${experience} years</td></tr>
              <tr><td><b>Motivation:</b></td><td>${motivation}</td></tr>
              <tr><td><b>Referral Code:</b></td><td>${referralCode || "N/A"}</td></tr>
              <tr><td><b>Agreed to Terms:</b></td><td>${agreeTerms ? "✅ Yes" : "❌ No"}</td></tr>
              <tr><td><b>Agreed to Marketing:</b></td><td>${agreeMarketing ? "✅ Yes" : "❌ No"}</td></tr>
            </table>
          </div>
          <p style="text-align:center; color:#555; font-size:12px; margin-top:20px;">
            Sent at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        console.log("✅ Enrollment email sent successfully")

        // After sending email → redirect to payment page
        return NextResponse.json({
            success: true,
            message: "Enrollment submitted successfully!",
            redirectUrl: "/payment", // frontend should handle this redirect
        })
    } catch (error) {
        console.error("❌ Error sending enrollment email:", error)
        return NextResponse.json(
            { success: false, error: "Failed to submit enrollment." },
            { status: 500 }
        )
    }
}