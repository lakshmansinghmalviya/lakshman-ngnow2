import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

export interface TrainingProgram {
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

export interface Enrollment {
  id: string
  programId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  linkedin?: string
  city?: string
  state?: string
  education?: string
  experience?: string
  motivation?: string
  agreeTerms: boolean
  agreeMarketing: boolean
  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  enrollmentDate: string
  createdAt: string
}

// Training Programs
export async function getTrainingPrograms(category?: string): Promise<TrainingProgram[]> {
  try {
    const filePath = path.join(dataDir, "training-programs.json")
    const fileContent = fs.readFileSync(filePath, "utf8")
    const programs: TrainingProgram[] = JSON.parse(fileContent)

    if (category && category !== "all") {
      return programs.filter((program) => program.category === category && program.isActive)
    }

    return programs.filter((program) => program.isActive)
  } catch (error) {
    console.error("Error reading training programs:", error)
    return []
  }
}

export async function getTrainingProgram(id: string): Promise<TrainingProgram | null> {
  try {
    const programs = await getTrainingPrograms()
    return programs.find((program) => program.id === id) || null
  } catch (error) {
    console.error("Error reading training program:", error)
    return null
  }
}

// Enrollments
export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    const filePath = path.join(dataDir, "enrollments.json")

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]")
      return []
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error reading enrollments:", error)
    return []
  }
}

export async function createEnrollment(enrollmentData: Omit<Enrollment, "id" | "createdAt">): Promise<Enrollment> {
  try {
    const enrollments = await getEnrollments()

    // Check for duplicate enrollment
    const existingEnrollment = enrollments.find(
      (e) => e.email === enrollmentData.email && e.programId === enrollmentData.programId,
    )

    if (existingEnrollment) {
      throw new Error("You have already enrolled in this program with this email address.")
    }

    const newEnrollment: Enrollment = {
      ...enrollmentData,
      id: `enroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }

    enrollments.push(newEnrollment)

    const filePath = path.join(dataDir, "enrollments.json")
    fs.writeFileSync(filePath, JSON.stringify(enrollments, null, 2))

    return newEnrollment
  } catch (error) {
    console.error("Error creating enrollment:", error)
    throw error
  }
}

export async function getEnrollmentsByEmail(email: string): Promise<Enrollment[]> {
  try {
    const enrollments = await getEnrollments()
    return enrollments.filter((enrollment) => enrollment.email === email)
  } catch (error) {
    console.error("Error reading enrollments by email:", error)
    return []
  }
}
