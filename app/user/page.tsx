"use client"

import { useEffect, useState } from "react"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, BookOpen } from "lucide-react"

export default function UserDashboardPage() {
  const { user } = useUser()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [enrollments, setEnrollments] = useState<any[]>([])

  const loadData = async () => {
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch(`/api/enrollments?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.success) {
        setEnrollments(data.data || [])
      } else {
        setEnrollments([])
      }
    } catch (e) {
      setEnrollments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const authedEmail = user?.primaryEmailAddress?.emailAddress
    const stored = localStorage.getItem("user_email")
    const nextEmail = authedEmail || stored || ""
    if (nextEmail) {
      setEmail(nextEmail)
      setTimeout(() => loadData(), 0)
    }
  }, [user])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("user_email", email)
    loadData()
  }

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground">View your enrollments and track progress.</p>
      </div>

      <SignedOut>
        <form onSubmit={onSubmit} className="flex gap-3 mb-8">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Load</Button>
        </form>
      </SignedOut>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : enrollments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No enrollments found</CardTitle>
            <CardDescription>Enroll in a program to see it here.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enrollments.map((e) => (
            <Card key={e._id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> {e.programId}
                </CardTitle>
                <CardDescription>
                  Enrolled on {new Date(e.createdAt).toLocaleDateString()} • Status: {e.status || "confirmed"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {e.firstName} {e.lastName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span> {e.phone}
                  </div>
                  {e.referralCode && (
                    <div>
                      <span className="text-muted-foreground">Referral:</span> {e.referralCode}
                    </div>
                  )}
                </div>
                <Badge variant="outline">Progress: 0%</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


