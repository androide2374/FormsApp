import { Button } from '@mui/material'
import { Option, QuestionTypeEnum } from '../../types/response/question.type'
import { OptionInput } from './OptionInput'
import CloseIcon from '@mui/icons-material/Close'

interface OptionsProps {
  options: Option[]
  questionType: QuestionTypeEnum
  questionIndex: number
  addOption: (questIndex: number) => void
  onChange: (
    value: string,
    questionIndexValue: number,
    optionIndexValue: number
  ) => void
  removeOption: (questIndex: number, optionIndex: number) => void
}
export const Options = (props: OptionsProps) => {
  const {
    options,
    questionType,
    questionIndex,
    onChange,
    removeOption,
    addOption
  } = props
  return (
    <>
      {options.map((option, optionindex) => (
        <div key={optionindex}>
          <div className="flex flex-row">
            <OptionInput
              onFocus={(e) => e.target.select()}
              autoFocus={optionindex === options.length - 1}
              optionData={option}
              label={`Opcion ${optionindex + 1}`}
              questionType={questionType}
              onChange={(e) => onChange(e, questionIndex, optionindex)}
            />
            {options.length > 1 && (
              <Button
                onClick={() => removeOption(questionIndex, optionindex)}
                variant="text"
                color="secondary"
              >
                <CloseIcon />
              </Button>
            )}
          </div>
          {optionindex === options.length - 1 && (
            <div className="flex flex-row mt-4 items-end">
              <OptionInput
                onFocus={() => addOption(questionIndex)}
                optionData={{ optionText: '', optionImage: '' }}
                className="basis-1/3"
                label={'Agregar Opcion'}
                questionType={questionType}
                onChange={(e) => onChange(e, questionIndex, optionindex)}
              />
              <span>o</span>
              <Button
                onClick={() => addOption(questionIndex)}
                variant="text"
                color="primary"
                style={{
                  textTransform: 'none',
                  width: 'auto',
                  paddingBottom: 0
                }}
                className="basis-auto"
              >
                {'agregar "Otros"'}
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  )
}
