import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'

export default function Home(props) {
  const authenContext = useContext(AuthenContext);
  const userContext = useContext(UserContext);
  return (
    <Layout categorys={props.categorys}>
      <section className="section-content">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">หนังสือเข้าใหม่</h3>
          </header>
          <div className="row">
            {props.products.length > 0 && props.products?.map((product, index) => (
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
  try {
    const dev = process.env.NODE_ENV !== 'production';
    const res = await fetch(`${dev ? "http://localhost:4001/api" : process.env.NEXT_PUBLIC_BASE_URL}/product/getproduct`)
    const data = await res.json()
    return {
      props: {
        products: data
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        products: []
      },
    }
  }
}