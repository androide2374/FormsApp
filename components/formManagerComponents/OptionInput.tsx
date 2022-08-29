import { Icon, TextField } from '@mui/material'
import { Option, QuestionTypeEnum, QuestionTypesList } from '../../types/response/question.type'

interface OptionProps {
  questionType: QuestionTypeEnum
  optionData: Option
  label: string
  onChange: (option: any) => void
  className?: string
  classNameInput?: string
  onFocus?: (e: any) => void
  autoFocus?: boolean
}
export const OptionInput = (props: OptionProps) => {
  const { questionType, optionData, onChange, label, className, onFocus } = props
  const questionTypeObject = QuestionTypesList[QuestionTypeEnum[questionType]]
  const disabledInput = !!questionTypeObject.textDescription
  return <div className={`flex items-end w-full gap-2 ${className ?? ''}`}>
  <Icon component={questionTypeObject.icon} />
  <TextField
      fullWidth
      label={questionTypeObject.textDescription ? '' : label}
      value={questionTypeObject.textDescription ?? optionData?.optionText}
      disabled={disabledInput}
      onFocus={onFocus}
      autoFocus={props.autoFocus}
      inputProps={{
        style: {
          fontSize: '0.9rem'
        }
      }}
      InputLabelProps={{
        style: {
          fontSize: '0.9rem'
        }
      }}
      onChange={e => onChange(e.target.value)}
      variant='standard'
    />
  </div>
}
