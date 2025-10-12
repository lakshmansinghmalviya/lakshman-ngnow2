import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "INR", receipt, notes } = body || {}

    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ success: false, error: "Amount is required" }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    // If keys are missing, return a mock order for local/dev testing
    if (!keyId || !keySecret) {
      return NextResponse.json({
        success: true,
        mock: true,
        order: {
          id: `order_mock_${Date.now()}`,
          amount,
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: notes || {},
          status: "created",
        },
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock",
      })
    }

    // Create Razorpay order via REST API
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")
    const createOrderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({ amount: amount * 100, currency, receipt, notes }),
    })

    if (!createOrderRes.ok) {
      const errText = await createOrderRes.text()
      return NextResponse.json({ success: false, error: errText || "Failed to create order" }, { status: 500 })
    }

    const order = await createOrderRes.json()
    return NextResponse.json({ success: true, order, keyId })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Unexpected error" }, { status: 500 })
  }
}


