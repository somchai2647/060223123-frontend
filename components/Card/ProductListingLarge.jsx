import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import numberWithCommas from '../../helpers/numberWithCommas'

export default function ProductListingLarge({ products }) {
  return (
    <>
      {products?.map((product) => (
        <article className="card card-product-list" key={product.id}>
          <div className="row no-gutters">
            <aside className="col-md-3">
              <Link href={`/detail/${product.id}`}>
                <a className="img-wrap">
                  <span className="badge badge-danger"> NEW </span>
                  {/* <img src={product.image[0]?.url} /> */}
                  <Image
                    src={product.image[0]?.url}
                    alt={product.name}
                    quality={70}
                    layout='fill'
                    objectFit='contain'
                  />
                </a>
              </Link>
            </aside>
            <div className="col-md-6">
              <div className="info-main">
                <Link href={`/detail/${product.id}`}>
                  <a className="h5 title"> {product.name}</a>
                </Link>
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
                <p> {product.desc} </p>
              </div>
            </div>
            <aside className="col-sm-3">
              <div className="info-aside">
                <div className="price-wrap">
                  <span className="price h5"> {numberWithCommas(product.price - (product.price / 100) * product.discount)} บาท </span>
                  <del className="price-old"> {numberWithCommas(product.price)} บาท</del>
                </div>
                <p className="text-success">ประหยัด {numberWithCommas((product.price / 100) * product.discount)} บาท</p>
                <br />
                <p>
                  <a href="#" className="btn btn-primary btn-block mt-4"><i className="fas fa-shopping-cart mr-2" /> Add to cart </a>
                </p>
              </div>
            </aside>
          </div>
        </article>
      ))}
    </>
  )
}
