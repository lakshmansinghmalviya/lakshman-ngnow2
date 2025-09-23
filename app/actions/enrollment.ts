"use server"

import connectDB from "@/lib/mongodb"
import Enrollment from "@/models/Enrollment"
import TrainingProgram from "@/models/TrainingProgram"

export async function createEnrollment(enrollmentData: {
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
}) {
  try {
    await connectDB()

    // Check if program exists
    const program = await TrainingProgram.findOne({
      id: enrollmentData.programId,
      isActive: true,
    })

    if (!program) {
      return {
        success: false,
        error: "Training program not found.",
      }
    }

    // Check if email already exists for this program
    const existingEnrollment = await Enrollment.findOne({
      email: enrollmentData.email,
      programId: enrollmentData.programId,
    })

    if (existingEnrollment) {
      return {
        success: false,
        error: "You have already enrolled in this program with this email address.",
      }
    }

    // Create new enrollment
    const enrollment = new Enrollment({
      ...enrollmentData,
      enrollmentDate: new Date(),
      status: "pending",
      paymentStatus: "pending",
    })

    await enrollment.save()

    return { success: true, data: enrollment }
  } catch (error) {
    console.error("Enrollment error:", error)

    if (error.code === 11000) {
      return {
        success: false,
        error: "You have already enrolled in this program.",
      }
    }

    return {
      success: false,
      error: "Failed to create enrollment. Please try again.",
    }
  }
}

export async function getTrainingPrograms(category?: string) {
  try {
    await connectDB()

    let query = { isActive: true }
    if (category && category !== "all") {
      query = { ...query, category }
    }

    const programs = await TrainingProgram.find(query).sort({ createdAt: -1 })

    return { success: true, data: programs }
  } catch (error) {
    console.error("Error fetching programs:", error)
    return { success: false, error: "Failed to fetch training programs" }
  }
}

export async function getTrainingProgram(id: string) {
  try {
    await connectDB()

    const program = await TrainingProgram.findOne({
      id: id,
      isActive: true,
    })

    if (!program) {
      return { success: false, error: "Program not found" }
    }

    return { success: true, data: program }
  } catch (error) {
    console.error("Error fetching program:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function seedTrainingPrograms() {
  try {
    await connectDB()

    // Check if programs already exist
    const existingPrograms = await TrainingProgram.countDocuments()
    if (existingPrograms > 0) {
      return { success: true, message: "Programs already exist" }
    }

    const programs = [
      {
        id: "fullstack-web",
        title: "Full Stack Web Development",
        category: "development",
        duration: "6 months",
        level: "Beginner to Advanced",
        price: 15999,
        originalPrice: 24999,
        rating: 4.8,
        students: 1250,
        description: "Master modern web development with React, Node.js, databases, and deployment",
        features: [
          "React.js & Next.js",
          "Node.js & Express",
          "MongoDB & PostgreSQL",
          "AWS Deployment",
          "Real-time Applications",
          "API Development",
        ],
        highlights: [
          "Build 5+ industry projects",
          "1-on-1 mentorship",
          "Job placement assistance",
          "Lifetime course access",
        ],
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        id: "data-science",
        title: "Data Science & Analytics",
        category: "data",
        duration: "5 months",
        level: "Intermediate",
        price: 18999,
        originalPrice: 28999,
        rating: 4.9,
        students: 890,
        description: "Learn data analysis, machine learning, and visualization with Python",
        features: [
          "Python & R Programming",
          "Machine Learning",
          "Data Visualization",
          "Statistical Analysis",
          "Big Data Tools",
          "Deep Learning Basics",
        ],
        highlights: ["Work on real datasets", "Industry case studies", "Kaggle competitions", "Portfolio development"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "mobile-dev",
        title: "Mobile App Development",
        category: "development",
        duration: "4 months",
        level: "Beginner to Intermediate",
        price: 12999,
        originalPrice: 19999,
        rating: 4.7,
        students: 650,
        description: "Build cross-platform mobile apps with React Native and Flutter",
        features: [
          "React Native",
          "Flutter & Dart",
          "Native iOS/Android",
          "App Store Deployment",
          "Push Notifications",
          "Payment Integration",
        ],
        highlights: [
          "Publish apps to stores",
          "Cross-platform development",
          "UI/UX best practices",
          "Performance optimization",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "devops-cloud",
        title: "DevOps & Cloud Computing",
        category: "infrastructure",
        duration: "4 months",
        level: "Intermediate to Advanced",
        price: 16999,
        originalPrice: 25999,
        rating: 4.8,
        students: 420,
        description: "Master DevOps practices, CI/CD, and cloud platforms",
        features: [
          "Docker & Kubernetes",
          "AWS/Azure/GCP",
          "CI/CD Pipelines",
          "Infrastructure as Code",
          "Monitoring & Logging",
          "Security Best Practices",
        ],
        highlights: [
          "Hands-on cloud projects",
          "Industry certifications prep",
          "Real deployment scenarios",
          "Cost optimization techniques",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "ai-ml",
        title: "Artificial Intelligence & ML",
        category: "ai",
        duration: "6 months",
        level: "Advanced",
        price: 22999,
        originalPrice: 34999,
        rating: 4.9,
        students: 380,
        description: "Deep dive into AI, machine learning, and neural networks",
        features: [
          "Deep Learning",
          "Neural Networks",
          "Computer Vision",
          "Natural Language Processing",
          "TensorFlow & PyTorch",
          "MLOps",
        ],
        highlights: [
          "Research-level projects",
          "Paper implementations",
          "Industry collaborations",
          "AI ethics & governance",
        ],
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity Specialist",
        category: "security",
        duration: "5 months",
        level: "Intermediate to Advanced",
        price: 19999,
        originalPrice: 29999,
        rating: 4.8,
        students: 290,
        description: "Learn ethical hacking, security analysis, and threat detection",
        features: [
          "Ethical Hacking",
          "Network Security",
          "Penetration Testing",
          "Security Auditing",
          "Incident Response",
          "Compliance & Governance",
        ],
        highlights: [
          "Hands-on lab exercises",
          "Industry certifications",
          "Real-world scenarios",
          "Security tool mastery",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
    ]

    await TrainingProgram.insertMany(programs)

    return { success: true, message: "Training programs seeded successfully" }
  } catch (error) {
    console.error("Error seeding programs:", error)
    return { success: false, error: "Failed to seed training programs" }
  }
}
