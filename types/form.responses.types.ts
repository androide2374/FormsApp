export interface Form {
  createdAt: Date
  createdBy: string
  description: string
  formType: number
  id: string
  lastUpdateBy: string
  name: string
  questions: Question[] | null
  stared: boolean
  updatedAt: Date
  userFormPermisions: null
}

export interface Question {
  createdAt: Date
  id: string
  options: Option[]
  questionImage: string
  questionText: string
  questionType: number
  updateAt: Date
}

export interface Option {
  id: string
  optionImage: string
  optionText: string
}
