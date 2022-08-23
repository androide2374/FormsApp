import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, MenuItem, Select, TextField } from '@mui/material'
import { OptionInput } from './OptionInput'
import { Options } from './Options'
import { Question, QuestionTypeEnum, QuestionTypesList } from '../../types/question.request.types'

interface QuestionItemProps {
  question: Question
  index: number
  handleChangeQuestion: (question: any, index: number) => void
  handleChangeQuestionType: (question: any, index: number) => void
  removeOption: (questionIndex: number, optionIndex: number) => void
  addOption: (questionIndex: number) => void
  handleChangeOption: (value: string, questionIndex: number, optionIndex: number) => void
  questionLength: number
  addQuestion: () => void
}

export const QuestionItem = (props: QuestionItemProps) => {
  console.log('rendered question item')
  const { question, handleChangeQuestion, handleChangeQuestionType, index, removeOption, addOption, handleChangeOption, questionLength, addQuestion } = props
  return <div key={index} className='my-10'>
  <Accordion>
    <AccordionSummary
      expandIcon={<i className='fas fa-chevron-down' />}
      aria-controls='panel1a-content'
      id='panel1a-header'
    > <span className='text-black text-2xl'>{`Pregunta ${index + 1}`}</span>
    </AccordionSummary>
    <AccordionDetails>
      <div className='my-5 flex gap-5'>
        <TextField
          className='basis-9/12'
          fullWidth
          label={`Pregunta ${index + 1}`}
          value={question.questionText}
          onChange={(e) => handleChangeQuestion(e, index)}
          variant='standard'
        />
        <Select
          fullWidth
          className='basis-3/12'
          labelId='formType'
          id='formType'
          value={question.questionType}
          onChange={(e) => handleChangeQuestionType(e, index)}
          variant='standard'
        >
          {Object.keys(QuestionTypesList).map((key: string) => (
            <MenuItem
              key={key}
              value={QuestionTypesList[key].id}
            >
              {QuestionTypesList[key].name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {!QuestionTypesList[QuestionTypeEnum[question.questionType]].textDescription
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
            label={'probando'}
            questionType={question.questionType}
            onChange={(e) => handleChangeOption(e, index, 0)}
          />
          )}
      <div className='my-5'>
        <Divider />
      </div>
      {index === questionLength - 1 && (
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => {
            e.preventDefault()
            addQuestion()
          }}
        >
          Add Question
        </Button>
      )}
    </AccordionDetails>
  </Accordion>
</div>
}
