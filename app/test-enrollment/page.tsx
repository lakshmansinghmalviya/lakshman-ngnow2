"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, User, Mail, Phone, MapPin, GraduationCap, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TestEnrollmentPage() {
  const [step, setStep] = useState(1)
  const [enrollmentData, setEnrollmentData] = useState(null)

  const testEnrollment = async () => {
    setStep(2)

    // Simulate form submission
    const formData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      whatsapp: "+91 9876543210",
      linkedin: "https://linkedin.com/in/johndoe",
      city: "Mumbai",
      state: "Maharashtra",
      education: "bachelors",
      experience: "1-2",
      motivation: "I want to transition into full-stack development and build modern web applications.",
      agreeTerms: true,
      agreeMarketing: true,
      programId: "fullstack-web",
    }

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setEnrollmentData(result.data)
        setStep(3)
      } else {
        console.error("Enrollment failed:", result.error)
        setStep(4)
      }
    } catch (error) {
      console.error("Error:", error)
      setStep(4)
    }
  }

  const resetTest = () => {
    setStep(1)
    setEnrollmentData(null)
  }

  return (
    <div className="container py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">🧪 Enrollment System Test</h1>
        <p className="text-muted-foreground">
          This page demonstrates the enrollment system functionality with a sample enrollment.
        </p>
      </div>

      {/* Step 1: Ready to Test */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Test Enrollment Process
            </CardTitle>
            <CardDescription>
              Click the button below to simulate enrolling "John Doe" in the Full Stack Web Development program.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Test Data Preview:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span>John Doe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>+91 9876543210</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span>Bachelor's Degree</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span>1-2 years experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Program: Full Stack Web Development</h4>
              <div className="flex items-center gap-4 text-sm text-purple-700">
                <span>Duration: 6 months</span>
                <span>Price: ₹15,999</span>
                <span>Level: Beginner to Advanced</span>
              </div>
            </div>

            <Button onClick={testEnrollment} size="lg" className="w-full">
              🚀 Start Test Enrollment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Processing */}
      {step === 2 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Processing Enrollment...</h3>
              <p className="text-muted-foreground">
                Validating data, checking for duplicates, and saving to database...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Success */}
      {step === 3 && enrollmentData && (
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Enrollment Successful! 🎉
              </CardTitle>
              <CardDescription className="text-green-700">
                The test enrollment has been successfully processed and saved to the database.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment Details</CardTitle>
              <CardDescription>Here's the data that was saved to the system:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enrollment ID */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Enrollment ID</Label>
                <div className="mt-1">
                  <Badge variant="outline" className="font-mono">
                    {enrollmentData.id}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div>
                <h4 className="font-medium mb-3">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2 font-medium">
                      {enrollmentData.firstName} {enrollmentData.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2 font-medium">{enrollmentData.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="ml-2 font-medium">{enrollmentData.phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">WhatsApp:</span>
                    <span className="ml-2 font-medium">{enrollmentData.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">LinkedIn:</span>
                    <span className="ml-2 font-medium">{enrollmentData.linkedin}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 font-medium">
                      {enrollmentData.city}, {enrollmentData.state}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Background */}
              <div>
                <h4 className="font-medium mb-3">Background Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Education:</span>
                    <span className="ml-2 font-medium capitalize">{enrollmentData.education}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="ml-2 font-medium">{enrollmentData.experience} years</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-muted-foreground">Motivation:</span>
                  <p className="mt-1 text-sm">{enrollmentData.motivation}</p>
                </div>
              </div>

              <Separator />

              {/* Status */}
              <div>
                <h4 className="font-medium mb-3">Enrollment Status</h4>
                <div className="flex gap-4">
                  <Badge variant="outline" className="capitalize">
                    Status: {enrollmentData.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    Payment: {enrollmentData.paymentStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Enrolled on: {new Date(enrollmentData.enrollmentDate).toLocaleDateString()}
                </p>
              </div>

              <Separator />

              {/* File Location */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">💾 Data Storage</h4>
                <p className="text-sm text-muted-foreground mb-2">This enrollment data has been saved to:</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">data/enrollments.json</code>
                <p className="text-xs text-muted-foreground mt-2">
                  You can check this file in your project directory to see the stored data.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={resetTest} variant="outline" className="flex-1">
              🔄 Test Again
            </Button>
            <Button asChild className="flex-1">
              <a href="/training">View Training Programs</a>
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Error */}
      {step === 4 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">❌ Enrollment Failed</CardTitle>
            <CardDescription className="text-red-700">
              There was an error processing the test enrollment. This could be due to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1 mb-4">
              <li>Duplicate enrollment (same email already enrolled)</li>
              <li>Invalid program ID</li>
              <li>Server error or file system issues</li>
            </ul>
            <Button onClick={resetTest} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
