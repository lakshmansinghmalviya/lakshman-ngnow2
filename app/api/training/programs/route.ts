import { type NextRequest, NextResponse } from "next/server"

// Use preview-compatible database
const getTrainingPrograms = async (category?: string) => {
  const programs = [
    {
      id: "fullstack-web",
      title: "Full Stack Web Development",
      category: "development",
      duration: "6 months",
      level: "Beginner to Advanced",
      price: 15999,
      originalPrice: 25999,
      rating: 4.8,
      students: 1247,
      description: "Master modern web development with React, Node.js, and cloud deployment",
      features: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "AWS", "Docker", "GraphQL"],
      highlights: [
        "Live project-based learning",
        "1-on-1 mentorship sessions",
        "Industry-recognized certificate",
        "Job placement assistance",
        "Lifetime access to course materials",
        "24/7 community support",
      ],
      image: "/placeholder.svg?height=200&width=400",
      popular: true,
      isActive: true,
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      category: "data",
      duration: "8 months",
      level: "Intermediate",
      price: 18999,
      originalPrice: 29999,
      rating: 4.9,
      students: 892,
      description: "Become a data scientist with Python, ML, and AI expertise",
      features: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Tableau", "SQL", "Statistics"],
      highlights: [
        "Real industry datasets",
        "ML model deployment",
        "Portfolio projects",
        "Industry mentorship",
        "Certification included",
        "Career guidance",
      ],
      image: "/placeholder.svg?height=200&width=400",
      popular: false,
      isActive: true,
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      category: "development",
      duration: "5 months",
      level: "Beginner",
      price: 14999,
      originalPrice: 22999,
      rating: 4.7,
      students: 634,
      description: "Build cross-platform mobile apps with React Native and Flutter",
      features: ["React Native", "Flutter", "Dart", "Firebase", "Redux", "API Integration", "App Store", "Play Store"],
      highlights: [
        "Cross-platform development",
        "App store deployment",
        "Real-time features",
        "Push notifications",
        "Payment integration",
        "Performance optimization",
      ],
      image: "/placeholder.svg?height=200&width=400",
      popular: false,
      isActive: true,
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud Engineering",
      category: "infrastructure",
      duration: "7 months",
      level: "Intermediate to Advanced",
      price: 19999,
      originalPrice: 32999,
      rating: 4.8,
      students: 456,
      description: "Master cloud infrastructure, CI/CD, and container orchestration",
      features: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "Linux", "Monitoring"],
      highlights: [
        "Hands-on cloud projects",
        "Infrastructure as Code",
        "Container orchestration",
        "CI/CD pipeline setup",
        "Cloud certification prep",
        "Industry best practices",
      ],
      image: "/placeholder.svg?height=200&width=400",
      popular: false,
      isActive: true,
    },
    {
      id: "ai-machine-learning",
      title: "AI & Machine Learning",
      category: "ai",
      duration: "9 months",
      level: "Advanced",
      price: 22999,
      originalPrice: 35999,
      rating: 4.9,
      students: 378,
      description: "Deep dive into AI, ML algorithms, and neural networks",
      features: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision", "Deep Learning", "MLOps"],
      highlights: [
        "Advanced AI projects",
        "Neural network design",
        "Computer vision apps",
        "NLP applications",
        "Model deployment",
        "Research opportunities",
      ],
      image: "/placeholder.svg?height=200&width=400",
      popular: true,
      isActive: true,
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Specialist",
      category: "security",
      duration: "6 months",
      level: "Intermediate",
      price: 17999,
      originalPrice: 27999,
      rating: 4.7,
      students: 289,
      description: "Protect digital assets with ethical hacking and security protocols",
      features: [
        "Ethical Hacking",
        "Penetration Testing",
        "Network Security",
        "Cryptography",
        "SIEM",
        "Incident Response",
        "Compliance",
        "Risk Assessment",
      ],
      highlights: [
        "Hands-on security labs",
        "Penetration testing",
        "Security certifications",
        "Incident response training",
        "Compliance frameworks",
        "Industry partnerships",
      ],
      image: "/placeholder.svg?height=200&width=400",
      popular: false,
      isActive: true,
    },
  ]

  if (category && category !== "all") {
    return programs.filter((program) => program.category === category && program.isActive)
  }

  return programs.filter((program) => program.isActive)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const programs = await getTrainingPrograms(category || undefined)

    return NextResponse.json({ success: true, data: programs })
  } catch (error) {
    console.error("Error fetching programs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch training programs" }, { status: 500 })
  }
}
