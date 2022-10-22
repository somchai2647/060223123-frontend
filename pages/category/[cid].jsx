import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import SectionPage from '../../components/SectionPage'
import Axios from '../../components/Axios'
import ProductListingLarge from '../../components/Card/ProductListingLarge'
import ProductGride from '../../components/Card/ProductGride'
import HeaderPanel from '../../components/Card/HeaderPanel'
import FilterPanel from '../../components/Card/FilterPanel'
import Pagination from '../../components/Pagination'

export default function CategoryProduct(props) {
    const router = useRouter()
    const { cid } = router.query

    const [products, setProducts] = useState(null)
    const [category, setCategory] = useState(null)
    const [gride, setGride] = useState(false)

    async function getProduct() {
        try {
            const res = await Axios.get(`/category/getcategory/${cid}?withproduct=1`)
            const categorydata = await res.data
            if (categorydata) {
                setCategory(categorydata)
                setProducts(categorydata.Products)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [router.isReady, router.query])

    function handleGridMode(mode) {
        setGride(mode)
    }

    return (
        <Layout categorys={props.categorys}>
            <SectionPage title={`🔎 ผลการค้นหาหมวดหมู่ : ${category && category.name}`} />
            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-3">
                            <FilterPanel />
                        </aside>
                        <main className="col-md-9">
                            <HeaderPanel numberitem={products?.length} callback={handleGridMode} />
                            {gride ? <ProductGride products={products} /> : <ProductListingLarge products={products} />}
                            {products && products.length === 0 && <h2 className='text-center'>ไม่พบหนังสือ</h2>}
                            {(products && products.length > 5) && <Pagination />}
                        </main>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
