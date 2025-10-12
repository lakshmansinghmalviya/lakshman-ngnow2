"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, ListChecks, Info, BookOpen } from "lucide-react"
import { courses } from "@/app/courses/page"

export default function WatchCoursePage() {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)
  const courseId = Number(idParam)

  const course = useMemo(() => courses.find((c) => c.id === courseId), [courseId])

  if (!course || !course.youtubeLink) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Course not found</CardTitle>
            <CardDescription>Please go back and select a valid free course.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // For unlisted videos, convert playlist or video URL into embeddable URL
  const getEmbedUrl = (url: string) => {
    try {
      const u = new URL(url)
      if (u.hostname.includes("youtube.com")) {
        const list = u.searchParams.get("list")
        const v = u.searchParams.get("v")
        if (v) return `https://www.youtube.com/embed/${v}`
        if (list) return `https://www.youtube.com/embed/videoseries?list=${list}`
      }
      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
      }
      return url
    } catch {
      return url
    }
  }

  const embedUrl = getEmbedUrl(course.youtubeLink)

  const timeline = [
    { t: "00:00", label: "Introduction" },
    { t: "05:00", label: "Core Concepts" },
    { t: "15:00", label: "Example Walkthrough" },
    { t: "30:00", label: "Exercises" },
    { t: "45:00", label: "Summary" },
  ]

  const topics = [
    "Overview and prerequisites",
    "Key definitions and ideas",
    "Worked examples",
    "Common pitfalls",
    "Practice tasks",
  ]

  const exercises = [
    "Solve 5 practice questions on the topic",
    "Implement a small project demo",
    "Summarize concepts in your own words",
  ]

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-1">{course.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="outline">Free</Badge>
              <Badge variant="outline" className={`capitalize`}>{course.category}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4" /> Timeline</CardTitle>
              <CardDescription>Jump to key parts of the video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-muted-foreground">{item.t}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Topics Covered</CardTitle>
              <CardDescription>What you will learn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {topics.map((t, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{t}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ListChecks className="h-4 w-4" /> Exercises & Tasks</CardTitle>
              <CardDescription>Reinforce your learning.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {exercises.map((e, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span>{e}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info className="h-4 w-4" /> Description</CardTitle>
              <CardDescription>About this video.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">Note: This is an embedded unlisted YouTube video hosted on our site.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


