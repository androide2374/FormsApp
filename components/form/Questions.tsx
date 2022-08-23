import { Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApiForm } from '../../pages/api/apiForm'
import { Question, QuestionForm, QuestionRes, QuestionTypeEnum } from '../../types/question.request.types'
import { QuestionItem } from './QuestionItems'

interface QuestionsProps {
  id: string | string[] | undefined
}
const initalValues: QuestionForm = {
  formId: '63018700cf26f7ba57ab39f1',
  questions: [
    {
      questionText: 'What is your name?',
      questionType: QuestionTypeEnum.RESPUESTA_CORTA,
      questionImage: '',
      options: [
        {
          optionText: '',
          optionImage: ''
        }
      ]
    }
  ]
}
const initalQuestions: Question = {
  questionText: 'Ingrese Pregunta',
  questionType: QuestionTypeEnum.RESPUESTA_CORTA,
  questionImage: '',
  options: [
    {
      optionText: '',
      optionImage: ''
    }
  ]
}
export const Questions = (props: QuestionsProps) => {
  console.log('rendered')
  const { id } = props
  const [questions, setQuestions] = useState(initalValues)
  useEffect(() => {
    if (id) {
      const GetQuestions = async () => {
        const questionsBack = await ApiForm().get<QuestionRes[]>(`/Question?formId=${id.toString()}`)
        const { data } = questionsBack
        setQuestions({
          ...questions,
          formId: id.toString(),
          questions: data.map(item => {
            return {
              questionText: item.questionText,
              questionImage: item.questionImage,
              questionType: item.questionType,
              options: item.options.map(option => {
                return {
                  optionText: option.optionText,
                  optionImage: option.optionImage
                }
              })
            }
          })
        })
      }
      GetQuestions()
      setQuestions({ ...questions, formId: id.toString() })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const addQuestion = () => {
    setQuestions({ ...questions, questions: [...questions.questions, initalQuestions] })
  }
  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions.questions]
    newQuestions[questionIndex].options.push({ optionText: 'Opcion', optionImage: '' })
    setQuestions({ ...questions, questions: newQuestions })
  }
  const handleChangeQuestion = (e: any, index: number) => {
    setQuestions({ ...questions, questions: [...questions.questions.slice(0, index), { ...questions.questions[index], questionText: e.target.value }, ...questions.questions.slice(index + 1)] })
  }
  const handleChangeQuestionType = (e: any, index: number) => {
    setQuestions({ ...questions, questions: [...questions.questions.slice(0, index), { ...questions.questions[index], questionType: e.target.value, options: [{ optionImage: '', optionText: '' }] }, ...questions.questions.slice(index + 1)] })
  }
  const handleChangeOption = (e: string, questionIndex: number, indexOption: number) => {
    console.log(e, questionIndex, indexOption)
    setQuestions({ ...questions, questions: [...questions.questions.slice(0, questionIndex), { ...questions.questions[questionIndex], options: [...questions.questions[questionIndex].options.slice(0, indexOption), { ...questions.questions[questionIndex].options[indexOption], optionText: e }, ...questions.questions[questionIndex].options.slice(indexOption + 1)] }, ...questions.questions.slice(questionIndex + 1)] })
  }
  const removeOption = (questionIndex: number, indexOption: number) => {
    const newQuestions = [...questions.questions]
    newQuestions[questionIndex].options.splice(indexOption, 1)
    setQuestions({ ...questions, questions: newQuestions })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    ApiForm().post('/Question', questions).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <Container className='py-5'>
      <span className='text-black text-2xl'>Preguntas</span>
      <form>
        {questions.questions.map((question, questionindex) => (
          <QuestionItem
            key={questionindex}
            question={question}
            addOption={addOption}
            removeOption={removeOption}
            handleChangeQuestion={handleChangeQuestion}
            handleChangeQuestionType={handleChangeQuestionType}
            handleChangeOption={handleChangeOption}
            addQuestion={addQuestion}
            index={questionindex}
            questionLength={questions.questions.length}
            />

        ))}
        <Button
          className='border bg-red-500'
          onClick={e => handleSubmit(e)}
          type='submit'
          variant='contained'
          color='primary'
          style={{ textTransform: 'none' }}
        >
          Guardar formulario
        </Button>
      </form>
    </Container>
  )
}
