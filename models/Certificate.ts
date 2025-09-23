import mongoose, { type Document, Schema } from "mongoose"

export interface ICertificate extends Document {
  enrollmentId: string
  programId: string
  studentName: string
  studentEmail: string
  programTitle: string
  completionDate: Date
  certificateId: string
  certificateUrl: string
  issuedDate: Date
  createdAt: Date
  updatedAt: Date
}

const CertificateSchema = new Schema<ICertificate>(
  {
    enrollmentId: { type: String, required: true, unique: true },
    programId: { type: String, required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    programTitle: { type: String, required: true },
    completionDate: { type: Date, required: true },
    certificateId: { type: String, required: true, unique: true },
    certificateUrl: { type: String, required: true },
    issuedDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema)
