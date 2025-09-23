import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Enrollment from "@/models/Enrollment"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get basic stats
    const totalEnrollments = await Enrollment.countDocuments()
    const pendingEnrollments = await Enrollment.countDocuments({ status: "pending" })
    const confirmedEnrollments = await Enrollment.countDocuments({ status: "confirmed" })
    const completedEnrollments = await Enrollment.countDocuments({ status: "completed" })
    const paidEnrollments = await Enrollment.countDocuments({ paymentStatus: "completed" })
    const referralEnrollments = await Enrollment.countDocuments({
      referralCode: { $exists: true, $ne: "" },
      referralCodeValid: true,
    })

    // Get program-wise stats
    const programStats = await Enrollment.aggregate([
      {
        $group: {
          _id: "$programId",
          count: { $sum: 1 },
          confirmed: {
            $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
          },
          paid: {
            $sum: { $cond: [{ $eq: ["$paymentStatus", "completed"] }, 1, 0] },
          },
        },
      },
      { $sort: { count: -1 } },
    ])

    // Get education-wise stats
    const educationStats = await Enrollment.aggregate([
      {
        $group: {
          _id: "$education",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])

    // Get experience-wise stats
    const experienceStats = await Enrollment.aggregate([
      {
        $group: {
          _id: "$experience",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])

    // Get location-wise stats
    const locationStats = await Enrollment.aggregate([
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
          cities: { $addToSet: "$city" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ])

    // Get referral code stats
    const referralStats = await Enrollment.aggregate([
      {
        $match: {
          referralCode: { $exists: true, $ne: "" },
          referralCodeValid: true,
        },
      },
      {
        $group: {
          _id: "$referralCode",
          count: { $sum: 1 },
          totalDiscount: { $sum: "$discountApplied" },
        },
      },
      { $sort: { count: -1 } },
    ])

    // Get enrollment trends (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const enrollmentTrends = await Enrollment.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalEnrollments,
          pendingEnrollments,
          confirmedEnrollments,
          completedEnrollments,
          paidEnrollments,
          referralEnrollments,
        },
        programs: programStats,
        education: educationStats,
        experience: experienceStats,
        locations: locationStats,
        referrals: referralStats,
        trends: enrollmentTrends,
      },
    })
  } catch (error) {
    console.error("Error fetching enrollment stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch enrollment statistics",
      },
      { status: 500 },
    )
  }
}
