export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          user_id: string
          full_name: string
          education_level: string
          subjects: string[]
          study_goals: string
          onboarding_completed: boolean
          // add any other columns that exist in your table
        }
        Insert: {
          user_id: string
          full_name: string
          education_level: string
          subjects: string[]
          study_goals: string
          onboarding_completed: boolean
        }
        Update: {
          user_id?: string
          full_name?: string
          education_level?: string
          subjects?: string[]
          study_goals?: string
          onboarding_completed?: boolean
        }
      }
      // ... other tables ...
    }
  }
} 