import { useRouter } from 'next/router'
import { useForm } from '../../../hooks/useForm'

export default function Formulario () {
  const router = useRouter()
  const { id } = router.query
  const { loading, formData } = useForm(id)
  console.log(loading, formData)

  return (
    <div>
      {formData?.name}
    </div>
  )
}
