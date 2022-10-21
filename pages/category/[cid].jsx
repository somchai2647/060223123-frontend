import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import SectionPage from '../../components/SectionPage'
import Axios from '../../components/Axios'
import ProductListingLarge from '../../components/Card/ProductListingLarge'
import FilterPanel from '../../components/Card/FilterPanel'
import Pagination from '../../components/Pagination';

export default function CategoryProduct(props) {
    const router = useRouter()
    const { cid } = router.query

    const [products, setProducts] = useState(null)
    const [category, setCategory] = useState(null)

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
                            <HeaderPanel />
                            {products && products?.map((item) => (
                                <ProductListingLarge product={item} key={item.id} />
                            ))}
                            {products && products.length === 0 && <h2 className='text-center'>ไม่พบหนังสือ</h2>}
                            {(products && products.length > 5) && <Pagination />}
                        </main>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export function HeaderPanel() {
    return (
        <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
                <span className="mr-md-auto">32 Items found </span>
                <select className="mr-2 form-control">
                    <option>Latest items</option>
                    <option>Trending</option>
                    <option>Most Popular</option>
                    <option>Cheapest</option>
                </select>
                <div className="btn-group">
                    <a href="#" className="btn btn-outline-secondary active" data-toggle="tooltip" title="List view">
                        <i className="fa fa-bars" /></a>
                    <a href="#" className="btn  btn-outline-secondary" data-toggle="tooltip" title="Grid view">
                        <i className="fa fa-th" /></a>
                </div>
            </div>
        </header>
    )
}