"use client"

import Link from "next/link"
import { useState } from "react"
import { MapPin, Clock, DollarSign, Users, BookOpen, GraduationCap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

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
            <CardContent>
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
              <Button asChild className="w-full">
                <Link
                  href="https://www.linkedin.com/company/enginow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </Link>
              </Button>
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
