import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField
} from '@mui/material'
import { OptionInput } from './OptionInput'
import { Options } from './Options'
import {
  Question,
  QuestionTypeEnum,
  QuestionTypesList
} from '../../types/response/question.type'

interface QuestionItemProps {
  question: Question
  index: number
  handleChangeQuestion: (question: any, index: number) => void
  handleChangeQuestionType: (question: any, index: number) => void
  removeOption: (questionIndex: number, optionIndex: number) => void
  addOption: (questionIndex: number) => void
  removeQuestion: (questionIndex: number) => void
  handleChangeOption: (
    value: string,
    questionIndex: number,
    optionIndex: number
  ) => void
  questionLength: number
  addQuestion: () => void
  handleRequired: (value: boolean, questionIndex: number) => void
}

export const QuestionItem = (props: QuestionItemProps) => {
  const {
    question,
    handleChangeQuestion,
    handleChangeQuestionType,
    index,
    removeOption,
    addOption,
    handleChangeOption,
    questionLength,
    addQuestion,
    handleRequired,
    removeQuestion
  } = props
  return (
    <div key={index} className="my-5">
      <Accordion style={{ marginBottom: 10 }} expanded>
        <AccordionSummary
          expandIcon={<i className="fas fa-chevron-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="text-black text-2xl">{`Pregunta ${index + 1}`}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-1 flex gap-5 flex-col sm:flex-row">
            <TextField
              fullWidth
              label={`Pregunta ${index + 1}`}
              value={question.questionText}
              onChange={(e) => handleChangeQuestion(e, index)}
              variant="standard"
            />
            <Select
              fullWidth
              className="basis-3/12"
              labelId="formType"
              id="formType"
              value={question.questionType}
              onChange={(e) => handleChangeQuestionType(e, index)}
              variant="standard"
            >
              {Object.keys(QuestionTypesList).map((key: string) => (
                <MenuItem key={key} value={QuestionTypesList[key].id}>
                  {QuestionTypesList[key].name}
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              control={
                <Switch
                  checked={question.isRequire}
                  value={question.isRequire}
                  onChange={(e) => handleRequired(e.target.checked, index)}
                />
              }
              label="Obligatoria"
            />
          </div>
          {!QuestionTypesList[QuestionTypeEnum[question.questionType]]
            .textDescription
            ? (
            <Options
              removeOption={removeOption}
              options={question.options}
              questionIndex={index}
              questionType={question.questionType}
              addOption={addOption}
              onChange={handleChangeOption}
            />
              )
            : (
            <OptionInput
              optionData={question.options[0]}
              label={''}
              questionType={question.questionType}
              onChange={(e) => handleChangeOption(e, index, 0)}
            />
              )}
      {index === questionLength - 1 && (
        <div className='sm:flex flex-col gap-3 hidden' style={{ position: 'absolute', right: -70, top: 0 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault()
              addQuestion()
            }}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={questionLength === 1}
            onClick={(e) => {
              e.preventDefault()
              removeQuestion(index)
            }}
          >
            -
          </Button>
        </div>
      )}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
