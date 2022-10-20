import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Axios from '../../components/Axios'
import ProductDetail from '../../components/Card/ProductDetail';

export default function ProductDetailPage(props) {
    const router = useRouter()
    const { pid } = router.query

    const [product, setProduct] = useState(null)

    async function getProduct() {
        try {
            const res = await Axios.get(`/product/getproduct/${pid}`)
            const product = await res.data
            if (product) {
                setProduct(product)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [router.isReady,router.query])


    return (
        <Layout categorys={props.categorys}>
            <section className="section-content padding-y bg">
                <div className="container">
                    {product && <ProductDetail product={product} />}
                </div>
            </section>
        </Layout>
    )
}
