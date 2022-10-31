import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import SectionPage from '../components/SectionPage'
import Axios from '../components/Axios'
import ProductListingLarge from '../components/Card/ProductListingLarge'
import ProductGride from '../components/Card/ProductGride'
import HeaderPanel from '../components/Card/HeaderPanel'
import FilterPanel from '../components/Card/FilterPanel'
import Pagination from '../components/Pagination'
import SVGLoading from '../components/SVGLoading'

export default function Search({ result, categorys }) {
  const router = useRouter()
  const { keyword, isRecommend } = router.query

  const [products, setProducts] = useState([])
  const [gride, setGride] = useState(false)
  const [loading, setLoading] = useState(false)

  async function getSearch() {
    try {
      setProducts([])
      setLoading(true)
      const result = await Axios.get(isRecommend ? `/product/searchProduct?keyword=${keyword}&isRecommend=true` : `/product/searchProduct?keyword=${keyword}`)
      const data = await result.data
      if (data) {
        setProducts(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSearch()
  }, [keyword])


  function handleGridMode(mode) {
    setGride(mode)
  }

  function handleSort(sort) {
    setProducts([...products].sort((a, b) => (a[sort] > b[sort]) ? 1 : -1))
  }


  return (
    <Layout categorys={categorys}>
      <SectionPage title={`🔎 ผลการค้นหา: ${keyword}`} />
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            {/* <aside className="col-md-3">
                            <FilterPanel />
                        </aside> */}
            <main className="col-md-12">
              <HeaderPanel sortaction={handleSort} numberitem={products?.length} callback={handleGridMode} />
              {loading && <SVGLoading />}
              {gride ? <ProductGride products={products} /> : <ProductListingLarge products={products} />}
              {products.length === 0 && <h2 className='text-center'>ไม่พบหนังสือ</h2>}
              {(products && products.length > 10) && <Pagination />}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  )
}
