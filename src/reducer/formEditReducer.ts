import { Form } from '../types/response/form.type'

export const INITIAL_STATE: Form = {
  id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: '',
  lastUpdateBy: '',
  questions: [],
  stared: false,
  formType: 1,
  name: '',
  description: '',
  userFormPermisions: null
}
type Action =
| { type: 'SET_FORM', payload: Form }

export const formEditReducer = (state: Form, action: Action) => {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}
