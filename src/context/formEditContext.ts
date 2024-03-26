import { createContext } from 'react'
import { Form } from '../types/response/form.type'

export interface FormEditContext {
  form: Form
  setForm: (form: Form) => void
}
export const Context = createContext<FormEditContext>({} as FormEditContext)
