import mongoose, { type Document, Schema } from "mongoose"

export interface ITrainingProgram extends Document {
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
  popular: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TrainingProgramSchema = new Schema<ITrainingProgram>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    description: { type: String, required: true },
    features: [{ type: String }],
    highlights: [{ type: String }],
    image: { type: String, default: "" },
    popular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.TrainingProgram ||
  mongoose.model<ITrainingProgram>("TrainingProgram", TrainingProgramSchema)
