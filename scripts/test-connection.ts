import connectDB from "@/lib/mongodb"

async function testConnection() {
  try {
    console.log("🔄 Testing MongoDB connection...")
    await connectDB()
    console.log("✅ MongoDB connection successful!")
    console.log("🎉 Your database is ready to use!")
  } catch (error) {
    console.error("❌ MongoDB connection failed:")
    console.error(error)
    console.log("\n🔧 Troubleshooting tips:")
    console.log("1. Check your MONGODB_URI in .env.local")
    console.log("2. Verify your MongoDB Atlas network access")
    console.log("3. Confirm your database user credentials")
  } finally {
    process.exit(0)
  }
}

testConnection()
