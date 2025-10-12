"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AdminEnrollmentsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/enrollments?limit=200")
      const data = await res.json()
      if (data.success) setItems(data.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const list = items.filter(
    (e) =>
      !query ||
      e.email?.toLowerCase().includes(query.toLowerCase()) ||
      e.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      e.lastName?.toLowerCase().includes(query.toLowerCase()) ||
      e.programId?.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Enrollments</h1>
        <Button variant="outline" onClick={load}>Refresh</Button>
      </div>
      <div className="mb-4">
        <Input placeholder="Search by name, email, program..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {loading ? (
        <div className="py-12 text-center">Loading...</div>
      ) : list.length === 0 ? (
        <Card><CardHeader><CardTitle>No enrollments found</CardTitle></CardHeader></Card>
      ) : (
        <div className="grid gap-3">
          {list.map((e) => (
            <Card key={e._id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{e.firstName} {e.lastName} <span className="text-xs text-muted-foreground">({e.email})</span></div>
                  <div className="text-sm text-muted-foreground">Program: {e.programId} • {new Date(e.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={e.status === "completed" ? "default" : "secondary"} className="capitalize">{e.status || "pending"}</Badge>
                  <Badge variant={e.paymentStatus === "completed" ? "default" : "outline"} className="capitalize">{e.paymentStatus || "pending"}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-6 text-sm text-muted-foreground">
        Go to <Link href="/admin">Admin Dashboard</Link>
      </div>
    </div>
  )
}
 