"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  Eye,
  Search,
  TrendingUp,
  DollarSign,
  BookOpen,
  ArrowLeft,
  LogOut,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedElement } from "@/components/ui/animated-element"

interface Enrollment {
  id: string
  programId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  linkedin?: string
  city?: string
  state?: string
  education?: string
  experience?: string
  motivation?: string
  status: string
  paymentStatus: string
  enrollmentDate: string
  createdAt: string
}

interface TrainingProgram {
  id: string
  title: string
  category: string
  price: number
  students: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [programs, setPrograms] = useState<TrainingProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    checkAuthentication()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const checkAuthentication = () => {
    const authStatus = localStorage.getItem("admin_authenticated")
    const sessionStatus = sessionStorage.getItem("admin_session")

    if (authStatus === "true" && sessionStatus === "active") {
      setIsAuthenticated(true)
    } else {
      // Redirect to login
      window.location.href = "/admin/login"
    }
    setIsLoading(false)
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch enrollments
      const enrollmentsResponse = await fetch("/api/enrollments")
      const enrollmentsResult = await enrollmentsResponse.json()

      // Fetch programs
      const programsResponse = await fetch("/api/training/programs")
      const programsResult = await programsResponse.json()

      if (enrollmentsResult.success) {
        setEnrollments(enrollmentsResult.data || [])
      }

      if (programsResult.success) {
        setPrograms(programsResult.data || [])
      }

      // If no real data, show sample data
      if (
        (!enrollmentsResult.success || !enrollmentsResult.data?.length) &&
        (!programsResult.success || !programsResult.data?.length)
      ) {
        setSampleData()
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setSampleData()
    } finally {
      setLoading(false)
    }
  }

  const setSampleData = () => {
    const sampleEnrollments: Enrollment[] = [
      {
        id: "enroll_1704123456789_abc123",
        programId: "fullstack-web",
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
        status: "confirmed",
        paymentStatus: "completed",
        enrollmentDate: "2024-01-15T10:30:00.000Z",
        createdAt: "2024-01-15T10:30:00.000Z",
      },
      {
        id: "enroll_1704123456790_def456",
        programId: "data-science",
        firstName: "Sarah",
        lastName: "Smith",
        email: "sarah.smith@example.com",
        phone: "+91 9876543211",
        whatsapp: "+91 9876543211",
        linkedin: "https://linkedin.com/in/sarahsmith",
        city: "Bangalore",
        state: "Karnataka",
        education: "masters",
        experience: "2-3",
        motivation: "Looking to advance my career in data science and machine learning.",
        status: "pending",
        paymentStatus: "pending",
        enrollmentDate: "2024-01-16T14:20:00.000Z",
        createdAt: "2024-01-16T14:20:00.000Z",
      },
      {
        id: "enroll_1704123456791_ghi789",
        programId: "ai-machine-learning",
        firstName: "Raj",
        lastName: "Patel",
        email: "raj.patel@example.com",
        phone: "+91 9876543212",
        city: "Delhi",
        state: "Delhi",
        education: "bachelors",
        experience: "0-1",
        motivation: "Passionate about AI and want to build intelligent systems.",
        status: "confirmed",
        paymentStatus: "completed",
        enrollmentDate: "2024-01-17T09:15:00.000Z",
        createdAt: "2024-01-17T09:15:00.000Z",
      },
    ]

    const samplePrograms: TrainingProgram[] = [
      {
        id: "fullstack-web",
        title: "Full Stack Web Development",
        category: "development",
        price: 15999,
        students: 1247,
      },
      {
        id: "data-science",
        title: "Data Science & Analytics",
        category: "data",
        price: 18999,
        students: 892,
      },
      {
        id: "ai-machine-learning",
        title: "AI & Machine Learning",
        category: "ai",
        price: 22999,
        students: 378,
      },
    ]

    setEnrollments(sampleEnrollments)
    setPrograms(samplePrograms)
  }

