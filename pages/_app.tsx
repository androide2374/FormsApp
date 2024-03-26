import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import FormEditProvider from '../src/provider/FormEditProvider'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <FormEditProvider>
      <Head>
        <title>Formularios Lomas de Zamora</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

      </Head>
      <Component {...pageProps} />
    </FormEditProvider>
  )
}

export default MyApp
