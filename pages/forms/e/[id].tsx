import { Box, Checkbox, Container, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AppBar } from '../../../components/appBar/AppBar'
import { useForm } from '../../../hooks/useForm'
import { QuestionTypeEnum } from '../../../types/response/question.type'

export default function Formulario () {
  const router = useRouter()
  const { id } = router.query
  const { loading, formData } = useForm(id)
  const [SelectedValue, setSelectedValue] = useState('')
  console.log(formData)
  if (loading) return <div>Cargando...</div>
  return (
    <>
      <Head>
        <title>Formulario {formData?.name}</title>
      </Head>
      <AppBar
        title={'Formulario'}
        share={true}
        onShare={() => {
          console.log('share')
        }}
      />
      <Container className='px-0'>
        <Box className='w-full bg-white my-10 rounded p-4' style={{ borderTop: '10px solid #09f' }}>
          <Typography variant='h2'>
            {formData?.name}
          </Typography>
          <Divider />
          <Typography variant='subtitle1'>
            {formData?.name}
          </Typography>
        </Box>
        {formData?.questions && formData?.questions.map((question, index) => (
          <Box key={question.id} className='w-full bg-white my-5 rounded p-4'>
            <Typography variant='h6'>
              {question.questionText} {question.isRequire ? '*' : ''}
            </Typography>
            <Divider />
            {question.questionType === QuestionTypeEnum.RESPUESTA_CORTA && (
              <TextField placeholder='Ingrese su respuesta aqui' variant='standard' fullWidth />
            )}
            {question.questionType === QuestionTypeEnum.RESPUESTA_PARRAFO && (
              <TextField placeholder='Ingrese su respuesta aqui' variant='standard' fullWidth multiline rows={4} />
            )}
            {question.questionType === QuestionTypeEnum.OPCION_MULTIPLE && (
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {question.options.map(option => (
                    <FormControlLabel value={option.id} key={option.id} control={<Radio />} label={option.optionText} />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            {question.questionType === QuestionTypeEnum.CASILLAS_DE_VERIFICACION && (
              <FormControl>
                {question.options.map(option => (
                  <FormControlLabel value={option.id} key={option.id} control={<Checkbox />} label={option.optionText} />
                ))}
              </FormControl>
            )}
            {question.questionType === QuestionTypeEnum.LISTA_DESPLEGABLE && (
              <FormControl fullWidth>
                <Select variant='standard' value={SelectedValue} onChange={(e) => setSelectedValue(e.target.value)} fullWidth>
                  {question.options.map(option => (
                    <MenuItem key={option.id} value={option.id}>{option.optionText}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        ))}
      </Container>
    </>
  )
}
