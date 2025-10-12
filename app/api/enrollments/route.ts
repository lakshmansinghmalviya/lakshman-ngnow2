import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Enrollment from "@/models/Enrollment"
import nodemailer from "nodemailer"

// Valid referral codes
const VALID_REFERRAL_CODES = [
  "FRIEND2024",
  "STUDENT50",
  "WELCOME25",
  "REFER100",
  "SAVE15",
  "NEWUSER",
  "DISCOUNT20",
  "SPECIAL30",
]

// Training programs data
const TRAINING_PROGRAMS = {
  "web-development": {
    title: "Full Stack Web Development",
    duration: "6 months",
    price: "15,000",
  },
  "data-science": {
    title: "Data Science & Machine Learning",
    duration: "8 months",
    price: "20,000",
  },
  "mobile-development": {
    title: "Mobile App Development",
    duration: "5 months",
    price: "12,000",
  },
  devops: {
    title: "DevOps & Cloud Computing",
    duration: "4 months",
    price: "18,000",
  },
  cybersecurity: {
    title: "Cybersecurity & Ethical Hacking",
    duration: "6 months",
    price: "22,000",
  },
  "digital-marketing": {
    title: "Digital Marketing & SEO",
    duration: "3 months",
    price: "8,000",
  },
  "training-placement": {
    title: "Training & Placement Program",
    duration: "12 months",
    price: "25,000",
  },
}

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Starting enrollment process...")

    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("✅ Request body parsed successfully")
      console.log("📋 Enrollment data:", {
        programId: body.programId,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
      })
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request data format",
        },
        { status: 400 },
      )
    }

    // Validate required fields
    const requiredFields = [
      "programId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "education",
      "experience",
    ]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      console.error("❌ Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Connect to database
    try {
      await connectDB()
      console.log("✅ Database connected successfully")
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed. Please try again.",
        },
        { status: 500 },
      )
    }

    // Validate referral code if provided
    if (body.referralCode) {
      body.referralCodeValid = VALID_REFERRAL_CODES.includes(body.referralCode.toUpperCase())
      body.referralCode = body.referralCode.toUpperCase()
      console.log("🎁 Referral code processed:", body.referralCode, "Valid:", body.referralCodeValid)
    }

    // Check for duplicate enrollment
    try {
      const existingEnrollment = await Enrollment.findOne({
        email: body.email,
        programId: body.programId,
      })

      if (existingEnrollment) {
        console.log("⚠️ Duplicate enrollment detected")
        return NextResponse.json(
          {
            success: false,
            error: "You have already enrolled in this program with this email address.",
          },
          { status: 400 },
        )
      }
      console.log("✅ No duplicate enrollment found")
    } catch (duplicateError) {
      console.error("❌ Error checking duplicates:", duplicateError)
      // Continue with enrollment even if duplicate check fails
    }

    // Create new enrollment
    try {
      console.log("📝 Creating new enrollment...")
      const enrollment = new Enrollment(body)
      await enrollment.save()
      console.log("✅ Enrollment saved successfully with ID:", enrollment._id)

      // Get program data for response
      const programData = TRAINING_PROGRAMS[body.programId] || {
        title: "Training Program",
        duration: "TBD",
        price: "TBD",
      }

      // Send admin notification email to care@enginow.in
      try {
        const userMail = process.env.GMAIL_USER || "lslakshman2024@gmail.com"
        const userPwd = process.env.GMAIL_APP_PASSWORD || "vwggpeowefvcwuqi"
        const sendToWhom = process.env.SEND_TO_WHOM_EMAIL || "care@enginow.in"

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: userMail,
            pass: userPwd,
          },
        })

        const mailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 16px;">
            <div style="background:#6d28d9;color:#fff;padding:16px;border-radius:8px 8px 0 0;">
              <h2 style="margin:0;">New Training Enrollment</h2>
              <p style="margin:4px 0 0 0;opacity:.9;">Enginow Website</p>
            </div>
            <div style="border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;padding:16px;">
              <h3 style="margin:0 0 8px 0;">Student Details</h3>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;font-weight:bold;width:160px;">Name</td><td style="padding:6px 0;">${body.firstName} ${body.lastName}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;">Email</td><td style="padding:6px 0;">${body.email}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;">Phone</td><td style="padding:6px 0;">${body.phone}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;">Location</td><td style="padding:6px 0;">${body.city}, ${body.state}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;">Education</td><td style="padding:6px 0;">${body.education}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;">Experience</td><td style="padding:6px 0;">${body.experience}</td></tr>
              </table>
              <h3 style="margin:16px 0 8px 0;">Program</h3>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;font-weight:bold;width:160px;">Program ID</td><td style="padding:6px 0;">${body.programId}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;">Referral</td><td style="padding:6px 0;">${body.referralCode || "None"}${body.referralCodeValid ? " (Valid)" : ""}</td></tr>
              </table>
              ${body.motivation ? `<div style="margin-top:12px;"><strong>Motivation:</strong><div style="background:#f8fafc;padding:10px;border-radius:6px;margin-top:6px;">${body.motivation}</div></div>` : ""}
              <p style="color:#64748b;font-size:12px;margin-top:16px;">Enrollment ID: ${enrollment.enrollmentId}</p>
            </div>
          </div>
        `

        await transporter.sendMail({
          from: `"Enginow Enrollments" <${userMail}>`,
          to: sendToWhom,
          subject: `New Enrollment: ${body.firstName} ${body.lastName} (${body.programId})`,
          html: mailHtml,
        })
      } catch (emailErr) {
        console.error("❌ Failed to send enrollment email:", emailErr)
      }

      // Log enrollment details for manual follow-up
      console.log("\n🎉 NEW ENROLLMENT SUCCESS!")
      console.log("=".repeat(50))
      console.log(`Enrollment ID: ${enrollment.enrollmentId}`)
      console.log(`Student: ${body.firstName} ${body.lastName}`)
      console.log(`Email: ${body.email}`)
      console.log(`Phone: ${body.phone}`)
      console.log(`Program: ${programData.title}`)
      console.log(`City: ${body.city}, ${body.state}`)
      console.log(`Education: ${body.education}`)
      console.log(`Experience: ${body.experience}`)
      if (body.referralCode) {
        console.log(`Referral: ${body.referralCode} (${body.referralCodeValid ? "Valid" : "Invalid"})`)
        if (body.referralCodeValid) {
          console.log(`Discount Applied: ${enrollment.discountApplied}%`)
        }
      }
      console.log("=".repeat(50))

      return NextResponse.json(
        {
          success: true,
          data: enrollment,
          message: "Enrollment created successfully! You will be contacted within 24-48 hours.",
        },
        { status: 201 },
      )
    } catch (saveError) {
      console.error("❌ Error saving enrollment:", saveError)

      // Handle specific MongoDB errors
      if (saveError.name === "ValidationError") {
        const validationErrors = Object.values(saveError.errors).map((err: any) => err.message)
        console.error("❌ Validation errors:", validationErrors)
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed: " + validationErrors.join(", "),
          },
          { status: 400 },
        )
      }

      if (saveError.code === 11000) {
        console.error("❌ Duplicate key error")
        return NextResponse.json(
          {
            success: false,
            error: "You have already enrolled in this program with this email address.",
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: "Failed to save enrollment. Please try again.",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("❌ Unexpected enrollment error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const status = searchParams.get("status")
    const programId = searchParams.get("programId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    // Build query
    const query: any = {}
    if (email) query.email = email
    if (status) query.status = status
    if (programId) query.programId = programId

    // Execute query with pagination
    const enrollments = await Enrollment.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    const total = await Enrollment.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: enrollments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      message: `${enrollments.length} enrollments retrieved`,
    })
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch enrollments",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment ID is required",
        },
        { status: 400 },
      )
    }

    const deletedEnrollment = await Enrollment.findByIdAndDelete(id)

    if (!deletedEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Enrollment deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting enrollment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete enrollment",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment ID is required",
        },
        { status: 400 },
      )
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!updatedEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedEnrollment,
      message: "Enrollment updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating enrollment:", error)

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update enrollment",
      },
      { status: 500 },
    )
  }
}
