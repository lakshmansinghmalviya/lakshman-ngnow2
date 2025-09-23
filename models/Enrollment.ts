import mongoose from "mongoose"

export interface IEnrollment extends mongoose.Document {
  enrollmentId: string
  programId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  linkedin?: string
  city: string
  state: string
  education: string
  experience: string
  motivation?: string
  referralCode?: string
  referralCodeValid?: boolean
  discountApplied?: number
  agreeTerms: boolean
  agreeMarketing?: boolean
  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  enrollmentDate: Date
  createdAt: Date
  updatedAt: Date
}

const enrollmentSchema = new mongoose.Schema<IEnrollment>(
  {
    programId: {
      type: String,
      required: [true, "Program ID is required"],
      trim: true,
    },
    enrollmentId: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
      maxlength: [50, "State name cannot exceed 50 characters"],
    },
    education: {
      type: String,
      required: [true, "Education level is required"],
      enum: {
        values: ["high-school", "diploma", "bachelors", "masters", "phd"],
        message: "Please select a valid education level",
      },
    },
    experience: {
      type: String,
      required: [true, "Work experience is required"],
      enum: {
        values: ["fresher", "1-2", "3-5", "5+"],
        message: "Please select a valid experience level",
      },
    },
    motivation: {
      type: String,
      trim: true,
      maxlength: [500, "Motivation cannot exceed 500 characters"],
    },
    referralCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    referralCodeValid: {
      type: Boolean,
      default: false,
    },
    discountApplied: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    agreeTerms: {
      type: Boolean,
      required: [true, "You must agree to terms and conditions"],
      validate: {
        validator: (v: boolean) => v === true,
        message: "You must agree to terms and conditions",
      },
    },
    agreeMarketing: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled"],
        message: "Please select a valid status",
      },
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["pending", "completed", "failed", "refunded"],
        message: "Please select a valid payment status",
      },
      default: "pending",
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better query performance
enrollmentSchema.index({ email: 1, programId: 1 }, { unique: true })
enrollmentSchema.index({ status: 1 })
enrollmentSchema.index({ paymentStatus: 1 })
enrollmentSchema.index({ enrollmentDate: -1 })
enrollmentSchema.index({ referralCode: 1 })

// Virtual for full name
enrollmentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Pre-save middleware
enrollmentSchema.pre("save", function (next) {
  // Generate unique enrollment ID if not exists
  if (!this.enrollmentId) {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    this.enrollmentId = `ENR${timestamp}${random}`
  }

  // Auto-apply discount if referral code is valid
  if (this.referralCodeValid && this.discountApplied === 0) {
    this.discountApplied = 10
  }
  next()
})

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>("Enrollment", enrollmentSchema)
