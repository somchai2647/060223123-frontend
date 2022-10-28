import { useState, useEffect, useContext } from 'react'
import Axios from '../components/Axios'
import Layout from '../components/Layout'
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import ProductList from '../components/Card/ProductList'

export default function Home(props) {
  const authenContext = useContext(AuthenContext);
  const userContext = useContext(UserContext);
  return (
    <Layout categorys={props.categorys}>
      {/* {JSON.stringify(props.products2)} */}
      <ProductList title={"สินค้าแนะนำ"} products={props.products} />
      <ProductList title={"สินค้าใหม่"} products={props.products2} />
      {/* <ProductList title={"สินค้าแนะนำ"} api="/product/getProdctGroup?isrecommend=true" />
      <ProductList title={"สินค้าใหม่"} api="/product/getProdctGroup?createdat=desc" /> */}

    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    const res = await Axios.get(`/product/getProdctGroup?isrecommend=true`)
    const products = await res.data
    const res2 = await Axios.get(`/product/getProdctGroup?createdat=desc`)
    const products2 = await res2.data
    return {
      props: {
        products: products,
        products2: products2
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