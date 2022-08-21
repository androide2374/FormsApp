import { Form as FormType, FormTypeEnum } from "../../types/form.types"

export const FormData = () => {
    const initalValues:FormType = {
        name: "",
        description: "",
        formType: FormTypeEnum.General,
    }
    
    return (
        <div>
            <form className="flex flex-col items-center justify-center w-full h-full">
                <label htmlFor="name">Nombre del formulario</label>
                <input type="text" id="name" value={initalValues.name} />
                <label htmlFor="description">Descripcion del formulario</label>
                <input type="text" id="description" value={initalValues.description} />
                <button>Guardar</button>
            </form>
        </div>
    )
}