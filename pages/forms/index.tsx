import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormRequest, FormTypeEnum } from '../../src/types/request/form.type'
import { ApiForm } from '../api/apiForm'
export default function FormManager () {
  const router = useRouter()
  const instance = ApiForm()
  const crearFormulario = () => {
    const initialFormData: FormRequest = {
      name: 'Nuevo Formulario',
      description: '',
      formType: FormTypeEnum.General,
      userId: 'Test'
    }
    try {
      instance.post<string>('/form', initialFormData).then(async res => router.push('/forms/f/[id]', `/forms/f/${res.data}`)).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
      alert('Error al crear el formulario')
    }
  }
  const crearFormularioTemplate = () => {
    const initialFormData: FormRequest = {
      name: 'Nuevo Formulario',
      description: '',
      formType: FormTypeEnum.General,
      userId: 'Test'
    }
    try {
      instance.post<string>('/form/idTemplate?idTemplate=63a534189a4b11f4bd34aeaa', initialFormData)
        .then(async res => router.push('/forms/f/[id]', `/forms/f/${res.data}`))
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
      alert('Error al crear el formulario')
    }
  }

  return (
    <div className="container">
      <h1>Formularios Lomas de Zamora</h1>
      <button onClick={crearFormulario}>Nuevo Formulario</button>
      <button onClick={crearFormularioTemplate} className="bg-red-200 border-r-2 border-red-600">Nuevo Formulario Template Datos Personales</button>
      <Link href={'/forms/f/63a536ab1d276971fd3bea2a'}>
        <a>Ir al form</a>
      </Link>
    </div>
  )
}
