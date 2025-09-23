import connectDB from "@/lib/mongodb"
import { seedTrainingPrograms } from "@/app/actions/enrollment"

async function seedDatabase() {
  try {
    await connectDB()
    console.log("Connected to MongoDB")

    const result = await seedTrainingPrograms()

    if (result.success) {
      console.log("✅ Database seeded successfully")
    } else {
      console.log("ℹ️", result.message || result.error)
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()
