import Layout from '../components/Layout'
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import SectionPage from '../components/SectionPage'
import Axios from '../components/Axios'
import Image from 'next/image'
import manageState from '../helpers/manageState'
import useSweetAlert from '../hooks/useSweetAlert'
import { useRouter } from 'next/router'
import numberWithCommas from '../helpers/numberWithCommas'

export default function Cart(props) {
    const router = useRouter()
    const alert = useSweetAlert()
    const [products, setProducts] = useState([])

    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)
    const [price, setPrice] = useState(0)
    const [difference, setDifference] = useState(0)

    async function removeItem(cartid) {
        const response = await Axios.delete(`/cart/deleteItem/${cartid}`)
        const data = await response.data

        if (data) {
            manageState("delete", products, setProducts, data)
            manageState("delete", order, setOrder, data)
            alert.toast("success", "Item removed from cart")
        }

    }

    async function getCart() {
        try {
            const res = await Axios.get(`/cart/getcart/${props.user.username}`)
            const data = await res.data
            if (data) {
                setProducts(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (props.user) {
            getCart()
        }
    }, [router.isReady, props])

    function getPrice() {
        let _price = 0
        let _discount = 0
        products.forEach(item => {
            _price = _price + parseFloat(item.Products.price * item.quantity)
            _discount = _discount + parseFloat(((item.Products.discount / 100) * item.Products.price) * item.quantity)
        })
        setPrice(_price)
        setDifference(_discount)
        setTotal(_price - _discount)
        return _price
    }

    function handleRowAction(callback) {
        const { action, product, cartid, opr } = callback

        const index = products.findIndex(cart => cart.id === cartid)
        var newProduct = products[index]

        switch (action) {
            case "remove":
                removeItem(cartid)
                break;
            case "init":
                break;
            case "increment":
                console.log("increment", cartid)
                newProduct.quantity = newProduct.quantity + 1
                manageState("update", products, setProducts, newProduct)
                break;
            case "decrement":
                console.log("decrement", cartid)
                newProduct.quantity = newProduct.quantity - 1
                manageState("update", products, setProducts, newProduct)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getPrice()
    }, [products])


    return (
        <Layout categorys={props.categorys}>
            <SectionPage title="🛒 ตะกร้าสินค้า" />
            <section className="section-content padding-y">
                <div className="container">
                    {JSON.stringify(products)}
                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">
                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col" width={400}>รายการสินค้า</th>
                                            <th scope="col" width={120}>จำนวน</th>
                                            <th scope="col" width={120}>ราคา</th>
                                            <th scope="col" width={120}>ราคารวม</th>
                                            <th scope="col" className="text-right" width={120}> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((cart) => (
                                            <CartRow
                                                key={cart.id}
                                                cartid={cart.id}
                                                product={cart.Products}
                                                callback={handleRowAction}
                                                quantityItem={cart.quantity}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                <div className="card-body border-top">
                                    <a href="#" className="btn btn-primary float-md-right"> Make Purchase <i className="fa fa-chevron-right" /> </a>
                                    <Link href="/">
                                        <a className="btn btn-light"> <i className="fa fa-chevron-left" /> ซื้อสินค้าต่อ </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="alert alert-success mt-3">
                                <p className="icontext"><i className="icon text-success fa fa-truck" /> จัดส่งฟรีภายใน 1-2 สัปดาห์ </p>
                            </div>
                        </main>
                        <aside className="col-md-3">
                            {/* <div className="card mb-3">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Have coupon?</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Coupon code" />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>  */}
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>ราคา:</dt>
                                        <dd className="text-right">{price.toFixed(2)} บาท</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>ประหยัด:</dt>
                                        <dd className="text-right">{difference.toFixed(2)} บาท</dd>
                                    </dl>
                                    <hr />
                                    <dl className="dlist-align">
                                        <dt>ราคาสินค้าต้องชำระ :</dt>
                                        <dd className="text-right"><strong>{total.toFixed(2)} บาท</strong></dd>
                                    </dl>
                                    <hr />
                                    <p className="text-center mb-3">
                                        <img src="/assets/images/misc/payments.png" height={26} />
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            <Policy />
        </Layout>
    )
}

export function CartRow({ product, callback, cartid, quantityItem }) {
    const router = useRouter()
    // const [quantity, setQuantity] = useState(quantityItem || 1)

    function handleRemove() {
        callback({ action: "remove", product, cartid })
    }

    function increment() {
        // setQuantity(quantity => quantity + 1)
        callback({ action: "increment", product, cartid })

    }

    function decrement() {
        if (quantityItem > 1) {
            // setQuantity(quantity => quantity - 1)
            callback({ action: "decrement", product, cartid })
        }
    }

    useEffect(() => {

        callback({ action: "init", product: {}, cartid })

    }, [])


    return (
        <>
            <tr>
                <td>
                    <figure className="itemside">
                        <div className="aside">
                            {/* <img src={product.Products.image[0].url} /> */}
                            <Image
                                src={product.image[0].url}
                                alt="Picture of the author"
                                width={70}
                                height={100}
                                quality={50}
                            />
                        </div>
                        <figcaption className="info">
                            <Link href={`/detail/${product.id}`}>
                                <a className="title text-dark">{product.name}</a>
                            </Link>
                            <p className="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p>
                        </figcaption>
                    </figure>
                </td>
                <td>
                    <div className="form-group col-md flex-grow-0">
                        <label>จำนวน</label>
                        <div className="input-group mb-3 input-spinner">
                            <div className="input-group-prepend">
                                <button className="btn btn-light" onClick={decrement} type="button" id="button-minus"> - </button>
                            </div>
                            <input type="text" className="form-control" readOnly value={quantityItem} />
                            <div className="input-group-append">
                                <button className="btn btn-light" onClick={increment} type="button" id="button-plus"> + </button>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="price-wrap">
                        <var className="price"> {numberWithCommas(product.price - (product.price / 100) * product.discount)} บาท</var>
                        <small className="text-muted"><del>{numberWithCommas(product.price)} บาท</del> </small>
                    </div> {/* price-wrap .// */}
                </td>
                <td>
                    <var className="price"> {numberWithCommas((product.price - (product.price / 100) * product.discount) * quantityItem)} บาท</var>
                </td>
                <td className="text-right">
                    <button onClick={handleRemove} className="btn btn-light"> นำออก</button>
                </td>
            </tr>
        </>
    )
}

export function Policy() {
    return (
        <section className="section-name bg padding-y mb-5">
            <div className="container">
                <h6>Payment and refund policy</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>{/* container // */}
        </section>

    )
}
