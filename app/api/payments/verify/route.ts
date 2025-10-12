import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import Payment from "@/models/Payment"
import Enrollment from "@/models/Enrollment"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      enrollmentId,
      programId,
      userEmail,
      amount,
    } = body || {}

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: "Missing payment verification fields" }, { status: 400 })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      // Dev fallback: accept as verified and store mock record
      await connectDB()
      await Payment.create({
        enrollmentId,
        programId,
        userEmail,
        amount,
        currency: "INR",
        paymentMethod: "razorpay",
        paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
        orderId: razorpay_order_id || `order_mock_${Date.now()}`,
        status: "completed",
      })
      return NextResponse.json({ success: true, verified: true, dev: true })
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    const isValid = generatedSignature === razorpay_signature
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    await connectDB()
    const payment = await Payment.create({
      enrollmentId,
      programId,
      userEmail,
      amount,
      currency: "INR",
      paymentMethod: "razorpay",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "completed",
    })

    // Mark enrollment as completed if present
    if (enrollmentId) {
      try {
        await Enrollment.findByIdAndUpdate(enrollmentId, { status: "completed", paymentStatus: "completed" })
      } catch {}
    }

    return NextResponse.json({ success: true, verified: true, paymentId: payment._id })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Unexpected error" }, { status: 500 })
  }
}


