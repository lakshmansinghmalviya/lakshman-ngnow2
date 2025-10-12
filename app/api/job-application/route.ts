import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import connectDB from "@/lib/mongodb"
import Applicant from "@/models/Applicant"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        const applicationData = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            experience: formData.get('experience') as string,
            currentRole: formData.get('currentRole') as string,
            expectedSalary: formData.get('expectedSalary') as string,
            noticePeriod: formData.get('noticePeriod') as string,
            coverLetter: formData.get('coverLetter') as string,
            jobTitle: formData.get('jobTitle') as string,
            company: formData.get('company') as string,
            jobId: formData.get('jobId') as string,
        }

        const resume = formData.get('resume') as File

        // Validate required fields
        if (!applicationData.firstName || !applicationData.lastName || !applicationData.email ||
            !applicationData.phone || !applicationData.experience || !resume) {
            return NextResponse.json(
                { success: false, error: "Required fields are missing" },
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

        // Convert resume to buffer for attachment
        const resumeBuffer = Buffer.from(await resume.arrayBuffer())

        // Email content
        const mailOptions = {
            from: `"Enginow Job Applications" <${userMail}>`,
            to: sendToWhom,
            subject: `New Job Application: ${applicationData.firstName} ${applicationData.lastName} - ${applicationData.jobTitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg,#667eea,#764ba2); color: white; padding: 20px; text-align: center; border-radius: 8px;">
            <h2 style="margin: 0;">💼 New Job Application</h2>
            <p style="margin: 5px 0 0;">Enginow Careers</p>
          </div>
          
          <div style="padding: 20px;">
            <h3>Job Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td><b>Position:</b></td><td>${applicationData.jobTitle}</td></tr>
              <tr><td><b>Company:</b></td><td>${applicationData.company}</td></tr>
              <tr><td><b>Job ID:</b></td><td>${applicationData.jobId}</td></tr>
            </table>
            
            <h3>Applicant Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td><b>Full Name:</b></td><td>${applicationData.firstName} ${applicationData.lastName}</td></tr>
              <tr><td><b>Email:</b></td><td>${applicationData.email}</td></tr>
              <tr><td><b>Phone:</b></td><td>${applicationData.phone}</td></tr>
              <tr><td><b>Experience:</b></td><td>${applicationData.experience}</td></tr>
              <tr><td><b>Current Role:</b></td><td>${applicationData.currentRole || "Not specified"}</td></tr>
              <tr><td><b>Expected Salary:</b></td><td>${applicationData.expectedSalary || "Not specified"}</td></tr>
              <tr><td><b>Notice Period:</b></td><td>${applicationData.noticePeriod || "Not specified"}</td></tr>
            </table>
            
            ${applicationData.coverLetter ? `
            <h3>Cover Letter</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; line-height: 1.6;">${applicationData.coverLetter}</p>
            </div>
            ` : ''}
            
            <p style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin-top: 20px;">
              📎 Resume attached: ${resume.name}
            </p>
          </div>
          
          <p style="text-align:center; color:#555; font-size:12px; margin-top:20px;">
            Applied at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
            attachments: [
                {
                    filename: resume.name,
                    content: resumeBuffer,
                },
            ],
        }

        // Persist applicant in DB (without resume binary)
        try {
            await connectDB()
            await Applicant.create({
                ...applicationData,
                resumeFileName: resume?.name,
            })
        } catch (dbErr) {
            console.warn("⚠️ Applicant DB save failed (continuing with email):", dbErr)
        }

        // Send email
        await transporter.sendMail(mailOptions)

        console.log("✅ Job application sent successfully to care@enginow.in")
        console.log("📧 Applicant:", applicationData.firstName, applicationData.lastName)
        console.log("💼 Position:", applicationData.jobTitle)

        return NextResponse.json({
            success: true,
            message: "Job application submitted successfully!",
        })

    } catch (error) {
        console.error("❌ Error sending job application:", error)

        return NextResponse.json(
            {
                success: false,
                error: "Failed to submit job application. Please try again."
            },
            { status: 500 }
        )
    }
}