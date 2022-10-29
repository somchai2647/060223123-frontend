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

export default function Search(props) {
    const router = useRouter()
    const { mode, title } = router.query

    const [products, setProducts] = useState(props.products || null)
    const [category, setCategory] = useState(null)
    const [gride, setGride] = useState(false)

    function handleGridMode(mode) {
        setGride(mode)
    }

    function handleSort(sort) {
        setProducts([...products].sort((a, b) => (a[sort] > b[sort]) ? 1 : -1))
    }


    return (
        <Layout categorys={props.categorys}>
            <SectionPage title={`🔎 ผลการค้นหาหมวดหมู่ : ${title}`} />
            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        {/* <aside className="col-md-3">
                            <FilterPanel />
                        </aside> */}
                        <main className="col-md-12">
                            <HeaderPanel sortaction={handleSort} numberitem={products?.length} callback={handleGridMode} />
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

export async function getServerSideProps(context) {
    try {
        const url = context.query.url
        const res = await Axios.get(url)
        const products = await res.data
        return {
            props: {
                products: products
            }
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                products: []
            }
        }
    }

}