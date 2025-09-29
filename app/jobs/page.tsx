"use client"

import Link from "next/link"
import { useState } from "react"
import { MapPin, Clock, DollarSign, Users, BookOpen, GraduationCap, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Upload, FileText } from "lucide-react"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    currentRole: "",
    expectedSalary: "",
    noticePeriod: "",
    coverLetter: "",
    resume: null as File | null,
  })

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "3-5 years",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      description: "Join our dynamic team to build scalable web applications using modern technologies.",
      posted: "2 days ago",
      applicants: 45,
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹15-22 LPA",
      experience: "2-4 years",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      description: "Analyze complex datasets and build predictive models to drive business insights.",
      posted: "1 week ago",
      applicants: 32,
    },
    {
      id: 3,
      title: "Frontend Developer Intern",
      company: "StartupXYZ",
      location: "Remote",
      type: "Internship",
      salary: "₹15,000/month",
      experience: "0-1 years",
      skills: ["React", "JavaScript", "CSS", "Git"],
      description: "Great opportunity for fresh graduates to work on exciting projects.",
      posted: "3 days ago",
      applicants: 78,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Inc",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹10-16 LPA",
      experience: "2-4 years",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
      posted: "5 days ago",
      applicants: 23,
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppMakers Ltd",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹8-14 LPA",
      experience: "1-3 years",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      description: "Develop cross-platform mobile applications for our growing user base.",
      posted: "1 week ago",
      applicants: 56,
    },
    {
      id: 6,
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹6-12 LPA",
      experience: "1-3 years",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
      posted: "4 days ago",
      applicants: 34,
      jobDescription: "We are looking for a talented UI/UX Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts.",
      roles: [
        "Design user interfaces for web and mobile applications",
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Conduct user research and usability testing",
        "Collaborate with development teams",
        "Maintain design systems and style guides"
      ],
      responsibilities: [
        "Gather and evaluate user requirements in collaboration with product managers and engineers",
        "Illustrate design ideas using storyboards, process flows and sitemaps",
        "Design graphic user interface elements, like menus, tabs and widgets",
        "Build page navigation buttons and search fields",
        "Develop UI mockups and prototypes that clearly illustrate how sites function and look like",
        "Create original graphic designs (e.g. images, sketches and tables)",
        "Prepare and present rough drafts to internal teams and key stakeholders",
        "Identify and troubleshoot UX problems (e.g. responsiveness)",
        "Conduct layout adjustments based on user feedback",
        "Adhere to style standards on fonts, colors and images"
      ],
      requiredSkills: [
        "Proven work experience as a UI/UX Designer or similar role",
        "Portfolio of design projects",
        "Knowledge of wireframe tools (e.g. Wireframe.cc and InVision)",
        "Up-to-date knowledge of design software like Adobe Illustrator and Photoshop",
        "Team spirit; strong communication skills to collaborate with various stakeholders",
        "Good time-management skills",
        "BSc in Design, Computer Science or relevant field"
      ]
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation =
      locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = typeFilter === "all" || job.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesLocation && matchesType
  })

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        })
        return
      }
      setApplicationData(prev => ({
        ...prev,
        resume: file
      }))
    }
  }

  const handleJobApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJob) return

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      Object.entries(applicationData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value)
        }
      })
      formData.append('jobTitle', selectedJob.title)
      formData.append('company', selectedJob.company)
      formData.append('jobId', selectedJob.id.toString())

      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: "Your job application has been sent successfully. We'll get back to you soon.",
        })
        
        // Reset form
        setApplicationData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          experience: "",
          currentRole: "",
          expectedSalary: "",
          noticePeriod: "",
          coverLetter: "",
          resume: null,
        })
        setSelectedJob(null)
      } else {
        toast({
          title: "Application Failed",
          description: result.error || "Failed to submit application",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Job application error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = applicationData.firstName && 
                     applicationData.lastName && 
                     applicationData.email && 
                     applicationData.phone && 
                     applicationData.experience && 
                     applicationData.resume

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Career Opportunities</h1>
        <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Find your dream job or enhance your skills with our training programs. Start your journey to success today.
        </p>
      </div>

      {/* Training & Internship Card */}
      <div className="mb-12">
        <Card className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-purple-900">Training & Internship Programs</CardTitle>
                <CardDescription className="text-purple-700">
                  Transform your career with industry-focused training programs
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-800">6 Different Domains</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-800">Expert Mentorship</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-800">Industry Certification</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Full Stack Development",
                "Data Science",
                "AI & ML",
                "DevOps",
                "Mobile Development",
                "Cybersecurity",
              ].map((domain) => (
                <Badge key={domain} variant="outline" className="bg-white/50 border-purple-300 text-purple-700">
                  {domain}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/training" className="w-full">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Explore Training Programs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search jobs by title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Results */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Jobs Grid */}
      
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                  <CardDescription className="text-base font-medium text-foreground">{job.company}</CardDescription>
                </div>
                <Badge variant={job.type === "Internship" ? "secondary" : "default"}>{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="overflow-auto">
              <p className="text-muted-foreground mb-4">{job.description}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.applicants} applicants</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full"
                    onClick={() => setSelectedJob(job)}
                  >
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
                    <DialogDescription className="text-lg">{job.company}</DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mt-6">
                    {/* Job Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {job.jobDescription || job.description}
                        </p>
                      </div>
                      
                      {job.roles && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Key Roles</h3>
                          <ul className="space-y-2">
                            {job.roles.map((role, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{role}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {job.responsibilities && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                          <ul className="space-y-2">
                            {job.responsibilities.slice(0, 5).map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {job.requiredSkills && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {job.requiredSkills.slice(0, 4).map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Application Form */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Apply for this Position</h3>
                      <form onSubmit={handleJobApplication} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={applicationData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={applicationData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={applicationData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={applicationData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="experience">Experience *</Label>
                            <Select onValueChange={(value) => handleInputChange("experience", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fresher">Fresher</SelectItem>
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5+">5+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="currentRole">Current Role</Label>
                            <Input
                              id="currentRole"
                              value={applicationData.currentRole}
                              onChange={(e) => handleInputChange("currentRole", e.target.value)}
                              placeholder="Your current position"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expectedSalary">Expected Salary</Label>
                            <Input
                              id="expectedSalary"
                              value={applicationData.expectedSalary}
                              onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                              placeholder="e.g., ₹8-12 LPA"
                            />
                          </div>
                          <div>
                            <Label htmlFor="noticePeriod">Notice Period</Label>
                            <Input
                              id="noticePeriod"
                              value={applicationData.noticePeriod}
                              onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
                              placeholder="e.g., 30 days"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="resume">Resume Upload *</Label>
                          <div className="mt-1">
                            <input
                              id="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="hidden"
                              required
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => document.getElementById('resume')?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              {applicationData.resume ? applicationData.resume.name : "Upload Resume (PDF, DOC, DOCX)"}
                            </Button>
                          </div>
                          {applicationData.resume && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                              <FileText className="h-4 w-4" />
                              <span>File selected: {applicationData.resume.name}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="coverLetter">Cover Letter</Label>
                          <Textarea
                            id="coverLetter"
                            value={applicationData.coverLetter}
                            onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                            placeholder="Tell us why you're interested in this position..."
                            rows={4}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={!isFormValid || isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setLocationFilter("all")
              setTypeFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
