import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          whatsapp: string | null
          degree: string | null
          course_pursuing: string | null
          college: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          whatsapp?: string | null
          degree?: string | null
          course_pursuing?: string | null
          college?: string | null
        }
        Update: {
          full_name?: string | null
          phone?: string | null
          whatsapp?: string | null
          degree?: string | null
          course_pursuing?: string | null
          college?: string | null
        }
      }
      training_programs: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          duration: string
          level: string
          price: number
          original_price: number
          rating: number
          students: number
          features: string[]
          highlights: string[]
          image: string | null
          is_active: boolean
          popular: boolean
          created_at: string
          updated_at: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          is_free: boolean
          is_new: boolean
          is_coming_soon: boolean
          price: number
          youtube_link: string | null
          video_embed_id: string | null
          duration: string | null
          modules: any
          topics: string[]
          image: string | null
          color: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string | null
          item_id: string
          item_type: 'course' | 'training_program'
          full_name: string
          email: string
          phone: string
          whatsapp: string | null
          degree: string | null
          course_pursuing: string | null
          college: string | null
          payment_id: string | null
          amount_paid: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          progress: number
          referral_code_used: string | null
          enrolled_at: string
          updated_at: string
        }
      }
      payments: {
        Row: {
          id: string
          enrollment_id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          amount: number
          currency: string
          status: 'created' | 'paid' | 'failed' | 'refunded'
          payment_method: string | null
          created_at: string
          paid_at: string | null
        }
      }
      referral_codes: {
        Row: {
          id: string
          code: string
          discount_percent: number | null
          discount_amount: number | null
          max_uses: number | null
          current_uses: number
          valid_from: string
          valid_until: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
        }
      }
    }
  }
}
