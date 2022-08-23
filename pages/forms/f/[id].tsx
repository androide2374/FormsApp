import { AppBar, Box, Button, Container, Divider, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormData } from '../../../components/form/FormData'
import { Questions } from '../../../components/form/Questions'
import { TabPanel } from '../../../components/tab/TabPanel'
import { useForm } from '../../../hooks/useForm'
// import { Form as FormType } from '../../../types/form.responses.types'

// const initialValues: FormType = {
//   name: 'Nuevo Formulario',
//   description: '',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   id: '',
//   createdBy: '',
//   formType: 1,
//   lastUpdateBy: '',
//   stared: false,
//   questions: [],
//   userFormPermisions: null
// }

export default function FormCrud () {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const router = useRouter()
  const { id } = router.query
  const { loading } = useForm(id)

  function a11yProps (index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }
  if (loading) return <div>Cargando...</div>
  return (
    <>
      <Head>
        <title>Formulario</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Su logo Aqui
          </Typography>
          <Button color="inherit">Compartir</Button>
        </Toolbar>
      </AppBar>
      <Container className='h-auto my-10 rounded' style={{ backgroundColor: '#fff' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center' }}>
          <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
            <Tab label="Formulario" {...a11yProps(0)} />
            <Tab label="Respuestas" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FormData id={id} />
          <Divider />
          <Questions id={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>

      </Container>
    </>
  )
}
