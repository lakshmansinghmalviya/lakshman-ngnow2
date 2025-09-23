"use client"

import { useState, useEffect } from "react"
import { Gift, TrendingUp, DollarSign, Filter, Download, RefreshCw, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ReferralEnrollment {
  _id: string
  enrollmentId: string
  programId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  state: string
  referralCode: string
  referralCodeValid: boolean
  discountApplied: number
  enrollmentDate: string
  status: string
  paymentStatus: string
}

interface ReferralStats {
  totalReferralCodes: number
  validReferrals: number
  invalidReferrals: number
  totalDiscountGiven: number
  topReferralCodes: Array<{ code: string; count: number; validCount: number }>
}

export default function AdminReferralsPage() {
  const [referralEnrollments, setReferralEnrollments] = useState<ReferralEnrollment[]>([])
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [validityFilter, setValidityFilter] = useState("all")
  const [selectedEnrollment, setSelectedEnrollment] = useState<ReferralEnrollment | null>(null)

  useEffect(() => {
    fetchReferralData()
  }, [])

  const fetchReferralData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/enrollments")
      const result = await response.json()

      if (result.success) {
        // Filter enrollments with referral codes
        const referrals = result.data.filter((enrollment: any) => enrollment.referralCode)
        setReferralEnrollments(referrals)

        // Calculate stats
        const stats = calculateReferralStats(referrals)
        setStats(stats)

        toast({
          title: "✅ Referral Data Loaded",
          description: `${referrals.length} referral enrollments found`,
        })
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Failed to fetch referral data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching referral data:", error)
      toast({
        title: "❌ Connection Error",
        description: "Failed to connect to database",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateReferralStats = (referrals: ReferralEnrollment[]): ReferralStats => {
    const validReferrals = referrals.filter((r) => r.referralCodeValid)
    const invalidReferrals = referrals.filter((r) => !r.referralCodeValid)
    const totalDiscountGiven = validReferrals.reduce((sum, r) => sum + (r.discountApplied || 0), 0)

    // Group by referral code
    const codeGroups = referrals.reduce(
      (acc, r) => {
        if (!acc[r.referralCode]) {
          acc[r.referralCode] = { total: 0, valid: 0 }
        }
        acc[r.referralCode].total++
        if (r.referralCodeValid) {
          acc[r.referralCode].valid++
        }
        return acc
      },
      {} as Record<string, { total: number; valid: number }>,
    )

    const topReferralCodes = Object.entries(codeGroups)
      .map(([code, data]) => ({
        code,
        count: data.total,
        validCount: data.valid,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalReferralCodes: referrals.length,
      validReferrals: validReferrals.length,
      invalidReferrals: invalidReferrals.length,
      totalDiscountGiven,
      topReferralCodes,
    }
  }

  const filteredReferrals = referralEnrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.referralCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.enrollmentId?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesValidity =
      validityFilter === "all" ||
      (validityFilter === "valid" && enrollment.referralCodeValid) ||
      (validityFilter === "invalid" && !enrollment.referralCodeValid)

    return matchesSearch && matchesValidity
  })

  const exportReferralCSV = () => {
    const headers = [
      "Enrollment ID",
      "Name",
      "Email",
      "Phone",
      "City",
      "State",
      "Program",
      "Referral Code",
      "Valid",
      "Discount Applied",
      "Status",
      "Payment Status",
      "Enrollment Date",
    ]

    const csvData = filteredReferrals.map((enrollment) => [
      enrollment.enrollmentId || enrollment._id.slice(-6).toUpperCase(),
      `${enrollment.firstName} ${enrollment.lastName}`,
      enrollment.email,
      enrollment.phone,
      enrollment.city,
      enrollment.state,
      enrollment.programId,
      enrollment.referralCode,
      enrollment.referralCodeValid ? "Yes" : "No",
      enrollment.discountApplied || 0,
      enrollment.status,
      enrollment.paymentStatus,
      new Date(enrollment.enrollmentDate).toLocaleDateString(),
    ])

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `referral-enrollments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading referral data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-pink-600" />🎁 Referral Tracking Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track all referral codes used by students • Total: {stats?.totalReferralCodes || 0} referrals
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={fetchReferralData} variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportReferralCSV} variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xl font-bold text-blue-700">{stats.totalReferralCodes}</p>
                  <p className="text-xs text-blue-600">Total Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xl font-bold text-green-700">{stats.validReferrals}</p>
                  <p className="text-xs text-green-600">Valid Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xl font-bold text-red-700">{stats.invalidReferrals}</p>
                  <p className="text-xs text-red-600">Invalid Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xl font-bold text-purple-700">{stats.totalDiscountGiven}%</p>
                  <p className="text-xs text-purple-600">Total Discount</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Referral Codes */}
      {stats && stats.topReferralCodes.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Referral Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.topReferralCodes.map((code, index) => (
                <div key={code.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-mono font-medium">{code.code}</p>
                    <p className="text-sm text-muted-foreground">
                      {code.validCount}/{code.count} valid
                    </p>
                  </div>
                  <Badge variant={code.validCount > 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, enrollment ID, or referral code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={validityFilter} onValueChange={setValidityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by validity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Referrals</SelectItem>
                <SelectItem value="valid">Valid Only</SelectItem>
                <SelectItem value="invalid">Invalid Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Referral Enrollments List */}
      <div className="space-y-4">
        {filteredReferrals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No referral enrollments found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredReferrals.map((enrollment) => (
            <Card key={enrollment._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-medium text-lg">
                        {enrollment.firstName} {enrollment.lastName}
                      </h3>
                      <Badge variant="outline" className="font-mono text-xs bg-blue-50 text-blue-700 border-blue-200">
                        ID: {enrollment.enrollmentId || enrollment._id.slice(-6).toUpperCase()}
                      </Badge>
                      <Badge
                        variant={enrollment.referralCodeValid ? "default" : "destructive"}
                        className={
                          enrollment.referralCodeValid
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-red-100 text-red-800 border-red-300"
                        }
                      >
                        <Gift className="h-3 w-3 mr-1" />
                        {enrollment.referralCode}
                        {enrollment.referralCodeValid && ` (-${enrollment.discountApplied}%)`}
                        {enrollment.referralCodeValid ? " ✓" : " ✗"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {enrollment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="space-y-2">
                        <p>
                          <span className="text-muted-foreground">Email: </span>
                          <span className="break-all">{enrollment.email}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Phone: </span>
                          <span>{enrollment.phone}</span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p>
                          <span className="text-muted-foreground">Program: </span>
                          <span className="capitalize">{enrollment.programId.replace("-", " ")}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Location: </span>
                          <span>
                            {enrollment.city}, {enrollment.state}
                          </span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p>
                          <span className="text-muted-foreground">Enrolled: </span>
                          <span>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Payment: </span>
                          <Badge
                            variant={enrollment.paymentStatus === "completed" ? "default" : "secondary"}
                            className="capitalize text-xs"
                          >
                            {enrollment.paymentStatus}
                          </Badge>
                        </p>
                      </div>
                    </div>

                    {enrollment.referralCodeValid && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Valid referral code applied - {enrollment.discountApplied}% discount given
                          </span>
                        </div>
                      </div>
                    )}

                    {!enrollment.referralCodeValid && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">
                            Invalid referral code - No discount applied
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row lg:flex-col items-center gap-2 w-full lg:w-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="flex-1 lg:flex-none"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Referral Enrollment Details</DialogTitle>
                          <DialogDescription>
                            Complete referral information for {enrollment.firstName} {enrollment.lastName}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedEnrollment && (
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Student Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <strong>Enrollment ID:</strong>{" "}
                                    {selectedEnrollment.enrollmentId || selectedEnrollment._id.slice(-6).toUpperCase()}
                                  </p>
                                  <p>
                                    <strong>Name:</strong> {selectedEnrollment.firstName} {selectedEnrollment.lastName}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {selectedEnrollment.email}
                                  </p>
                                  <p>
                                    <strong>Phone:</strong> {selectedEnrollment.phone}
                                  </p>
                                  <p>
                                    <strong>Location:</strong> {selectedEnrollment.city}, {selectedEnrollment.state}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Referral Details</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <strong>Referral Code:</strong> {selectedEnrollment.referralCode}
                                  </p>
                                  <p>
                                    <strong>Valid:</strong>{" "}
                                    <Badge
                                      variant={selectedEnrollment.referralCodeValid ? "default" : "destructive"}
                                      className="text-xs"
                                    >
                                      {selectedEnrollment.referralCodeValid ? "Yes" : "No"}
                                    </Badge>
                                  </p>
                                  <p>
                                    <strong>Discount Applied:</strong> {selectedEnrollment.discountApplied || 0}%
                                  </p>
                                  <p>
                                    <strong>Program:</strong> {selectedEnrollment.programId.replace("-", " ")}
                                  </p>
                                  <p>
                                    <strong>Status:</strong> {selectedEnrollment.status}
                                  </p>
                                  <p>
                                    <strong>Payment:</strong> {selectedEnrollment.paymentStatus}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
