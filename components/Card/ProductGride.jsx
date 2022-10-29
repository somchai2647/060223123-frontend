import React from 'react'
import Link from 'next/link'
import numberWithCommas from '../../helpers/numberWithCommas'
import useCart from '../../hooks/useCart'

export default function ProductGride({ products }) {
    const { addCard } = useCart()

    function handleAddCard(product) {
        addCard(product.id, 1)
    }

    return (
        <>
            <div className="row">
                {products?.map((product) => (
                    <div className="col-md-4" key={product.id}>
                        <figure className="card card-product-grid">
                            <Link href={`/detail/${product.id}`}>
                                <a>
                                    <div className="img-wrap">
                                        <span className="badge badge-danger"> NEW </span>
                                        <img src={product.image[0]?.url} />
                                    </div>
                                </a>
                            </Link>
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <Link href={`/detail/${product.id}`}>
                                        <a className="title">{product.name}</a>
                                    </Link>
                                    <div className="price-wrap mt-2">
                                        <span className="price">{numberWithCommas(product.price - (product.price / 100) * product.discount)} บาท</span>
                                        <del className="price-old text-danger">{numberWithCommas(product.price)} บาท</del>
                                    </div>
                                    <div className="rating-wrap mb-3">
                                        <ul className="rating-stars">
                                            <li style={{ width: '80%' }} className="stars-active">
                                                <i className="fa fa-star" /> <i className="fa fa-star" />
                                                <i className="fa fa-star" /> <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                            </li>
                                            <li>
                                                <i className="fa fa-star" /> <i className="fa fa-star" />
                                                <i className="fa fa-star" /> <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                            </li>
                                        </ul>
                                        <div className="label-rating">7/10</div>
                                    </div>
                                </div>
                                <button type='button' onClick={() => handleAddCard(product)} className="btn btn-block btn-primary">Add to cart </button>
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </div>
        </>
    )
}
