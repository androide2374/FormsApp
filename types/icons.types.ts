import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ShortTextIcon from '@mui/icons-material/ShortText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { QuestionTypeEnum } from './question.request.types'

interface QuestionTypesListTypes{
  [key: string]: {
    id: QuestionTypeEnum
    name: string
    textDescription?: string
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string
    }
  }
}
export const QuestionTypesList: QuestionTypesListTypes = {
  RESPUESTA_CORTA: {
    id: QuestionTypeEnum.RESPUESTA_CORTA,
    name: 'Respuesta corta',
    textDescription: 'Texto de respuesta corta',
    icon: ShortTextIcon
  },
  RESPUESTA_PARRAFO: {
    id: QuestionTypeEnum.RESPUESTA_PARRAFO,
    name: 'Respuesta parrafo',
    textDescription: 'Texto de respuesta largo',
    icon: ViewHeadlineIcon
  },
  FECHA: {
    id: QuestionTypeEnum.FECHA,
    name: 'Fecha',
    textDescription: 'dia, mes, año',
    icon: DateRangeIcon
  },
  HORA: {
    id: QuestionTypeEnum.HORA,
    name: 'Hora',
    textDescription: 'Hora',
    icon: WatchLaterIcon
  },
  OPCION_MULTIPLE: {
    id: QuestionTypeEnum.OPCION_MULTIPLE,
    name: 'Opción multiple',
    icon: RadioButtonCheckedIcon
  },
  CASILLAS_DE_VERIFICACION: {
    id: QuestionTypeEnum.CASILLAS_DE_VERIFICACION,
    name: 'Casillas de verificación',
    icon: CheckBoxIcon
  },
  LISTA_DESPLEGABLE: {
    id: QuestionTypeEnum.LISTA_DESPLEGABLE,
    name: 'Lista desplegable',
    icon: ExpandMoreIcon
  }
}
