"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AnimatedElement } from "@/components/ui/animated-element"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, CircleCheck as CheckCircle } from "lucide-react"

export const courses = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA with practical examples",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: true,
    category: "Programming",
    color: "purple",
    youtubeLink: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU",
  },
  {
    id: 2,
    title: "Computer Organization & Architecture",
    description: "Understand the inner workings of computer systems",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: true,
    category: "Systems",
    color: "teal",
    youtubeLink: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
  },
  {
    id: 3,
    title: "Operating Systems",
    description: "Learn about process management, memory, and file systems",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Systems",
    color: "orange",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
  },
  {
    id: 4,
    title: "Advanced Java Programming",
    description: "Take your Java skills to the next level",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "₹999",
    category: "Programming",
    color: "pink",
    youtubeLink: "",
  },
  {
    id: 5,
    title: "Discrete Mathematics",
    description: "Essential mathematical concepts for computer science",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Mathematics",
    color: "purple",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3",
  },
  {
    id: 6,
    title: "Automata Theory",
    description: "Understand formal languages and computational models",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Theory",
    color: "teal",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev",
  },
  {
    id: 7,
    title: "C Programming",
    description: "Learn the fundamentals of C programming language",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Programming",
    color: "orange",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
  },
  {
    id: 8,
    title: "C++ Programming",
    description: "Master object-oriented programming with C++",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Programming",
    color: "pink",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRh6isJ01MBnbNpV3ZsktSyS",
  },
  {
    id: 9,
    title: "Database Management Systems",
    description: "Learn SQL and database design principles",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "₹799",
    category: "Systems",
    color: "purple",
    youtubeLink: "",
  },
  {
    id: 10,
    title: "Advanced Algorithms",
    description: "Deep dive into complex algorithmic techniques",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: false,
    price: "₹1299",
    category: "Programming",
    color: "teal",
    youtubeLink: "",
  },
  {
    id: 11,
    title: "Machine Learning Fundamentals",
    description: "Introduction to ML concepts and algorithms",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: false,
    price: "₹1499",
    category: "AI",
    color: "orange",
    youtubeLink: "",
  },
  {
    id: 12,
    title: "Web Development Bootcamp",
    description: "Full-stack web development with modern technologies",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "₹1999",
    category: "Web",
    color: "pink",
    youtubeLink: "",
  },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCourses, setVisibleCourses] = useState(9)
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<any>(null)
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    filterCourses(activeTab, searchQuery)
  }, [activeTab, searchQuery])

  useEffect(() => {
    const qp = searchParams?.get("search") || ""
    if (qp) {
      setSearchQuery(qp)
      setActiveTab("all")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterCourses = (tab: string, query: string) => {
    let filtered = courses

    // Filter by tab
    if (tab === "free") {
      filtered = filtered.filter((course) => course.isFree)
    } else if (tab === "premium") {
      filtered = filtered.filter((course) => !course.isFree)
    }

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(lowercaseQuery) ||
          course.description.toLowerCase().includes(lowercaseQuery) ||
          course.category.toLowerCase().includes(lowercaseQuery),
      )
    }

    setFilteredCourses(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setVisibleCourses(9)
  }

  const handleLoadMore = () => {
    setVisibleCourses((prev) => prev + 6)
  }

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course)
    setShowEnrollmentForm(true)
    const path = `/training/enroll/${course.title.split(" ").join("-")}?source=${course.title.split(" ").join("-")}&id=${course.id}`;
    router.push(path)
  }

  const getCourseDetails = (course: any) => {
    const courseDetails = {
      ...course,
      modules: [
        "Introduction and Fundamentals",
        "Core Concepts and Theory",
        "Practical Implementation",
        "Advanced Topics",
        "Project Work",
        "Assessment and Certification"
      ],
      topics: course.category === "Programming" ? [
        "Variables and Data Types",
        "Control Structures",
        "Functions and Methods",
        "Object-Oriented Programming",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Best Practices"
      ] : course.category === "Systems" ? [
        "System Architecture",
        "Process Management",
        "Memory Management",
        "File Systems",
        "I/O Operations",
        "Security",
        "Performance Optimization",
        "Troubleshooting"
      ] : [
        "Theoretical Foundations",
        "Mathematical Concepts",
        "Practical Applications",
        "Problem Solving",
        "Case Studies",
        "Research Methods",
        "Analysis Techniques",
        "Real-world Examples"
      ],
      duration: "8-12 weeks",
      level: "Beginner to Intermediate",
      prerequisites: course.category === "Programming" ? "Basic computer knowledge" : "Mathematics fundamentals",
      certification: "Certificate of Completion",
      support: "24/7 Community Support"
    }
    return courseDetails
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <Badge variant="outline" className="bg-primary/10 border-primary text-primary px-4 py-1 mb-2">
          Our Courses
        </Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading font-kolka">
          Explore Our Courses
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Comprehensive collection of courses designed for engineering students
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full mb-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-auto p-1 bg-muted">
          <TabsTrigger value="all" className="py-2">
            All Courses
          </TabsTrigger>
          <TabsTrigger value="free" className="py-2">
            Free
          </TabsTrigger>
          <TabsTrigger value="premium" className="py-2">
            Premium
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.slice(0, visibleCourses).map((course, index) => (
          <AnimatedElement key={index} animation="fade-up" delay={0.05 * index} className="h-full">
            <Card className="bg-white overflow-hidden card-hover h-full">
              <div className={`h-1.5 w-full bg-${course.color}`}></div>
              <CardHeader className="p-0">
                <div className="relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          width={350}
                          height={200}
                          className="object-cover w-full h-[200px] hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold gradient-text-primary">{course.title}</DialogTitle>
                        <DialogDescription className="text-lg">{course.description}</DialogDescription>
                      </DialogHeader>

                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Course Overview</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>Duration: {getCourseDetails(course).duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span>Level: {getCourseDetails(course).level}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-primary" />
                                <span>Prerequisites: {getCourseDetails(course).prerequisites}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-3">Course Modules</h3>
                            <div className="space-y-2">
                              {getCourseDetails(course).modules.map((module: any, idx: string) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>Module {idx + 1}: {module}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Topics Covered</h3>
                            <div className="grid grid-cols-1 gap-2">
                              {getCourseDetails(course).topics.map((topic: string, idx: string) => (
                                <Badge key={idx} variant="outline" className="justify-start text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-3">What You'll Get</h3>
                            <div className="space-y-2">
                              {[
                                getCourseDetails(course).certification,
                                getCourseDetails(course).support,
                                "Lifetime Access",
                                "Downloadable Resources",
                                "Practice Exercises"
                              ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {!course.isFree && (
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-purple-900 mb-2">Ready to Start?</h4>
                              <p className="text-sm text-purple-700 mb-3">
                                Join thousands of students who have already enrolled in this course.
                              </p>
                              <Button
                                className="w-full bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleEnrollClick(course)}
                              >
                                Enroll Now - {course.price}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/60">
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <Badge className={`bg-${course.color} hover:bg-${course.color}`}>{course.category}</Badge>
                      {course.isNew && (
                        <Badge variant="outline" className="bg-white/20 border-white text-white">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-full bg-${course.color}/10`}>
                    <BookOpen className={`h-3.5 w-3.5 text-${course.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">12 lessons • 6 hours</span>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="mt-2">{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                {course.isFree ? (
                  <span className="text-sm font-medium text-green-600">Free</span>
                ) : (
                  <span className="text-sm font-medium">{course.price}</span>
                )}
                {course.isFree && course.youtubeLink ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={`/courses/watch/${course.id}`}>
                      Watch Now
                    </a>
                  </Button>
                ) : (
                  <>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-purple-dark hover:opacity-90"
                      onClick={() => handleEnrollClick(course)}
                    >
                      Enroll Now
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-purple-dark hover:opacity-90" disabled>
                      Coming Soon
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </AnimatedElement>
        ))}
      </div>

      {visibleCourses < filteredCourses.length && (
        <div className="flex justify-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={handleLoadMore}
            >
              Load More Courses
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
