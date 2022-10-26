import React, { useState } from 'react'
import Link from 'next/link'
import numberWithCommas from '../../helpers/numberWithCommas'
import useCart from '../../hooks/useCart'

export default function ProductDetail({ product }) {
    const { addCard } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(product ? product?.image[0]?.url : "")

    function increment() {
        setQuantity(quantity => quantity + 1)
    }

    function decrement() {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1)
        }
    }

    function handleClickImage(image) {
        setSelectedImage(image)
    }

    function handleAddCart() {
        addCard(product.id, quantity)
    }

    return (
        <>
            <div className="card">
                <div className="row no-gutters">
                    <aside className="col-md-6">
                        <article className="gallery-wrap">
                            <div className="img-big-wrap">
                                <div className="d-block text-center"><img src={selectedImage} /></div>
                            </div> {/* img-big-wrap.// */}
                            <div className="thumbs-wrap">
                                {product.image?.map((img, index) => (
                                    <span className="item-thumb" key={index} onClick={() => handleClickImage(img.url)}>
                                        {/* <img src={img.url} /> */}
                                        <Image src={img.url} quality={50} width={43} height={58} />
                                    </span>
                                ))}
                            </div> {/* thumbs-wrap.// */}
                        </article> {/* gallery-wrap .end// */}
                    </aside>
                    <main className="col-md-6 border-left">
                        <article className="content-body">
                            <h2 className="title">{product.name}</h2>
                            <div className="rating-wrap my-3">
                                <ul className="rating-stars">
                                    <li style={{ width: '100%' }} className="stars-active">
                                        <img src="/assets/images/icons/stars-active.svg" />
                                    </li>
                                    <li>
                                        <img src="/assets/images/icons/starts-disable.svg" />
                                    </li>
                                </ul>
                                <small className="label-rating text-muted">132 reviews</small>
                                <small className="label-rating text-success"> <i className="fa fa-clipboard-check" /> 154 orders </small>
                            </div> {/* rating-wrap.// */}
                            <div className="mb-3">
                                {product.discount ? <PriceTag discount={product.discount} price={product.price} /> :
                                    <var className="price h3">ราคา  {numberWithCommas(product.price)} บาท</var>
                                }
                                <br />
                            </div>
                            <p>{product.desc}</p>
                            <dl className="row">
                                <dt className="col-sm-3">หมวดหมู่สินค้า</dt>
                                <dd className="col-sm-9 mb-3">
                                    <Link href={`/category/${product.category.id}`}>
                                        <a>{product.category.name}</a>
                                    </Link>
                                </dd>
                                <dt className="col-sm-3">สำนักพิมพ์</dt>
                                <dd className="col-sm-9 mb-3">
                                    <Link href={`/publisher/${product.publisher.id}`}>
                                        <a>{product.publisher.name}</a>
                                    </Link>
                                </dd>
                                <dt className="col-sm-3">ผู้เขียน/ผู้แต่ง</dt>
                                <dd className="col-sm-9 mb-3">
                                    <Link href={`/author/${product.author.id}`}>
                                        <a>{product.author.name}</a>
                                    </Link>
                                </dd>
                            </dl>
                            <hr />
                            <div className="row">
                                <div className="form-group col-md flex-grow-0">
                                    <label>จำนวน</label>
                                    <div className="input-group mb-3 input-spinner">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-light" onClick={decrement} type="button" id="button-minus"> - </button>
                                        </div>
                                        <input type="text" className="form-control" readOnly value={quantity} />
                                        <div className="input-group-append">
                                            <button className="btn btn-light" onClick={increment} type="button" id="button-plus"> + </button>
                                        </div>
                                    </div>
                                </div>
                            </div> {/* row.// */}
                            <button className="btn btn-outline-primary" onClick={handleAddCart} type='button'> <span className="text">Add to cart</span> <i className="fas fa-shopping-cart" /></button>
                        </article> {/* product-info-aside .// */}
                    </main> {/* col.// */}
                </div> {/* row.// */}
            </div> {/* card.// */}
        </>
    )
}

export function PriceTag({ price, discount }) {
    return (
        <>
            <span className="price h3">ราคา  {numberWithCommas(price - (price / 100) * discount)} บาท</span><br />
            <span className="text-danger h5"><del>{numberWithCommas(price)} บาท</del></span>
            <span className="text-danger ml-3">ประหยัด {numberWithCommas((price / 100) * discount)} บาท</span>
            <span className="text-danger ml-1">(ประหยัด {discount} %)</span>
        </>
    )
}
