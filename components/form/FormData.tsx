import { Button, Container, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { ApiForm } from '../../pages/api/apiForm'
import { Form as FormType } from '../../types/form.responses.types'

const initialValues: FormType = {
  name: 'Formulario sin Titulo',
  description: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  id: '',
  createdBy: '',
  formType: 1,
  lastUpdateBy: '',
  stared: false,
  questions: [],
  userFormPermisions: null
}
interface FormDataProps {
  id: string | string[] | undefined
}
export const FormData = (props: FormDataProps) => {
  const { id } = props
  const submitForm = async (values: FormType) => {
    const result = await ApiForm().put('/form', values)
    alert(`Formulario guardado ${JSON.stringify(result)}`)
  }
  const [initialData, setInitialData] = useState(initialValues)
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: async (values) => {
      submitForm(values)
    },
    enableReinitialize: true
  })
  const { formData } = useForm(id)
  useEffect(() => {
    if (formData) {
      setInitialData(formData)
    }
  }, [formData])
  return (
    <Container className='my-10 pt-5'>
      <span className='text-4xl text-black'>Datos Formulario</span>
      <form
        onSubmit={formik.handleSubmit}
        className='mt-10'
      >
        <TextField
          fullWidth
          id='name'
          error={!!(formik.touched.name && formik.errors.name)}
          placeholder='Titulo del formulario'
          inputProps={{ style: { fontSize: '2rem' } }}
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
          variant='standard'
        />
        <TextField
          fullWidth
          id='description'
          error={!!(formik.touched.description && formik.errors.description)}
          placeholder='Descripcion del Formulario'
          name='description'
          onChange={formik.handleChange}
          value={formik.values.description}
          variant='standard'
        />
        <div className='pt-5'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='mt-10'
          >
            Actualizar
          </Button>
        </div>
      </form>
    </Container>
  )
}
