"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "@/components/ui/animated-element"

export default function BlogPage() {
  const [visiblePosts, setVisiblePosts] = useState(6)

  const blogPosts = [
    {
      title: "Understanding Time Complexity in Algorithms",
      excerpt: "A comprehensive guide to analyzing algorithm efficiency using Big O notation and practical examples.",
      image: "/placeholder.svg?height=200&width=350&text=Algorithms",
      date: "April 15, 2023",
      readTime: "8 min read",
      author: "Dr. Rajesh Kumar",
      tags: ["DSA", "Algorithms", "Computer Science"],
      slug: "understanding-time-complexity",
    },
    {
      title: "Memory Management Techniques in Modern Operating Systems",
      excerpt:
        "Explore how operating systems handle memory allocation, paging, and virtual memory for optimal performance.",
      image: "/placeholder.svg?height=200&width=350&text=OS+Memory",
      date: "March 22, 2023",
      readTime: "10 min read",
      author: "Priya Sharma",
      tags: ["Operating Systems", "Memory Management", "Computer Science"],
      slug: "memory-management-techniques",
    },
    {
      title: "Introduction to Database Normalization",
      excerpt:
        "Learn the principles of database normalization and how to apply them in your database design for data integrity.",
      image: "/placeholder.svg?height=200&width=350&text=Database",
      date: "February 10, 2023",
      readTime: "7 min read",
      author: "Amit Patel",
      tags: ["DBMS", "Database Design", "SQL"],
      slug: "database-normalization",
    },
    {
      title: "Mastering Recursion in Programming",
      excerpt: "A step-by-step guide to understanding and implementing recursive algorithms effectively in your code.",
      image: "/placeholder.svg?height=200&width=350&text=Recursion",
      date: "January 5, 2023",
      readTime: "9 min read",
      author: "Neha Gupta",
      tags: ["Programming", "Algorithms", "DSA"],
      slug: "mastering-recursion",
    },
    {
      title: "Computer Networks: Understanding the OSI Model",
      excerpt:
        "A detailed explanation of the seven layers of the OSI model and their functions in network communication.",
      image: "/placeholder.svg?height=200&width=350&text=OSI+Model",
      date: "December 12, 2022",
      readTime: "12 min read",
      author: "Vikram Singh",
      tags: ["Computer Networks", "OSI Model", "Networking"],
      slug: "osi-model",
    },
    {
      title: "Introduction to Machine Learning for CS Students",
      excerpt:
        "A beginner-friendly guide to machine learning concepts for computer science students and their applications.",
      image: "/placeholder.svg?height=200&width=350&text=Machine+Learning",
      date: "November 8, 2022",
      readTime: "15 min read",
      author: "Dr. Ananya Das",
      tags: ["Machine Learning", "AI", "Data Science"],
      slug: "machine-learning-intro",
    },
    {
      title: "Web Development Fundamentals",
      excerpt:
        "Essential concepts and technologies for modern web development, covering frontend, backend, and full-stack aspects.",
      image: "/placeholder.svg?height=200&width=350&text=Web+Dev",
      date: "October 15, 2022",
      readTime: "11 min read",
      author: "Rahul Verma",
      tags: ["Web Development", "HTML", "CSS", "JavaScript"],
      slug: "web-development-fundamentals",
    },
    {
      title: "Cloud Computing for Beginners",
      excerpt: "Understanding cloud services, deployment models, and benefits for individuals and businesses.",
      image: "/placeholder.svg?height=200&width=350&text=Cloud",
      date: "September 20, 2022",
      readTime: "13 min read",
      author: "Sanjay Mehta",
      tags: ["Cloud Computing", "AWS", "Azure"],
      slug: "cloud-computing-beginners",
    },
    {
      title: "Cybersecurity Best Practices",
      excerpt: "Essential security measures to protect your applications and data from evolving cyber threats.",
      image: "/placeholder.svg?height=200&width=350&text=Security",
      date: "August 5, 2022",
      readTime: "10 min read",
      author: "Meera Kapoor",
      tags: ["Cybersecurity", "Network Security", "Encryption"],
      slug: "cybersecurity-best-practices",
    },
    {
      title: "Data Structures Every Programmer Should Know",
      excerpt:
        "An in-depth look at essential data structures and their practical applications in software development.",
      image: "/placeholder.svg?height=200&width=350&text=Data+Structures",
      date: "July 12, 2022",
      readTime: "14 min read",
      author: "Arjun Reddy",
      tags: ["Data Structures", "Programming", "Algorithms"],
      slug: "essential-data-structures",
    },
    {
      title: "The Future of Quantum Computing",
      excerpt:
        "Exploring the potential impact of quantum computing on cryptography, optimization problems, and scientific research.",
      image: "/placeholder.svg?height=200&width=350&text=Quantum",
      date: "June 28, 2022",
      readTime: "16 min read",
      author: "Dr. Sameer Gupta",
      tags: ["Quantum Computing", "Future Tech", "Computer Science"],
      slug: "quantum-computing-future",
    },
    {
      title: "Mobile App Development: Native vs Cross-Platform",
      excerpt: "Comparing the pros and cons of native and cross-platform approaches to mobile application development.",
      image: "/placeholder.svg?height=200&width=350&text=Mobile+Dev",
      date: "May 15, 2022",
      readTime: "9 min read",
      author: "Nisha Patel",
      tags: ["Mobile Development", "React Native", "Flutter"],
      slug: "native-vs-cross-platform",
    },
  ]

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 3)
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-kolka">Blog</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Insights, tutorials, and resources for engineering students
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(0, visiblePosts).map((post, index) => (
          <AnimatedElement key={index} animation="fade-up" delay={0.1 * index} className="h-full">
            <Card className="bg-white h-full">
              <CardHeader className="p-0">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={350}
                  height={200}
                  className="rounded-t-lg object-cover w-full h-[200px]"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          </AnimatedElement>
        ))}
      </div>

      {visiblePosts < blogPosts.length && (
        <div className="flex justify-center mt-12">
          <Button variant="outline" onClick={handleLoadMore}>
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}
