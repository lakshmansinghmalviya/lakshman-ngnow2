import mongoose, { type Document, Schema } from "mongoose"

export interface IApplicant extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  experience: string
  currentRole?: string
  expectedSalary?: string
  noticePeriod?: string
  coverLetter?: string
  jobTitle: string
  company?: string
  jobId?: string
  resumeFileName?: string
  createdAt: Date
  updatedAt: Date
}

const ApplicantSchema = new Schema<IApplicant>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String, required: true },
    currentRole: { type: String },
    expectedSalary: { type: String },
    noticePeriod: { type: String },
    coverLetter: { type: String },
    jobTitle: { type: String, required: true },
    company: { type: String },
    jobId: { type: String },
    resumeFileName: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.Applicant || mongoose.model<IApplicant>("Applicant", ApplicantSchema)


