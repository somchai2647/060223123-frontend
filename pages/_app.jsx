import '../styles/globals.css'
import App from "next/app"
import * as React from 'react'
import Head from 'next/head'
import Axios from '../components/Axios'

function MyApp({ Component, pageProps, categorys }) {
  return (
    <>
      <Head>
        <title>ร้านหนอนหนังสือ</title>
      </Head>
      <Component {...pageProps} categorys={categorys} />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const res = await Axios.get('/category/getcategory')
  const categorys = await res.data
  return { ...appProps, categorys }
}


export default MyApp
