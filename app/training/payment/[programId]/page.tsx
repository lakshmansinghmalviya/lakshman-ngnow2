"use client"
import { useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function PaymentPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const enrollmentId = searchParams.get("enrollmentId")

  // Mock program data - in real app, fetch from database
  const program = {
    title: "Full Stack Web Development",
    duration: "6 months",
    price: 15999,
    originalPrice: 24999,
  }

  const handlePayment = async () => {
    // Here you would integrate with Razorpay or other payment gateway
    alert("Payment integration would be implemented here with Razorpay/Stripe")
  }

  return (
    <div className="container py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/training" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Training Programs
        </Link>
        <h1 className="text-3xl font-bold">Complete Your Payment</h1>
        <p className="text-muted-foreground mt-2">Secure payment for {program.title}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Shield className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium mb-2">Secure Payment Gateway</h3>
                <p className="text-muted-foreground mb-6">
                  Your payment is processed securely through our trusted payment partners
                </p>
                <Button onClick={handlePayment} size="lg" className="w-full max-w-md">
                  Pay ₹{program.price.toLocaleString()}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  SSL Encrypted
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Money Back Guarantee
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{program.title}</h4>
                <p className="text-sm text-muted-foreground">{program.duration} • Comprehensive Training</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Course Price</span>
                  <span className="line-through text-muted-foreground">₹{program.originalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">-₹{(program.originalPrice - program.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{program.price.toLocaleString()}</span>
                </div>
              </div>

              <Badge variant="secondary" className="w-full justify-center">
                Save {Math.round(((program.originalPrice - program.price) / program.originalPrice) * 100)}%
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
