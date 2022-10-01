import '../styles/globals.css'
import * as React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ร้านหนอนหนังสือ</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
