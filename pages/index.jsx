import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbars/Navbar'
import Layout from '../components/Layout'

export default function Home(props) {

  return (
    <Layout categorys={props.categorys}>
      <section className="section-content">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">Popular products</h3>
          </header>
          <div className="row">
            {props.products?.map((product, index) => (
              <div className="col-md-3" key={index}>
                <Link href={`/detail/${product.id}`}>
                  <div className="card card-product-grid">
                    <a href={`/detail/${product.id}`} className="img-wrap"> <img src={product?.image[0].url} /> </a>
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

    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.BASE_URL}/product/getproduct`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      products: data
    },
  }
}