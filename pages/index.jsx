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
      <ProductList title={"สินค้าแนะนำ"} url={`/product/getProdctGroup?isrecommend=true`} products={props.products} />
      <ProductList title={"สินค้าใหม่"} url={`/product/getProdctGroup?createdat=desc&take=20`} products={props.products2} />
      <ProductList title={"นิยายแปล"} url={`/category/getcategory/c5648f3b-4fa7-407a-bca1-3b2bed02ed46?withproduct=1&take=5`} products={props.products3} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    const res = await Axios.get(`/product/getProdctGroup?isrecommend=true&take=5`)
    const products = await res.data
    const res2 = await Axios.get(`/product/getProdctGroup?createdat=desc&take=5`)
    const products2 = await res2.data
    const res3 = await Axios.get(`/category/getcategory/c5648f3b-4fa7-407a-bca1-3b2bed02ed46?withproduct=1&take=5`)
    const products3 = await res3.data
    return {
      props: {
        products: products,
        products2: products2,
        products3: products3.Products,
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