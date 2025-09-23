"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Clock, Users, Star, CheckCircle, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TrainingProgram {
  id: string
  title: string
  category: string
  duration: string
  level: string
  price: number
  originalPrice: number
  rating: number
  students: number
  description: string
  features: string[]
  highlights: string[]
  image: string
  popular?: boolean
  isActive: boolean
}

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [programs, setPrograms] = useState<TrainingProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { id: "all", label: "All Programs" },
    { id: "development", label: "Development" },
    { id: "data", label: "Data Science" },
    { id: "ai", label: "AI & ML" },
    { id: "infrastructure", label: "DevOps & Cloud" },
    { id: "security", label: "Cybersecurity" },
  ]

  useEffect(() => {
    fetchPrograms()
  }, [selectedCategory])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/training/programs?category=${selectedCategory}`)
      const result = await response.json()

      if (result.success) {
        setPrograms(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to fetch programs")
      }
    } catch (err) {
      setError("Failed to fetch programs")
      console.error("Error fetching programs:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading training programs...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchPrograms}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Training & Internship Programs
        </h1>
        <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Transform your career with industry-focused training programs. Learn from experts, work on real projects, and
          get certified in cutting-edge technologies.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Programs Grid */}
      {programs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No programs found for the selected category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {program.popular && (
                <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 z-10">Popular</Badge>
              )}

              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative">
                <img
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg line-clamp-2">{program.title}</CardTitle>
                    <CardDescription className="mt-1">{program.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {program.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {program.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What you'll learn:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {program.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {program.features.length > 4 && (
                    <p className="text-xs text-muted-foreground mt-1">+{program.features.length - 4} more topics</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">₹{program.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{program.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">
                      Save ₹{(program.originalPrice - program.price).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline">{program.level}</Badge>
                </div>
              </CardContent>

              <CardFooter>
                <Link href={`/training/enroll/${program.id}`} className="w-full">
                  <Button className="w-full">
                    Enroll Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Not sure which program is right for you?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Book a free consultation with our career counselors to find the perfect training program that aligns with your
          goals and experience level.
        </p>
        <Button size="lg" variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Book Free Consultation
        </Button>
      </div>
    </div>
  )
}
