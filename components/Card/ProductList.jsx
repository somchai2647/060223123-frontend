import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SVGLoading from '../SVGLoading'
import Image from 'next/image'
import Link from 'next/link'
import Axios from '../Axios'

export default function ProductList({ title, keyword, isRecommend }) {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    async function getSearch() {
        try {
            setProducts([])
            setLoading(true)
            const url = isRecommend ? `/product/searchProduct?keyword=${keyword}&isRecommend=true` : `/product/searchProduct?keyword=${keyword}`
            const result = await Axios.get(url)
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
    }, [router.isReady])


    return (
        <section className="section-content">
            <div className="container">
                <header className="section-heading">
                    <Link href={`/search?keyword=${keyword}`}>
                        <a className="btn  float-right text-primary">เพิ่มเติม</a>
                    </Link>
                    <h3 className="section-title">{title}</h3>
                </header>
                <div className="row">
                    {loading && <SVGLoading />}
                    {products.length > 0 && products?.slice(0, 4).map((product, index) => (
                        <div className="col-md-3" key={index}>
                            <Link href={`/detail/${product.id}`}>
                                <div className="card card-product-grid">
                                    <a href={`/detail/${product.id}`} className="img-wrap">
                                        <Image
                                            src={product?.image[0].url}
                                            alt={product.name}
                                            layout='fill'
                                            objectFit='contain'
                                            quality={40}
                                            priority
                                        />
                                    </a>
                                    <figcaption className="info-wrap">
                                        <a href={`/detail/${product.id}`} className="title">{product.name}</a>
                                        <div className="rating-wrap">
                                            <ul className="rating-stars">
                                                <li style={{ width: '80%' }} className="stars-active">
                                                    <i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" />
                                                </li>
                                            </ul>
                                            <span className="label-rating text-muted"> 34 reviws</span>
                                        </div>
                                        <div className="price mt-1">{product.price}.- บาท</div> {/* price-wrap.// */}
                                    </figcaption>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
