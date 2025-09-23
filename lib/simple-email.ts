// Simple email service using EmailJS (no server-side setup required)
export const sendSimpleEmail = async (enrollmentData: any, programData: any) => {
  try {
    // For now, we'll use a simple notification system
    // This can be replaced with EmailJS or other client-side email services

    const emailData = {
      to_email: enrollmentData.email,
      student_name: `${enrollmentData.firstName} ${enrollmentData.lastName}`,
      program_name: programData.title,
      enrollment_id: enrollmentData._id,
      phone: enrollmentData.phone,
      city: enrollmentData.city,
      state: enrollmentData.state,
      education: enrollmentData.education,
      experience: enrollmentData.experience,
      referral_code: enrollmentData.referralCode || "None",
      motivation: enrollmentData.motivation || "Not provided",
    }

    // Log enrollment details for manual follow-up
    console.log("📧 NEW ENROLLMENT - MANUAL EMAIL REQUIRED:", {
      student: emailData.student_name,
      email: emailData.to_email,
      phone: emailData.phone,
      program: emailData.program_name,
      location: `${emailData.city}, ${emailData.state}`,
      education: emailData.education,
      experience: emailData.experience,
      referral: emailData.referral_code,
      enrollmentId: emailData.enrollment_id,
      timestamp: new Date().toLocaleString("en-IN"),
    })

    return { success: true, message: "Enrollment logged for manual email follow-up" }
  } catch (error) {
    console.error("Error logging enrollment:", error)
    return { success: false, error: error.message }
  }
}

// Email templates for manual sending
export const getEmailTemplates = (enrollmentData: any, programData: any) => {
  const studentEmail = `
Subject: 🎉 Enrollment Confirmed - ${programData.title} | Enginow

Dear ${enrollmentData.firstName} ${enrollmentData.lastName},

Congratulations! Your enrollment has been successfully confirmed for ${programData.title}.

📋 Enrollment Details:
- Program: ${programData.title}
- Duration: ${programData.duration}
- Price: ₹${programData.price}
- Enrollment ID: ${enrollmentData._id}
${enrollmentData.referralCode ? `- Referral Code: ${enrollmentData.referralCode} (10% Discount Applied!)` : ""}

📞 Your Contact Information:
- Email: ${enrollmentData.email}
- Phone: ${enrollmentData.phone}
- Location: ${enrollmentData.city}, ${enrollmentData.state}
- Education: ${enrollmentData.education}
- Experience: ${enrollmentData.experience}

🎯 What's Next:
✓ Our team will contact you within 24-48 hours via WhatsApp/Phone
✓ You'll receive detailed course materials and schedule
✓ Payment instructions will be shared separately
✓ Join our exclusive WhatsApp group for updates
✓ Access to our student portal and resources

📞 Need Help?
Phone: +91 70525 44213
Email: enginow25@gmail.com
Address: Jajmau, Lal Bangla, Kanpur, UP 208027

🌐 Follow Us:
LinkedIn: https://www.linkedin.com/company/enginow
Instagram: https://www.instagram.com/enginow.25
YouTube: https://youtube.com/@enginow

Thank you for choosing Enginow for your learning journey!

Best regards,
Team Enginow
Learn Fast, Understand Better
  `

  const adminNotification = `
🔔 NEW ENROLLMENT ALERT - ACTION REQUIRED

Student: ${enrollmentData.firstName} ${enrollmentData.lastName}
Email: ${enrollmentData.email}
Phone: ${enrollmentData.phone}
WhatsApp: ${enrollmentData.whatsapp || "Not provided"}
LinkedIn: ${enrollmentData.linkedin || "Not provided"}

Location: ${enrollmentData.city}, ${enrollmentData.state}
Education: ${enrollmentData.education}
Experience: ${enrollmentData.experience}
${enrollmentData.referralCode ? `Referral Code: ${enrollmentData.referralCode} (10% Discount)` : ""}

Program: ${programData.title}
Price: ₹${programData.price}
Duration: ${programData.duration}

Motivation: ${enrollmentData.motivation || "Not provided"}

Enrollment ID: ${enrollmentData._id}
Enrolled At: ${new Date().toLocaleString("en-IN")}

⚡ IMMEDIATE ACTIONS:
1. Send confirmation email to student
2. Contact via WhatsApp/Phone within 24-48 hours
3. Share course materials and schedule
4. Send payment instructions
5. Add to WhatsApp group
  `

  return { studentEmail, adminNotification }
}
