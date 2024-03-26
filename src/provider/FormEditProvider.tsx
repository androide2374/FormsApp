import React, { useReducer } from 'react'
import { Context } from '../context/formEditContext'
import { formEditReducer, INITIAL_STATE } from '../reducer/formEditReducer'
import { Form } from '../types/response/form.type'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function FormEditProvider ({ children }: Props) {
  const [state, dispatch] = useReducer(formEditReducer, INITIAL_STATE)
  const setForm = (form: Form) => {
    dispatch({ type: 'SET_FORM', payload: form })
  }

  return (
    <Context.Provider value={{ form: state, setForm }}>{children}</Context.Provider>
  )
}
