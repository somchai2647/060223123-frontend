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
      <ProductList keyword={""} title={"⭐ สินค้าแนะนำ"} isRecommend={true} />
      <ProductList keyword={""} title={"สินค้าใหม่"} />
      <ProductList keyword={"SPY X FAMILY"} title={"SPY X FAMILY"} />
      <ProductList keyword={"เกิดชาตินี้พี่ต้องเทพ"} title={"นิยายเรื่อง เกิดชาตินี้พี่ต้องเทพ"} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {

    },
  }
}