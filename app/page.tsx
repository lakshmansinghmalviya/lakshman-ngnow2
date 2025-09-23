"use client"

import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  Code,
  FileText,
  GraduationCap,
  Star,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  Lightbulb,
  MousePointer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { AnimatedElement, AnimatedText, AnimatedCounter } from "@/components/ui/animated-element"
import { FloatingElement, MorphingBlob } from "@/components/ui/floating-element"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-mesh">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {isMounted && <ParticlesBackground particleCount={30} connectDistance={150} />}
          <MorphingBlob
            className="absolute top-1/4 right-1/4 -z-10"
            color="bg-purple-light/20"
            size="w-64 h-64"
            blur="blur-3xl"
            duration={12}
          />
          <MorphingBlob
            className="absolute bottom-1/3 left-1/3 -z-10"
            color="bg-teal-light/20"
            size="w-80 h-80"
            blur="blur-3xl"
            duration={15}
          />
          <MorphingBlob
            className="absolute top-1/2 left-1/4 -z-10"
            color="bg-orange-light/20"
            size="w-72 h-72"
            blur="blur-3xl"
            duration={18}
          />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fade-left" delay={0.2} className="flex flex-col justify-center space-y-6">
              <AnimatedElement
                animation="fade-up"
                delay={0.4}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-purple-light/20 shadow-sm w-fit"
              >
                <Badge
                  variant="outline"
                  className="bg-primary/10 border-primary/30 text-primary px-3 py-1 rounded-full"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-yellow-light animate-pulse-slow" />
                  #1 Learning Platform for Engineering Students
                </Badge>
              </AnimatedElement>

              <div className="space-y-4">
                <AnimatedText
                  text="Enginow"
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-text-primary font-kolka"
                  animation="fade-up"
                  staggerChildren={0.05}
                  delay={0.6}
                />
                <AnimatedElement animation="fade-up" delay={0.8}>
                  <h2 className="block mt-2 text-4xl font-bold" style={{ color: "#9A2FC4" }}>
                    Learn Fast, Understand Better
                  </h2>
                </AnimatedElement>
                <AnimatedElement animation="fade-up" delay={1}>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Comprehensive learning resources for engineering students and learners of Computer
                    Science/IT-related subjects.
                  </p>
                </AnimatedElement>
              </div>

              <AnimatedElement animation="fade-up" delay={1.2} className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="gradient-button text-white rounded-full px-8 shadow-lg animate-pulse-slow"
                >
                  <Link href="/courses" className="flex items-center gap-2">
                    Explore Courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 rounded-full"
                >
                  <Link href="/learn">Start Learning</Link>
                </Button>
              </AnimatedElement>

              <AnimatedElement
                animation="fade-up"
                delay={1.4}
                className="flex items-center gap-4 mt-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`/student${i}.jpg`}
                        width={32}
                        height={32}
                        alt={`Student ${i}`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-medium">
                    <AnimatedCounter
                      from={4.5}
                      to={4.9}
                      duration={2}
                      delay={1.6}
                      formatter={(value) => value.toFixed(1)}
                    />
                  </span>{" "}
                  <span className="text-yellow-500">
                    <Star className="inline h-4 w-4 fill-current" />
                  </span>{" "}
                  <span className="text-muted-foreground">
                    (
                    <AnimatedCounter
                      from={25}
                      to={100}
                      duration={2}
                      delay={1.6}
                      formatter={(value) => `${Math.round(value)}+ students`}
                    />
                    )
                  </span>
                </div>
              </AnimatedElement>
            </AnimatedElement>

            <AnimatedElement animation="fade-right" delay={0.4} className="mx-auto lg:mx-0 relative">
              <FloatingElement amplitude={15} duration={6} className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-teal/20 to-purple-light/20 rounded-2xl blur-xl -z-10 animate-pulse-slow"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-teal to-purple-light rounded-2xl -z-5 opacity-70"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-1 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/90 to-transparent z-10"></div>
                  <Image
                    src="/Enginow White.png?height=550&width=550"
                    width={550}
                    height={550}
                    alt="Hero Image"
                    className="rounded-xl object-cover shadow-lg"
                    priority
                  />
                </div>

                <FloatingElement
                  amplitude={10}
                  duration={5}
                  delay={1}
                  className="absolute -bottom-6 -left-6 glass-card rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <AnimatedCounter
                        from={30}
                        to={50}
                        duration={2}
                        formatter={(value) => `${Math.round(value)}+ Courses`}
                      />
                    </p>
                    <p className="text-xs text-muted-foreground">Learn at your own pace</p>
                  </div>
                </FloatingElement>

                <FloatingElement
                  amplitude={10}
                  duration={5}
                  delay={0.5}
                  className="absolute -top-6 -right-6 glass-card rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="bg-orange/10 p-2 rounded-full">
                    <FileText className="h-6 w-6 text-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <AnimatedCounter
                        from={100}
                        to={200}
                        duration={2}
                        formatter={(value) => `${Math.round(value)}+ Notes`}
                      />
                    </p>
                    <p className="text-xs text-muted-foreground">Simplified concepts</p>
                  </div>
                </FloatingElement>
              </FloatingElement>
            </AnimatedElement>
          </div>

          <AnimatedElement
            animation="fade-up"
            delay={1.8}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
            <MousePointer className="h-5 w-5 text-primary animate-bounce-slow" />
          </AnimatedElement>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
        <div className="container px-4 md:px-6 relative">
          <AnimatedElement
            animation="fade-up"
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <Badge
              variant="outline"
              className="bg-secondary/10 border-secondary text-secondary px-4 py-1 mb-2 rounded-full"
            >
              <Zap className="h-3.5 w-3.5 mr-1.5 text-yellow animate-pulse-slow" />
              Features
            </Badge>
            <div className="space-y-2">
              <AnimatedText
                text="Why Choose Enginow?"
                className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text-secondary font-kolka"
                animation="fade-up"
                staggerChildren={0.03}
              />
              <AnimatedElement animation="fade-up" delay={0.3}>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  We provide comprehensive resources to help you excel in your technical education.
                </p>
              </AnimatedElement>
            </div>
          </AnimatedElement>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedElement animation="zoom-in" delay={0.1} className="feature-card glass-card glow-on-hover">
              <div className="feature-icon bg-gradient-to-br from-primary to-purple-light text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-2 gradient-text-primary">Free Courses</CardTitle>
              <p className="text-sm text-muted-foreground">
                Access our library of free courses covering essential technical subjects.
              </p>
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-primary/5 rounded-tl-[100px]"></div>
            </AnimatedElement>

            <AnimatedElement
              animation="zoom-in"
              delay={0.2}
              className="feature-card glass-card glow-on-hover-secondary"
            >
              <div className="feature-icon bg-gradient-to-br from-teal to-blue-light text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-2 gradient-text-secondary">Premium Content</CardTitle>
              <p className="text-sm text-muted-foreground">Unlock advanced courses and personalized learning paths.</p>
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-secondary/5 rounded-tl-[100px]"></div>
            </AnimatedElement>

            <AnimatedElement animation="zoom-in" delay={0.3} className="feature-card glass-card glow-on-hover-accent">
              <div className="feature-icon bg-gradient-to-br from-orange to-pink-light text-white">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-2 gradient-text-accent">Concept Notes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Simplified notes and cheat sheets for quick revision and better understanding.
              </p>
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-orange/5 rounded-tl-[100px]"></div>
            </AnimatedElement>

            <AnimatedElement animation="zoom-in" delay={0.4} className="feature-card glass-card glow-on-hover">
              <div className="feature-icon bg-gradient-to-br from-green to-teal text-white">
                <Code className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-2 gradient-text-primary">Practical Learning</CardTitle>
              <p className="text-sm text-muted-foreground">
                Hands-on projects and coding exercises to reinforce concepts.
              </p>
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-green/5 rounded-tl-[100px]"></div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Latest Courses Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container px-4 md:px-6 relative">
          <AnimatedElement
            animation="fade-up"
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <Badge variant="outline" className="bg-primary/10 border-primary text-primary px-4 py-1 mb-2 rounded-full">
              <Brain className="h-3.5 w-3.5 mr-1.5 text-primary animate-pulse-slow" />
              Latest Courses
            </Badge>
            <div className="space-y-2">
              <AnimatedText
                text="Explore Our Newest Courses"
                className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text-primary"
                animation="fade-up"
                staggerChildren={0.03}
              />
              <AnimatedElement animation="fade-up" delay={0.3}>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Designed to help you master technical concepts with ease.
                </p>
              </AnimatedElement>
            </div>
          </AnimatedElement>

          <div className="mx-auto py-8">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {[
                  {
                    title: "Data Structures & Algorithms",
                    description: "Master the fundamentals of DSA with practical examples",
                    image: "/placeholder.svg?height=200&width=350",
                    isNew: true,
                    isFree: false,
                    color: "purple",
                    youtubeLink: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU",
                  },
                  {
                    title: "Computer Organization & Architecture",
                    description: "Understand the inner workings of computer systems",
                    image: "/placeholder.svg?height=200&width=350",
                    isNew: true,
                    isFree: false,
                    color: "teal",
                    youtubeLink: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
                  },
                  {
                    title: "Operating Systems",
                    description: "Learn about process management, memory, and file systems",
                    image: "/placeholder.svg?height=200&width=350",
                    isNew: false,
                    isFree: false,
                    color: "orange",
                    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
                  },
                  {
                    title: "Advanced Java Programming",
                    description: "Take your Java skills to the next level",
                    image: "/placeholder.svg?height=200&width=350",
                    isNew: false,
                    isFree: false,
                    price: "₹999",
                    color: "pink",
                    youtubeLink: "",
                  },
                ].map((course, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <AnimatedElement animation="scale-in" delay={0.1 * index} className="p-1">
                      <Card className="glass-card overflow-hidden card-hover group">
                        <div
                          className={`h-1.5 w-full bg-gradient-to-r from-${course.color} to-${course.color}-light`}
                        ></div>
                        <CardHeader className="p-0">
                          <div className="relative overflow-hidden">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              width={350}
                              height={200}
                              className="object-cover w-full h-[200px] transition-transform duration-500 group-hover:scale-110"
                            />
                            {course.isNew && (
                              <span className="absolute top-2 right-2 bg-gradient-to-r from-primary to-purple-light text-white text-xs px-3 py-1 rounded-full shadow-md animate-pulse-slow">
                                New
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg gradient-text-primary">{course.title}</CardTitle>
                          <CardDescription className="mt-2">{course.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          {course.isFree ? (
                            <span className="text-sm font-medium text-green">Free</span>
                          ) : (
                            <span className="text-sm font-medium gradient-text-accent">{course.price}</span>
                          )}
                          {course.isFree && course.youtubeLink ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary text-primary hover:bg-primary/10 rounded-full"
                              asChild
                            >
                              <a href={course.youtubeLink} target="_blank" rel="noopener noreferrer">
                                Watch on YouTube
                              </a>
                            </Button>
                          ) : (
                            <Button size="sm" className="gradient-button text-white rounded-full">
                              Coming Soon
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </AnimatedElement>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative mr-2 bg-white/80 backdrop-blur-sm border border-white/30" />
                <CarouselNext className="relative ml-2 bg-white/80 backdrop-blur-sm border border-white/30" />
              </div>
            </Carousel>

            <AnimatedElement animation="fade-up" delay={0.5} className="flex justify-center mt-8">
              <Button
                asChild
                variant="outline"
                className="group border-primary text-primary hover:bg-primary/10 rounded-full"
              >
                <Link href="/courses" className="flex items-center gap-2">
                  View All Courses <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container px-4 md:px-6 relative">
          <AnimatedElement
            animation="fade-up"
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <Badge variant="outline" className="bg-orange/10 border-orange text-orange px-4 py-1 mb-2 rounded-full">
              <Lightbulb className="h-3.5 w-3.5 mr-1.5 text-yellow animate-pulse-slow" />
              Testimonials
            </Badge>
            <div className="space-y-2">
              <AnimatedText
                text="What Our Students Say"
                className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text-accent"
                animation="fade-up"
                staggerChildren={0.03}
              />
              <AnimatedElement animation="fade-up" delay={0.3}>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See what our students have to say about their learning experience.
                </p>
              </AnimatedElement>
            </div>
          </AnimatedElement>

          <div className="mx-auto py-8">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {[
                  {
                    name: "Sonam Yadav",
                    college: "Amity ,Noida",
                    review:
                      "Enginow helped me understand complex DSA concepts that I was struggling with. The visual explanations are excellent!",
                    image: "/student3.jpg?height=80&width=80",
                    rating: 5,
                  },
                  {
                    name: "Arun Kumar",
                    college: "PSIT",
                    review:
                      "The concept notes are concise and to the point. Saved me hours of reading through textbooks. Highly recommended!",
                    image: "/student1.jpg?height=80&width=80",
                    rating: 5,
                  },
                  {
                    name: "Kirti Pilani",
                    college: "KIET",
                    review:
                      "The premium courses are worth every penny. The depth of content and practical examples helped me ace my exams.",
                    image: "/student2.jpg?height=80&width=80",
                    rating: 4,
                  },
                ].map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                    <AnimatedElement animation="scale-in" delay={0.1 * index} className="p-1">
                      <Card className="glass-card h-full card-hover relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange/10 to-pink/10 rounded-bl-full -z-10 blob-animation"></div>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <div className="mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange to-pink blur-md opacity-30"></div>
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover border-2 border-white relative z-10"
                            />
                          </div>
                          <div className="flex mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "text-yellow fill-yellow" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mb-4 text-muted-foreground italic">"{testimonial.review}"</p>
                          <div>
                            <h4 className="font-semibold gradient-text-accent">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.college}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedElement>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative mr-2 bg-white/80 backdrop-blur-sm border border-white/30" />
                <CarouselNext className="relative ml-2 bg-white/80 backdrop-blur-sm border border-white/30" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-dark to-purple-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.3),transparent)]"></div>
        </div>
        <div className="container px-4 md:px-6 relative">
          <AnimatedElement
            animation="fade-up"
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <FloatingElement
              amplitude={5}
              duration={3}
              className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm w-fit"
            >
              <Sparkles className="h-5 w-5 mr-2 text-yellow animate-pulse-slow" />
              <span className="text-white font-medium">Join Our Community</span>
            </FloatingElement>

            <div className="space-y-4">
              <AnimatedText
                text="Ready to Simplify Your Learning?"
                className="text-3xl font-bold tracking-tighter md:text-4xl text-white"
                animation="fade-up"
                staggerChildren={0.03}
              />
              <AnimatedElement animation="fade-up" delay={0.3}>
                <p className="max-w-[900px] text-white/80 md:text-xl">
                  Join thousands of students who are already benefiting from our courses and resources.
                </p>
              </AnimatedElement>
            </div>

            <AnimatedElement animation="fade-up" delay={0.5} className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 shadow-lg animate-pulse-slow"
              >
                <Link href="/courses" className="flex items-center gap-2">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 border-white rounded-full"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </AnimatedElement>
          </AnimatedElement>
        </div>
      </section>
    </div>
  )
}
