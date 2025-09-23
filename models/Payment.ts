import mongoose, { type Document, Schema } from "mongoose"

export interface IPayment extends Document {
  enrollmentId: string
  programId: string
  userEmail: string
  amount: number
  currency: string
  paymentMethod: string
  paymentId: string
  orderId: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentDate: Date
  refundDate?: Date
  refundAmount?: number
  createdAt: Date
  updatedAt: Date
}

const PaymentSchema = new Schema<IPayment>(
  {
    enrollmentId: { type: String, required: true },
    programId: { type: String, required: true },
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paymentMethod: { type: String, required: true },
    paymentId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentDate: { type: Date, default: Date.now },
    refundDate: { type: Date },
    refundAmount: { type: Number },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema)
