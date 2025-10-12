import { type NextRequest, NextResponse } from "next/server"

export const getTrainingProgram = async (id: string) => {
  const price = 999
  const base = {
    level: "Beginner to Intermediate",
    rating: 4.8,
    students: 0,
    duration: "8 weeks",
    image: "/placeholder.svg?height=200&width=400",
    highlights: ["Hands-on projects", "Mentorship", "Certificate", "Community"],
    features: ["Curriculum", "Projects", "Doubt clearing", "Assignments"],
    popular: false,
    isActive: true,
  }
const programs = [
    { id: "machine-learning", title: "Machine Learning", category: "ai" },
    { id: "artificial-intelligence", title: "Artificial Intelligence", category: "ai" },
    { id: "ui-ux", title: "UI/UX Design", category: "development" },
    { id: "android-development", title: "Android Development", category: "development" },
    { id: "backend", title: "Backend Development", category: "development" },
    { id: "frontend", title: "Frontend Development", category: "development" },
    { id: "full-stack", title: "Full Stack Development", category: "development" },
    { id: "hr", title: "Human Resources", category: "data" },
    { id: "cyber-security", title: "Cyber Security", category: "security" },
    { id: "social-media", title: "Social Media", category: "data" },
    { id: "graphic-design", title: "Graphic Design", category: "development" },
    { id: "sales-marketing", title: "Sales & Marketing", category: "data" },
    { id: "cloud-computing", title: "Cloud Computing", category: "infrastructure" },
  ].map((p) => ({
    ...base,
    ...p,
    price,
    originalPrice: price,
    description: `${p.title} training program with practical curriculum and mentorship`,
  }))

  return programs.find((program) => program.id === id && program.isActive) || null
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const program = await getTrainingProgram(params.id)

    if (!program) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: program })
  } catch (error) {
    console.error("Error fetching program:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch training program" }, { status: 500 })
  }
}
