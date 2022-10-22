import '../styles/globals.css'
import App from "next/app"
import * as React from 'react'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps, categorys }) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEB_TITLE}</title>
      </Head>
      <Component {...pageProps} categorys={categorys} />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const dev = process.env.NODE_ENV !== 'production';
  try {
    const res = await fetch(`${dev ? "http://localhost:4001/api" : process.env.NEXT_PUBLIC_BASE_URL}/category/getcategory`)
    const categorys = await res.json()
    return { ...appProps, categorys }
  } catch (error) {
    return { ...appProps }
  }

}


export default MyApp
