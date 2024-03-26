import { Box, Checkbox, Container, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AppBar } from '../../../src/components/appBar/AppBar'
import { Context } from '../../../src/context/formEditContext'
import { QuestionTypeEnum } from '../../../src/types/response/question.type'
import { RespuestaDeFormulario } from '../../../src/types/respuestasDeFormulario'
import { ApiForm } from '../../api/apiForm'

export default function Formulario () {
  const { form: formData, setForm } = useContext(Context)
  const instance = ApiForm()
  const [loading, setLoading] = useState(true)
  const [respues, setRespues] = useState<RespuestaDeFormulario[]>([])
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (!id) return
    instance.get(`form/id?id=${id.toString()}`)
      .then(result => {
        const { data } = result
        setForm(data)
        setLoading(false)
      }).catch(error => {
        console.log(error)
        alert('Error al obtener el formulario')
      })
  }, [id])
  const responder = (id: string, e: any, name: string) => {
    const { value } = e.target
    const respuesta: RespuestaDeFormulario = {
      idPregunta: id,
      respuesta: value,
      nombre: name
    }
    const index = respues.findIndex(r => r.idPregunta === id)
    if (index === -1) {
      setRespues([...respues, respuesta])
    } else {
      const newRespues = [...respues]
      newRespues[index] = respuesta
      setRespues(newRespues)
    }
  }
  const [SelectedValue, setSelectedValue] = useState('')
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
            {formData?.description}
          </Typography>
        </Box>
        {formData?.questions && formData?.questions.map((question, index) => (
          <Box key={question.id} className='w-full bg-white my-5 rounded p-4'>
            <Typography variant='h6'>
              {question.questionText} {question.isRequire ? '*' : ''}
            </Typography>
            <Divider />
            {question.questionType === QuestionTypeEnum.RESPUESTA_CORTA && (
              <TextField placeholder='Ingrese su respuesta aqui' variant='standard' fullWidth onChange={(e) => responder(question.id, e, question.questionText)} />
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
