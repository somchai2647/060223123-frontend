import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Axios from '../../components/Axios'

export default function CategoryProduct(props) {
    const router = useRouter()
    const { cid } = router.query

    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)

    async function getProduct() {
        try {
            const res = await Axios.get(`/category/getcategory/${cid}?withproduct=1`)
            const categorydata = await res.data
            if (categorydata) {
                setCategory(categorydata)
                setProduct(categorydata.Products)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [router.isReady])

    return (
        <Layout categorys={props.categorys}>
            {JSON.stringify(category.name)}
        </Layout>
    )
}
