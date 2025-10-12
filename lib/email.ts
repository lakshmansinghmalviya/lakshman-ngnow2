import nodemailer from "nodemailer"

// Create transporter with Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

// Email templates
export const emailTemplates = {
  enrollmentConfirmation: (enrollmentData: any, programData: any) => {
    return {
      subject: `🎉 Enrollment Confirmed - ${programData.title} | Enginow`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enrollment Confirmation</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .tagline { font-size: 14px; opacity: 0.9; }
            .content { padding: 30px; }
            .greeting { font-size: 18px; margin-bottom: 20px; color: #333; }
            .program-details { background: #f8f9ff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
            .program-title { font-size: 20px; color: #667eea; margin-bottom: 10px; font-weight: bold; }
            .detail-row { display: flex; margin-bottom: 8px; }
            .detail-label { font-weight: bold; min-width: 120px; color: #555; }
            .detail-value { color: #333; }
            .next-steps { background: #e8f5e8; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745; }
            .step { margin: 10px 0; padding-left: 20px; position: relative; }
            .step::before { content: "✓"; position: absolute; left: 0; color: #28a745; font-weight: bold; }
            .contact-info { background: #fff3cd; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #ffc107; }
            .social-links { text-align: center; margin: 20px 0; }
            .social-links a { display: inline-block; margin: 0 10px; padding: 8px 16px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-size: 12px; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .discount-badge { background: #28a745; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Enginow</div>
              <div class="tagline">Learn Fast, Understand Better</div>
            </div>
            
            <div class="content">
              <div class="greeting">
                Dear ${enrollmentData.firstName} ${enrollmentData.lastName},
              </div>
              
              <p>🎉 <strong>Congratulations!</strong> Your enrollment has been successfully confirmed. We're excited to have you join our learning community!</p>
              
              <div class="program-details">
                <div class="program-title">${programData.title}</div>
                <div class="detail-row">
                  <div class="detail-label">Duration:</div>
                  <div class="detail-value">${programData.duration}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Price:</div>
                  <div class="detail-value">₹${programData.price}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Start Date:</div>
                  <div class="detail-value">Will be communicated soon</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Enrollment ID:</div>
                  <div class="detail-value">${enrollmentData._id}</div>
                </div>
                ${
                  enrollmentData.referralCode
                    ? `
                <div class="detail-row">
                  <div class="detail-label">Referral Code:</div>
                  <div class="detail-value">${enrollmentData.referralCode} <span class="discount-badge">10% Discount Applied!</span></div>
                </div>
                `
                    : ""
                }
              </div>
              
              <div class="next-steps">
                <h3 style="color: #28a745; margin-bottom: 15px;">📋 What's Next?</h3>
                <div class="step">Our team will contact you within 24-48 hours via WhatsApp/Phone</div>
                <div class="step">You'll receive detailed course materials and schedule</div>
                <div class="step">Payment instructions will be shared separately</div>
                <div class="step">Join our exclusive WhatsApp group for updates</div>
                <div class="step">Access to our student portal and resources</div>
              </div>
              
              <div class="contact-info">
                <h3 style="color: #ffc107; margin-bottom: 15px;">📞 Need Help?</h3>
                <p><strong>Phone:</strong> +91 70525 44213</p>
                <p><strong>Email:</strong> enginow25@gmail.com</p>
                <p><strong>Address:</strong> Jajmau, Lal Bangla, Kanpur, UP 208027</p>
              </div>
              
              <div class="social-links">
                <a href="https://www.linkedin.com/company/enginow">LinkedIn</a>
                <a href="https://www.instagram.com/enginow.25">Instagram</a>
                <a href="https://youtube.com/@enginow">YouTube</a>
              </div>
              
              <p style="text-align: center; margin-top: 20px;">
                Thank you for choosing Enginow for your learning journey. We're committed to helping you achieve your goals!
              </p>
            </div>
            
            <div class="footer">
              <p>&copy; 2025 Enginow. All rights reserved.</p>
              <p>Jajmau, Lal Bangla, Kanpur, Uttar Pradesh 208027, India</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Dear ${enrollmentData.firstName} ${enrollmentData.lastName},

Congratulations! Your enrollment has been successfully confirmed for ${programData.title}.

Enrollment Details:
- Program: ${programData.title}
- Duration: ${programData.duration}
- Price: ₹${programData.price}
- Enrollment ID: ${enrollmentData._id}
${enrollmentData.referralCode ? `- Referral Code: ${enrollmentData.referralCode} (10% Discount Applied!)` : ""}

What's Next:
✓ Our team will contact you within 24-48 hours
✓ You'll receive detailed course materials and schedule
✓ Payment instructions will be shared separately
✓ Join our exclusive WhatsApp group for updates
✓ Access to our student portal and resources

Need Help?
Phone: +91 70525 44213
Email: enginow25@gmail.com

Thank you for choosing Enginow!

Best regards,
Team Enginow
      `,
    }
  },

  adminNotification: (enrollmentData: any, programData: any) => {
    return {
      subject: `🔔 New Enrollment - ${enrollmentData.firstName} ${enrollmentData.lastName} | ${programData.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { margin: 8px 0; }
            .label { font-weight: bold; color: #555; }
            .urgent { background: #ffe6e6; border-left: 4px solid #ff4444; padding: 10px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Enrollment Alert</h2>
            </div>
            
            <div class="urgent">
              <strong>Action Required:</strong> New student enrolled and needs follow-up within 24-48 hours!
            </div>
            
            <div class="content">
              <h3>Student Details:</h3>
              <div class="detail-row"><span class="label">Name:</span> ${enrollmentData.firstName} ${enrollmentData.lastName}</div>
              <div class="detail-row"><span class="label">Email:</span> ${enrollmentData.email}</div>
              <div class="detail-row"><span class="label">Phone:</span> ${enrollmentData.phone}</div>
              <div class="detail-row"><span class="label">WhatsApp:</span> ${enrollmentData.whatsapp || "Not provided"}</div>
              <div class="detail-row"><span class="label">LinkedIn:</span> ${enrollmentData.linkedin || "Not provided"}</div>
              <div class="detail-row"><span class="label">Location:</span> ${enrollmentData.city}, ${enrollmentData.state}</div>
              <div class="detail-row"><span class="label">Education:</span> ${enrollmentData.education}</div>
              <div class="detail-row"><span class="label">Experience:</span> ${enrollmentData.experience}</div>
              ${enrollmentData.referralCode ? `<div class="detail-row"><span class="label">Referral Code:</span> ${enrollmentData.referralCode} (10% Discount Applied)</div>` : ""}
              
              <h3>Program Details:</h3>
              <div class="detail-row"><span class="label">Program:</span> ${programData.title}</div>
              <div class="detail-row"><span class="label">Price:</span> ₹${programData.price}</div>
              <div class="detail-row"><span class="label">Duration:</span> ${programData.duration}</div>
              
              <h3>Motivation:</h3>
              <p>${enrollmentData.motivation || "Not provided"}</p>
              
              <div class="detail-row"><span class="label">Enrollment ID:</span> ${enrollmentData._id}</div>
              <div class="detail-row"><span class="label">Enrolled At:</span> ${new Date(enrollmentData.createdAt).toLocaleString("en-IN")}</div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p><strong>Next Steps:</strong></p>
              <p>1. Contact student within 24-48 hours</p>
              <p>2. Share course materials and schedule</p>
              <p>3. Send payment instructions</p>
              <p>4. Add to WhatsApp group</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }
  },
}

// Send enrollment confirmation email
export async function sendEnrollmentConfirmation(enrollmentData: any, programData: any) {
  try {
    const transporter = createTransporter()

    // Email to student
    const studentEmail = emailTemplates.enrollmentConfirmation(enrollmentData, programData)
    await transporter.sendMail({
      from: `"Enginow - Learn Fast, Understand Better" <${process.env.GMAIL_USER}>`,
      to: enrollmentData.email,
      subject: studentEmail.subject,
      html: studentEmail.html,
      text: studentEmail.text,
    })

    // Email to admin
    const adminEmail = emailTemplates.adminNotification(enrollmentData, programData)
    await transporter.sendMail({
      from: `"Enginow Admin Alert" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: adminEmail.subject,
      html: adminEmail.html,
    })

    console.log("✅ Enrollment emails sent successfully")
    return { success: true }
  } catch (error) {
    console.error("❌ Error sending enrollment emails:", error)
    return { success: false, error: error.message }
  }
}

// Test email connection
export async function testEmailConnection() {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log("✅ Email connection verified")
    return { success: true }
  } catch (error) {
    console.error("❌ Email connection failed:", error)
    return { success: false, error: error.message }
  }
}
