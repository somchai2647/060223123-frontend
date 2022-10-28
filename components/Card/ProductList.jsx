import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Axios from '../Axios'

export default function ProductList({ title, api, products }) {

    // const [products, setProducts] = useState([])

    // async function getProduct() {
    //     const res = await Axios.get(api)
    //     const data = await res.data

    //     setProducts(data)
    // }

    // useEffect(() => {
    //     getProduct()
    // }, [])


    return (
        <section className="section-content">
            <div className="container">
                <header className="section-heading">
                    <a href="#" className="btn  float-right text-primary">เพิ่มเติม</a>
                    <h3 className="section-title">{title}</h3>
                </header>
                <div className="row">
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
                                            quality={70}
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
