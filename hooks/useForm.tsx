import { useEffect, useState } from "react"
import { ApiForm } from "../pages/api/apiForm"
import { Form } from "../types/form.responses.types"
import { FormTypeEnum } from "../types/form.types"

export const useForm =(id: string | string[] | undefined) =>{
    const instance = ApiForm()
    const [formData, setFormData] = useState<Form>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      const getForm = async () => {
        try {
          console.log(id)
          if (!id) return
          const result = await instance.get(`form/id?id=${id}`)
          console.log(result)
          const { data } = result
          setFormData(data)
          setLoading(false)
        } catch (error) {
          console.log(error)
          alert("Error al obtener el formulario")
        }
      }
      getForm()
    }, [id])
    return {formData, loading}
}