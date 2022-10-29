import React, { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Axios from '../../components/Axios'
import SVGLoading from '../../components/SVGLoading'
// import ProductDetail from '../../components/Card/ProductDetail';

const DynamicProductDetail = dynamic(() => import('../../components/Card/ProductDetail'), {
    suspense: true,
})

export default function ProductDetailPage({ product, categorys }) {

    const router = useRouter()

    return (
        <Layout categorys={categorys}>
            <section className="section-content padding-y bg">
                <div className="container">
                    <Suspense fallback={<SVGLoading />} >
                        <DynamicProductDetail product={product} />
                    </Suspense>
                    {/* {product && <ProductDetail product={product} />} */}
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    try {
        const pid = context.params.pid
        const res = await Axios.get(`/product/getproduct/${pid}`)
        const product = await res.data

        if (!product) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                product: product
            }
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                product: []
            }
        }
    }

    // Rest of `getServerSideProps` code
}