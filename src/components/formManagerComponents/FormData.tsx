import { LoadingButton } from '@mui/lab'
import { Alert, Container, Snackbar, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { ApiForm } from '../../../pages/api/apiForm'
import { Form, Form as FormType } from '../../types/response/form.type'
import SaveIcon from '@mui/icons-material/Save'

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
interface SnackBar{
  open: boolean
  message: string
}
export const FormData = (props: FormDataProps) => {
  const { id } = props
  const [loading, setLoading] = useState(false)
  const [snackBar, setSnackBar] = useState<SnackBar>({ open: false, message: '' })
  const submitForm = async (values: FormType) => {
    setLoading(true)
    const result = await ApiForm().put<Form>('/form', values)
    if (result.status === 200) {
      setLoading(false)
      setInitialData(result.data)
      setSnackBar({ open: true, message: 'Formulario guardado correctamente' })
    }
  }
  const handleCloseSnackBar = () => {
    setSnackBar({ open: false, message: '' })
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
    <Container className='my-10 pt-5 px-0'>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="success">{snackBar.message}</Alert>
      </Snackbar>
      <span className='text-4xl text-black'>Datos Formulario</span>
      <form
        onSubmit={formik.handleSubmit}
        className='mt-10'
      >
        <TextField
          fullWidth
          id='name'
          onFocus={e => e.target.select()}
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
          onFocus={e => e.target.select()}
          id='description'
          error={!!(formik.touched.description && formik.errors.description)}
          placeholder='Descripcion del Formulario'
          name='description'
          onChange={formik.handleChange}
          value={formik.values.description}
          variant='standard'
        />
        <div className='pt-5'>
          <LoadingButton
            type='submit'
            loading={loading}
            loadingPosition='start'
            variant='contained'
            color='primary'
            className='mt-10'
            startIcon={<SaveIcon />}
          >
            {loading ? 'guardando...' : 'Actualizar'}
          </LoadingButton>
        </div>
      </form>
    </Container>
  )
}
