"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, CreditCard, User, Loader2, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface TrainingProgram {
  id: string
  title: string
  duration: string
  price: number
  originalPrice: number
  features: string[]
  highlights: string[]
}

export default function EnrollmentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [programLoading, setProgramLoading] = useState(true)
  const [program, setProgram] = useState<TrainingProgram | null>(null)
  const [referralCodeValid, setReferralCodeValid] = useState<boolean | null>(null)
  const [checkingReferral, setCheckingReferral] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    linkedin: "",
    city: "",
    state: "",
    education: "",
    experience: "",
    motivation: "",
    referralCode: "",
    agreeTerms: false,
    agreeMarketing: false,
  })

  useEffect(() => {
    fetchProgram()
  }, [params.programId])

  const fetchProgram = async () => {
    try {
      setProgramLoading(true)
      const response = await fetch(`/api/training/programs/${params.programId}`)
      const result = await response.json()

      if (result.success) {
        setProgram(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error || "Program not found",
          variant: "destructive",
        })
        router.push("/training")
      }
    } catch (error) {
      console.error("Error fetching program:", error)
      toast({
        title: "Error",
        description: "Failed to load program details",
        variant: "destructive",
      })
      router.push("/training")
    } finally {
      setProgramLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Reset referral validation when code changes
    if (field === "referralCode") {
      setReferralCodeValid(null)
    }
  }

  const validateReferralCode = async (code: string) => {
    if (!code.trim()) {
      setReferralCodeValid(null)
      return
    }

    setCheckingReferral(true)

    try {
      // Simulate API call to validate referral code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample valid referral codes for demonstration
      const validCodes = [
        "FRIEND99",
        "STUDENT50",
        "WELCOME25",
        "REFER100",
        "SAVE15",
        "NEWUSER",
        "DISCOUNT20",
        "SPECIAL30",
      ]

      const isValid = validCodes.includes(code.toUpperCase())
      setReferralCodeValid(isValid)

      if (isValid) {
        toast({
          title: "✅ Valid Referral Code!",
          description: "You'll receive a special discount on your enrollment.",
        })
      } else {
        toast({
          title: "❌ Invalid Referral Code",
          description: "The referral code you entered is not valid or has expired.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error validating referral code:", error)
      setReferralCodeValid(false)
    } finally {
      setCheckingReferral(false)
    }
  }

  const handleReferralCodeBlur = () => {
    if (formData.referralCode.trim()) {
      validateReferralCode(formData.referralCode.trim())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const enrollmentData = {
        ...formData,
        programId: params.programId as string,
        referralCodeValid: referralCodeValid,
      }

      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Enrollment Successful!",
          description:
            "Your enrollment has been submitted successfully. You will receive a confirmation email shortly.",
        })

        // Redirect to a success page or back to training
        setTimeout(() => {
          router.push("/training")
        }, 2000)
      } else {
        toast({
          title: "Enrollment Failed",
          description: result.error || "Failed to submit enrollment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.city &&
    formData.state &&
    formData.education &&
    formData.experience &&
    formData.agreeTerms

  // Calculate discount if referral code is valid
  const getDiscountedPrice = () => {
    if (referralCodeValid && program) {
      const discount = 0.1 // 10% discount for valid referral codes
      return Math.round(program.price * (1 - discount))
    }
    return program?.price || 0
  }

  const getDiscountAmount = () => {
    if (referralCodeValid && program) {
      const discount = 0.1 // 10% discount
      return Math.round(program.price * discount)
    }
    return 0
  }

  if (programLoading) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading program details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="text-center">
          <p className="text-red-500 mb-4">Program not found</p>
          <Link href="/training">
            <Button>Back to Training Programs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/training" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Training Programs
        </Link>
        <h1 className="text-3xl font-bold">Enroll in {program.title}</h1>
        <p className="text-muted-foreground mt-2">Complete your enrollment to start your journey in {program.title}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Enrollment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Please provide your details to complete the enrollment process</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        placeholder="Same as phone if different"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Background Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="education">Highest Education *</Label>
                    <Select onValueChange={(value) => handleInputChange("education", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Work Experience *</Label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="motivation">Why do you want to join this program?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      placeholder="Tell us about your goals and motivation..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Referral Code Section */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Referral Code (Optional)</h3>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="h-5 w-5 text-purple-600" />
                      <h4 className="font-medium text-purple-900">Have a Referral Code?</h4>
                    </div>
                    <p className="text-sm text-purple-700 mb-4">
                      Have a referral code from a friend or partner? Enter it below to get an exclusive 10% discount on
                      your enrollment!
                    </p>
                    <div className="relative">
                      <Input
                        id="referralCode"
                        value={formData.referralCode}
                        onChange={(e) => handleInputChange("referralCode", e.target.value.toUpperCase())}
                        onBlur={handleReferralCodeBlur}
                        placeholder="Enter your referral code"
                        className={`pr-10 ${
                          referralCodeValid === true
                            ? "border-green-500 bg-green-50"
                            : referralCodeValid === false
                              ? "border-red-500 bg-red-50"
                              : ""
                        }`}
                        disabled={checkingReferral}
                      />
                      {checkingReferral && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                        </div>
                      )}
                      {referralCodeValid === true && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                      {referralCodeValid === false && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                            <span className="text-white text-xs">✕</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {referralCodeValid === true && (
                      <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            🎉 Referral code applied! You save ₹{getDiscountAmount().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                    {referralCodeValid === false && (
                      <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-red-700">
                            ❌ Invalid or expired referral code. Please check and try again.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-sm leading-relaxed">
                      I agree to receive marketing communications and course updates
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Enrollment
                      <CreditCard className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Program Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">{program.title}</CardTitle>
              <CardDescription>{program.duration} • Comprehensive Training</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing */}
              <div>
                {referralCodeValid && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Referral Discount Applied!</span>
                    </div>
                    <div className="text-sm text-green-700">
                      <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="line-through">₹{program.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Discount:</span>
                        <span>-₹{getDiscountAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl font-bold ${referralCodeValid ? "text-green-600" : ""}`}>
                    ₹{getDiscountedPrice().toLocaleString()}
                  </span>
                  <Badge variant="secondary">
                    Save {Math.round(((program.originalPrice - getDiscountedPrice()) / program.originalPrice) * 100)}%
                  </Badge>
                </div>
                {!referralCodeValid && (
                  <p className="text-sm text-muted-foreground line-through">
                    Original Price: ₹{program.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              <Separator />

              {/* What's Included */}
              <div>
                <h4 className="font-medium mb-3">What's Included:</h4>
                <div className="space-y-2">
                  {program.highlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Technologies */}
              <div>
                <h4 className="font-medium mb-3">Technologies You'll Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {program.features.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Referral Benefits */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Referral Benefits
                </h4>
                <p className="text-sm text-purple-700 mb-2">Have a referral code? Get instant benefits!</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• 10% instant discount on course fee</li>
                  <li>• Priority support during enrollment</li>
                  <li>• Exclusive community access</li>
                  <li>• Fast-track admission process</li>
                </ul>
              </div>

              {/* Support */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Have questions about the program? Our counselors are here to help.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Chat with Counselor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
