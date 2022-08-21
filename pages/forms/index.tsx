import Link from "next/link";
import { useRouter } from "next/router";
import { FormRequest, FormTypeEnum } from "../../types/form.types";
import { ApiForm } from "../api/apiForm";
export default function FormManager() {
  const router = useRouter()
  const instance= ApiForm();
  const crearFormulario = async () => {
    console.log("Crear formulario");
    const initialFormData :FormRequest = {
      name: "Nuevo Formulario",
      description: "",
      formType: FormTypeEnum.General,
      userId: "Test",
    }
    try{
      const result = await instance.post("/form", initialFormData)
      const {data} = result
      router.push(`/forms/f/[id]`, `/forms/f/${data}`)
    }catch(error){
      console.log(error)
      alert("Error al crear el formulario")
    }
  }

  return (
    <div className='container'>
      <h1>Formularios Lomas de Zamora</h1>
      <button onClick={crearFormulario}>Nuevo Formulario</button>
      <Link href={`/forms/f/63013279855ec8610e691e98`}><a>Ir al form</a></Link>
    </div>
  )
}