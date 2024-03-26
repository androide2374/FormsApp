import { Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApiForm } from '../../../pages/api/apiForm'
import {
  Question,
  QuestionForm,
  QuestionRes,
  QuestionTypeEnum
} from '../../types/response/question.type'
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
      isRequire: false,
      options: [
        {
          optionText: 'Option 1',
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
  isRequire: false,
  options: [
    {
      optionText: '',
      optionImage: ''
    }
  ]
}
export const Questions = (props: QuestionsProps) => {
  const { id } = props
  const [questions, setQuestions] = useState(initalValues)
  useEffect(() => {
    if (id) {
      const GetQuestions = async () => {
        const questionsBack = await ApiForm().get<QuestionRes[]>(
          `/Question?formId=${id.toString()}`
        )
        const { data } = questionsBack
        setQuestions({
          ...questions,
          formId: id.toString(),
          questions: !data
            ? [initalQuestions]
            : data.map((item) => {
              return {
                questionText: item.questionText,
                questionImage: item.questionImage,
                questionType: item.questionType,
                isRequire: item.isRequire,
                options: item.options.map((option) => {
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
    setQuestions({
      ...questions,
      questions: [...questions.questions, initalQuestions]
    })
  }
  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions.questions]
    newQuestions[questionIndex].options.push({
      optionText: `Opcion ${newQuestions[questionIndex].options.length + 1}`,
      optionImage: ''
    })
    setQuestions({ ...questions, questions: newQuestions })
  }
  const handleChangeQuestion = (e: any, index: number) => {
    setQuestions({
      ...questions,
      questions: questions.questions.map((item, i) => {
        if (i === index) {
          return { ...item, questionText: e.target.value }
        }
        return item
      })
    })
  }
  const handleChangeQuestionType = (e: any, index: number) => {
    setQuestions({
      ...questions,
      questions: questions.questions.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            questionType: e.target.value,
            options: [{ optionText: 'Opcion 1', optionImage: '' }]
          }
        }
        return item
      })
    })
  }
  const handleChangeOption = (
    e: string,
    questionIndex: number,
    indexOption: number
  ) => {
    setQuestions({
      ...questions,
      questions: [
        ...questions.questions.slice(0, questionIndex),
        {
          ...questions.questions[questionIndex],
          options: [
            ...questions.questions[questionIndex].options.slice(0, indexOption),
            {
              ...questions.questions[questionIndex].options[indexOption],
              optionText: e
            },
            ...questions.questions[questionIndex].options.slice(
              indexOption + 1
            )
          ]
        },
        ...questions.questions.slice(questionIndex + 1)
      ]
    })
  }
  const removeOption = (questionIndex: number, indexOption: number) => {
    // const newQuestions = [...questions.questions]
    // newQuestions[questionIndex].options.splice(indexOption, 1)
    setQuestions({
      ...questions,
      questions: questions.questions.map((item, i) => {
        if (i === questionIndex) {
          return {
            ...item,
            options: item.options.filter((option, i) => i !== indexOption)
          }
        }
        return item
      })
    })
  }
  const handleRequired = (e: boolean, questionIndex: number) => {
    setQuestions({
      ...questions,
      questions: questions.questions.map((item, i) => {
        if (i === questionIndex) {
          return { ...item, isRequire: e }
        }
        return item
      })
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    ApiForm()
      .post('/Question', questions)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const removeQuestion = (questionIndex: number) => {
    const newQuestions = { ...questions }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newQuestions.questions[questionIndex]
    setQuestions(newQuestions)
  }
  return (
    <Container
      maxWidth='lg'
     className="py-5 px-0">
      <span className="text-black text-2xl">Preguntas</span>
      <form>
        {questions.questions.map((question, questionindex) => (
          <QuestionItem
            removeQuestion={removeQuestion}
            handleRequired={handleRequired}
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
          className="border bg-red-500"
          onClick={(e) => handleSubmit(e)}
          type="submit"
          variant="contained"
          color="primary"
          style={{ textTransform: 'none' }}
        >
          Guardar formulario
        </Button>
      </form>
    </Container>
  )
}
