import '../styles/globals.css'
import App from "next/app"
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import { useRouter } from 'next/router'
import Axios from '../components/Axios'


function MyApp({ Component, pageProps, categorys }) {

  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)

  async function loginAuto() {
    try {
      const res = await Axios.get('/auth/checktoken')
      const data = await res.data
      if (data) {
        setUser(data)
        setIsLogin(true)
      }
    } catch (error) {
      setIsLogin(false)
    }
  }
  useEffect(() => {
    if (!isLogin) {
      loginAuto()
    }
  }, [router.isReady])


  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEB_TITLE}</title>
      </Head>
      <AuthenContext.Provider value={{ isLogin, setIsLogin }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} categorys={categorys} user={user} />
        </UserContext.Provider>
      </AuthenContext.Provider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const dev = process.env.NODE_ENV !== 'production';
  try {
    const res = await fetch(`${dev ? "http://localhost:4001/api" : process.env.NEXT_PUBLIC_BASE_URL}/category/getcategory`)
    const categorys = await res.json()
    return { ...appProps, categorys: categorys }
  } catch (error) {
    return { ...appProps }
  }

}


export default MyApp
