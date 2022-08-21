export interface FormRequest {
    description: string
    formType: FormTypeEnum
    name: string
    userId: string
  }
  
export interface QuestionRequest {
    questionText: string
    questionImage: string
    options: OptionRequest[]
}

export interface OptionRequest {
    optionImage: string
    optionText: string
}

export interface Form {
    description: string
    formType: number
    name: string
}
export enum FormTypeEnum {
    General = 1
}
