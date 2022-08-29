/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ApiForm } from '../pages/api/apiForm'
import { Form } from '../types/response/form.type'

export const useForm = (id: string | string[] | undefined) => {
  const instance = ApiForm()
  const [formData, setFormData] = useState<Form>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getForm = async () => {
      try {
        if (!id) return
        const result = await instance.get(`form/id?id=${id.toString()}`)
        const { data } = result
        setFormData(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        alert('Error al obtener el formulario')
      }
    }
    getForm()
  }, [id])
  return { formData, loading }
}
