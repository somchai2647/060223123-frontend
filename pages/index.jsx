import { useState, useEffect, useContext, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Axios from '../components/Axios'
import Layout from '../components/Layout'
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import SVGLoading from '../components/SVGLoading'


const ProductList = dynamic(() => import('../components/Card/ProductList'), {
  suspense: true,
  ssr: false
})

export default function Home(props) {
  const authenContext = useContext(AuthenContext);
  const userContext = useContext(UserContext);
  return (
    <Layout categorys={props.categorys}>
      <Suspense fallback={<SVGLoading />}>
        <ProductList keyword={""} title={"⭐ สินค้าแนะนำ"} isRecommend={true} />
        <ProductList keyword={""} title={"สินค้าใหม่"} />
        <ProductList keyword={"SPY X FAMILY"} title={"SPY X FAMILY"} />
        <ProductList keyword={"เกิดชาตินี้พี่ต้องเทพ"} title={"นิยายเรื่อง เกิดชาตินี้พี่ต้องเทพ"} />
      </Suspense>
      {/* <ProductList keyword={""} title={"⭐ สินค้าแนะนำ"} isRecommend={true} />
      <ProductList keyword={""} title={"สินค้าใหม่"} />
      <ProductList keyword={"SPY X FAMILY"} title={"SPY X FAMILY"} />
      <ProductList keyword={"เกิดชาตินี้พี่ต้องเทพ"} title={"นิยายเรื่อง เกิดชาตินี้พี่ต้องเทพ"} /> */}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {

    },
  }
}