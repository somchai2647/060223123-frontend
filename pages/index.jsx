import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import ProductList from '../components/Card/ProductList'

export default function Home(props) {
  const authenContext = useContext(AuthenContext);
  const userContext = useContext(UserContext);
  return (
    <Layout categorys={props.categorys}>
      <ProductList title={"สินค้าแนะนำ"} api="/product/getProdctGroup?isrecommend=true" />
      <ProductList title={"สินค้าใหม่"} api="/product/getProdctGroup?createdat=desc" />

    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    const dev = process.env.NODE_ENV !== 'production';
    const res = await fetch(`${dev ? "http://localhost:4001/api" : process.env.NEXT_PUBLIC_BASE_URL}/product/getproduct`)
    const data = await res.json()
    return {
      props: {
        products: data
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        products: []
      },
    }
  }
}