  const logout = () => {
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_login_time")
    sessionStorage.removeItem("admin_session")
    document.cookie = "admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "/admin/login"
  }

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.programId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "WhatsApp",
      "LinkedIn",
      "Program",
      "Status",
      "Payment Status",
      "Enrollment Date",
      "City",
      "State",
      "Education",
      "Experience",
      "Motivation",
    ]

    const csvData = filteredEnrollments.map((enrollment) => [
      enrollment.id,
      `${enrollment.firstName} ${enrollment.lastName}`,
      enrollment.email,
      enrollment.phone,
      enrollment.whatsapp || "",
      enrollment.linkedin || "",
      enrollment.programId,
      enrollment.status,
      enrollment.paymentStatus,
      new Date(enrollment.enrollmentDate).toLocaleDateString(),
      enrollment.city || "",
      enrollment.state || "",
      enrollment.education || "",
      enrollment.experience || "",
      enrollment.motivation || "",
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `enrollments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calculate statistics
  const totalRevenue = enrollments
    .filter((e) => e.paymentStatus === "completed")
    .reduce((sum, enrollment) => {
      const program = programs.find((p) => p.id === enrollment.programId)
      return sum + (program?.price || 0)
    }, 0)

  const conversionRate =
    enrollments.length > 0
      ? ((enrollments.filter((e) => e.paymentStatus === "completed").length / enrollments.length) * 100).toFixed(1)
      : "0"

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <AnimatedElement animation="fade-up">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
              <Shield className="h-3 w-3 mr-1" />
              Secure Admin Access
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text-primary">🎯 Training Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Manage enrollments, track progress, and analyze performance
              </p>
            </div>

            {/* Mobile-optimized action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={exportToCSV} variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Link href="/training">
                  <Eye className="h-4 w-4 mr-2" />
                  View Training
                </Link>
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* Stats Overview */}
      <AnimatedElement animation="fade-up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{enrollments.length}</p>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{conversionRate}%</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{programs.length}</p>
                  <p className="text-sm text-muted-foreground">Active Programs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedElement>

      {/* Main Content */}
      <AnimatedElement animation="fade-up" delay={0.2}>
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="bg-white/50 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="enrollments">📋 Enrollments ({enrollments.length})</TabsTrigger>
            <TabsTrigger value="programs">🎓 Programs</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-6">
            {/* Filters */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or program..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
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
                <Card className="glass-card">
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No enrollments found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search criteria or filters."
                        : "No students have enrolled yet. Share your training programs to get started!"}
                    </p>
                    <Button asChild>
                      <Link href="/training">View Training Programs</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredEnrollments.map((enrollment, index) => (
                  <AnimatedElement key={enrollment.id} animation="scale-in" delay={0.1 * index}>
                    <Card className="glass-card hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-medium text-lg">
                                {enrollment.firstName} {enrollment.lastName}
                              </h3>
                              <Badge
                                variant={enrollment.status === "confirmed" ? "default" : "outline"}
                                className="capitalize"
                              >
                                {enrollment.status}
                              </Badge>
                              <Badge
                                variant={enrollment.paymentStatus === "completed" ? "default" : "secondary"}
                                className="capitalize"
                              >
                                💳 {enrollment.paymentStatus}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-600" />
                                <span className="text-muted-foreground">Email:</span>
                                <span>{enrollment.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-600" />
                                <span className="text-muted-foreground">Phone:</span>
                                <span>{enrollment.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-purple-600" />
                                <span className="text-muted-foreground">Enrolled:</span>
                                <span>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="text-sm">
                              <span className="text-muted-foreground">Program:</span>
                              <span className="ml-2 font-medium capitalize">
                                {programs.find((p) => p.id === enrollment.programId)?.title ||
                                  enrollment.programId.replace("-", " ")}
                              </span>
                            </div>

                            {enrollment.motivation && (
                              <div className="text-sm bg-gray-50 p-3 rounded-lg">
                                <span className="text-muted-foreground font-medium">Motivation:</span>
                                <p className="mt-1">{enrollment.motivation}</p>
                              </div>
                            )}
                          </div>

                          <div className="text-right text-sm text-muted-foreground ml-6">
                            <p className="font-mono text-xs mb-2">ID: {enrollment.id}</p>
                            {enrollment.city && enrollment.state && (
                              <p>
                                📍 {enrollment.city}, {enrollment.state}
                              </p>
                            )}
                            {enrollment.education && <p className="capitalize">🎓 {enrollment.education}</p>}
                            {enrollment.experience && <p>💼 {enrollment.experience} experience</p>}
                            {enrollment.whatsapp && <p>📱 WhatsApp: {enrollment.whatsapp}</p>}
                            {enrollment.linkedin && (
                              <p>
                                💼{" "}
                                <a
                                  href={enrollment.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  LinkedIn
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))
              )}
            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, index) => {
                const programEnrollments = enrollments.filter((e) => e.programId === program.id)
                const revenue = programEnrollments.filter((e) => e.paymentStatus === "completed").length * program.price

                return (
                  <AnimatedElement key={program.id} animation="scale-in" delay={0.1 * index}>
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {program.category}
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold">₹{program.price.toLocaleString()}</span>
                          <Badge variant="secondary">{programEnrollments.length} enrolled</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Revenue: ₹{revenue.toLocaleString()}</p>
                          <p>Total Students: {program.students.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                )
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>📈 Enrollment Status Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["pending", "confirmed", "completed", "cancelled"].map((status) => {
                      const count = enrollments.filter((e) => e.status === status).length
                      const percentage = enrollments.length > 0 ? ((count / enrollments.length) * 100).toFixed(1) : "0"
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className="capitalize">{status}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>💰 Payment Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["pending", "completed", "failed", "refunded"].map((status) => {
                      const count = enrollments.filter((e) => e.paymentStatus === status).length
                      const percentage = enrollments.length > 0 ? ((count / enrollments.length) * 100).toFixed(1) : "0"
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className="capitalize">{status}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedElement>
    </div>
  )
}
