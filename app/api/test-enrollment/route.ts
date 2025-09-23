import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test enrollment data
    const testData = {
      programId: "training-placement",
      firstName: "Test",
      lastName: "Student",
      email: "test@example.com",
      phone: "+91 9876543210",
      city: "Mumbai",
      state: "Maharashtra",
      education: "bachelors",
      experience: "fresher",
      agreeTerms: true,
    }

    // Test the enrollment API
    const response = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/enrollments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      testResult: result,
      message: "Enrollment API test completed",
    })
  } catch (error) {
    console.error("Test enrollment error:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Enrollment API test failed",
    })
  }
}
