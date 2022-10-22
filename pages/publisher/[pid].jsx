import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import SectionPage from '../../components/SectionPage'
import Axios from '../../components/Axios'
import ProductListingLarge from '../../components/Card/ProductListingLarge'
import ProductGride from '../../components/Card/ProductGride';
import FilterPanel from '../../components/Card/FilterPanel'
import Pagination from '../../components/Pagination'

export default function PublisherProduct(props) {
    const router = useRouter()
    const { pid } = router.query

    const [products, setProducts] = useState(null)
    const [publisher, setPublisher] = useState(null)
    const [gride, setGride] = useState(false)

    async function getProduct() {
        try {
            const res = await Axios.get(`/publisher/getpublisher/${pid}?withproduct=1`)
            const publisherdata = await res.data
            if (publisherdata) {
                setPublisher(publisherdata)
                setProducts(publisherdata.Products)
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
            <SectionPage title={`🔎 ผลการสำนักพิมพ์ : ${publisher && publisher.name}`} />
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

export function HeaderPanel({ callback, numberitem = 0 }) {

    const [grid, setGrid] = useState(false)

    function toggle() {
        callback(!grid)
        setGrid(!grid)
    }

    return (
        <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
                <span className="mr-md-auto">{numberitem} Items found </span>
                <select className="mr-2 form-control">
                    <option>Latest items</option>
                    <option>Trending</option>
                    <option>Most Popular</option>
                    <option>Cheapest</option>
                </select>
                <div className="btn-group">
                    <button className={`btn btn-outline-secondary ${!grid && "active"}`} onClick={toggle} data-toggle="tooltip" title="List view">
                        <i className="fa fa-bars" /></button>
                    <button className={`btn  btn-outline-secondary ${grid && "active"}`} onClick={toggle} data-toggle="tooltip" title="Grid view">
                        <i className="fa fa-th" /></button>
                </div>
            </div>
        </header>
    )
}