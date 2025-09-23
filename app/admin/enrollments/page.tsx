"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  Gift,
  Database,
  TrendingUp,
} from "lucide-react"
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

interface Enrollment {
  _id: string
  enrollmentId: string
  programId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  linkedin?: string
  city: string
  state: string
  education: string
  experience: string
  motivation?: string
  referralCode?: string
  referralCodeValid?: boolean
  discountApplied?: number
  agreeTerms: boolean
  agreeMarketing?: boolean
  status: string
  paymentStatus: string
  enrollmentDate: string
  createdAt: string
  updatedAt?: string
}

interface Stats {
  overview: {
    totalEnrollments: number
    pendingEnrollments: number
    confirmedEnrollments: number
    completedEnrollments: number
    paidEnrollments: number
    referralEnrollments: number
  }
  programs: Array<{ _id: string; count: number; confirmed: number; paid: number }>
  education: Array<{ _id: string; count: number }>
  experience: Array<{ _id: string; count: number }>
  locations: Array<{ _id: string; count: number; cities: string[] }>
  referrals: Array<{ _id: string; count: number; totalDiscount: number }>
}

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)

  useEffect(() => {
    fetchEnrollments()
    fetchStats()
  }, [])

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/enrollments")
      const result = await response.json()

      if (result.success) {
        setEnrollments(result.data)
        toast({
          title: "✅ Database Connected",
          description: `${result.data.length} enrollments loaded from MongoDB`,
        })
      } else {
        toast({
          title: "❌ Database Error",
          description: result.error || "Failed to fetch enrollments",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error)
      toast({
        title: "❌ Connection Error",
        description: "Failed to connect to database",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/enrollments/stats")
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const deleteEnrollment = async (enrollmentId: string) => {
    if (!confirm("Are you sure you want to delete this enrollment? This action cannot be undone.")) {
      return
    }

    try {
      setDeleting(enrollmentId)
      const response = await fetch(`/api/enrollments?id=${enrollmentId}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        setEnrollments(enrollments.filter((e) => e._id !== enrollmentId))
        fetchStats() // Refresh stats
        toast({
          title: "✅ Deleted",
          description: "Enrollment deleted successfully",
        })
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Failed to delete enrollment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting enrollment:", error)
      toast({
        title: "❌ Error",
        description: "Failed to delete enrollment",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  const updateEnrollmentStatus = async (enrollmentId: string, status: string, paymentStatus?: string) => {
    try {
      const response = await fetch(`/api/enrollments?id=${enrollmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, paymentStatus }),
      })
      const result = await response.json()

      if (result.success) {
        setEnrollments(
          enrollments.map((e) =>
            e._id === enrollmentId ? { ...e, status, paymentStatus: paymentStatus || e.paymentStatus } : e,
          ),
        )
        fetchStats() // Refresh stats
        toast({
          title: "✅ Updated",
          description: "Enrollment status updated successfully",
        })
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Failed to update enrollment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating enrollment:", error)
      toast({
        title: "❌ Error",
        description: "Failed to update enrollment",
        variant: "destructive",
      })
    }
  }

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.programId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enrollment.referralCode && enrollment.referralCode.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const exportToCSV = () => {
    const headers = [
      "Enrollment ID",
      "Name",
      "Email",
      "Phone",
      "WhatsApp",
      "LinkedIn",
      "City",
      "State",
      "Program",
      "Education",
      "Experience",
      "Status",
      "Payment Status",
      "Referral Code",
      "Referral Valid",
      "Discount Applied",
      "Enrollment Date",
      "Motivation",
      "Agree Terms",
      "Agree Marketing",
    ]

    const csvData = filteredEnrollments.map((enrollment) => [
      enrollment.enrollmentId || enrollment._id.slice(-6).toUpperCase(),
      `${enrollment.firstName} ${enrollment.lastName}`,
      enrollment.email,
      enrollment.phone,
      enrollment.whatsapp || "",
      enrollment.linkedin || "",
      enrollment.city,
      enrollment.state,
      enrollment.programId,
      enrollment.education,
      enrollment.experience,
      enrollment.status,
      enrollment.paymentStatus,
      enrollment.referralCode || "",
      enrollment.referralCodeValid ? "Yes" : "No",
      enrollment.discountApplied || 0,
      new Date(enrollment.enrollmentDate).toLocaleDateString(),
      enrollment.motivation || "",
      enrollment.agreeTerms ? "Yes" : "No",
      enrollment.agreeMarketing ? "Yes" : "No",
    ])

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `enrollments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Connecting to MongoDB database...</p>
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
            <Database className="h-6 w-6 text-green-600" />📊 Enrollment Management
          </h1>
          <p className="text-muted-foreground mt-2">
            MongoDB Database • Total: {stats?.overview.totalEnrollments || enrollments.length} enrollments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={fetchEnrollments} variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportToCSV} variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Enhanced Stats with Referral Focus */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xl font-bold">{stats.overview.totalEnrollments}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-xl font-bold">{stats.overview.pendingEnrollments}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xl font-bold">{stats.overview.confirmedEnrollments}</p>
                  <p className="text-xs text-muted-foreground">Confirmed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xl font-bold">{stats.overview.completedEnrollments}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xl font-bold">{stats.overview.paidEnrollments}</p>
                  <p className="text-xs text-muted-foreground">Paid</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-pink-600" />
                <div>
                  <p className="text-xl font-bold text-pink-700">{stats.overview.referralEnrollments}</p>
                  <p className="text-xs text-pink-600">With Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xl font-bold text-green-700">
                    {enrollments.filter((e) => e.referralCodeValid).length}
                  </p>
                  <p className="text-xs text-green-600">Valid Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xl font-bold text-red-700">
                    {enrollments.filter((e) => e.referralCode && !e.referralCodeValid).length}
                  </p>
                  <p className="text-xs text-red-600">Invalid Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                placeholder="Search by name, email, program, city, state, or referral code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments List */}
      <div className="space-y-4">
        {filteredEnrollments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No enrollments found matching your criteria.</p>
              <Button onClick={fetchEnrollments} variant="outline" className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Database
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredEnrollments.map((enrollment) => (
            <Card key={enrollment._id}>
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
                      <Badge variant="outline" className="capitalize">
                        {enrollment.status}
                      </Badge>
                      <Badge
                        variant={enrollment.paymentStatus === "completed" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {enrollment.paymentStatus}
                      </Badge>
                      {enrollment.referralCode && (
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
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="break-all">{enrollment.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{enrollment.phone}</span>
                        </div>
                        {enrollment.whatsapp && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span>WhatsApp: {enrollment.whatsapp}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-muted-foreground">Program: </span>
                          <span className="font-medium capitalize">{enrollment.programId.replace("-", " ")}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Education: </span>
                          <span className="capitalize">{enrollment.education.replace("-", " ")}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Experience: </span>
                          <span className="capitalize">{enrollment.experience.replace("-", " ")}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span>
                            {enrollment.city}, {enrollment.state}
                          </span>
                        </div>
                        {enrollment.linkedin && (
                          <div className="text-xs">
                            <span className="text-muted-foreground">LinkedIn: </span>
                            <a
                              href={enrollment.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {enrollment.motivation && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Motivation: </span>
                        <p className="text-sm mt-1">{enrollment.motivation}</p>
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
                          <DialogTitle>Enrollment Details</DialogTitle>
                          <DialogDescription>
                            Complete information for {enrollment.firstName} {enrollment.lastName}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedEnrollment && (
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Personal Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <strong>Name:</strong> {selectedEnrollment.firstName} {selectedEnrollment.lastName}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {selectedEnrollment.email}
                                  </p>
                                  <p>
                                    <strong>Phone:</strong> {selectedEnrollment.phone}
                                  </p>
                                  {selectedEnrollment.whatsapp && (
                                    <p>
                                      <strong>WhatsApp:</strong> {selectedEnrollment.whatsapp}
                                    </p>
                                  )}
                                  {selectedEnrollment.linkedin && (
                                    <p>
                                      <strong>LinkedIn:</strong> {selectedEnrollment.linkedin}
                                    </p>
                                  )}
                                  <p>
                                    <strong>City:</strong> {selectedEnrollment.city}
                                  </p>
                                  <p>
                                    <strong>State:</strong> {selectedEnrollment.state}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Academic & Professional</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <strong>Program:</strong> {selectedEnrollment.programId.replace("-", " ")}
                                  </p>
                                  <p>
                                    <strong>Education:</strong> {selectedEnrollment.education.replace("-", " ")}
                                  </p>
                                  <p>
                                    <strong>Experience:</strong> {selectedEnrollment.experience.replace("-", " ")}
                                  </p>
                                  <p>
                                    <strong>Status:</strong> {selectedEnrollment.status}
                                  </p>
                                  <p>
                                    <strong>Payment:</strong> {selectedEnrollment.paymentStatus}
                                  </p>
                                  <p>
                                    <strong>Enrolled:</strong>{" "}
                                    {new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {selectedEnrollment.referralCode && (
                              <div>
                                <h4 className="font-medium mb-2">Referral Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <strong>Referral Code:</strong> {selectedEnrollment.referralCode}
                                  </p>
                                  <p>
                                    <strong>Valid:</strong> {selectedEnrollment.referralCodeValid ? "Yes" : "No"}
                                  </p>
                                  {selectedEnrollment.discountApplied > 0 && (
                                    <p>
                                      <strong>Discount:</strong> {selectedEnrollment.discountApplied}%
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                            {selectedEnrollment.motivation && (
                              <div>
                                <h4 className="font-medium mb-2">Motivation</h4>
                                <p className="text-sm bg-gray-50 p-3 rounded">{selectedEnrollment.motivation}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium mb-2">Agreements</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <strong>Terms & Conditions:</strong>{" "}
                                  {selectedEnrollment.agreeTerms ? "Agreed" : "Not Agreed"}
                                </p>
                                <p>
                                  <strong>Marketing Communications:</strong>{" "}
                                  {selectedEnrollment.agreeMarketing ? "Agreed" : "Not Agreed"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Select
                      value={enrollment.status}
                      onValueChange={(value) => updateEnrollmentStatus(enrollment._id, value)}
                    >
                      <SelectTrigger className="w-full lg:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteEnrollment(enrollment._id)}
                      disabled={deleting === enrollment._id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 lg:flex-none"
                    >
                      {deleting === enrollment._id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
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
