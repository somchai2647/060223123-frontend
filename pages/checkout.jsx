import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import SectionPage from '../components/SectionPage'
import ReviewCart from '../components/Card/ReviewCart'
import Axios from '../components/Axios';

export default function Checkout(props) {
    const router = useRouter()

    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)

    async function getCart() {
        try {
            setLoading(true)
            const res = await Axios.get(`/cart/getcart/${props.user.username}`)
            const data = await res.data
            if (data) {
                setCart(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (props.user) {
            getCart()
        }
    }, [router.isReady, props])


    return (
        <Layout categorys={props.categorys}>
            <SectionPage title="🛒 เช็คเอาท์" />
            <div className="container mt-4">
                <div className="row">
                    <main className="col-md-8">
                        <ReviewCart carts={cart} />
                        <DeliveryInfo />
                        <Accordion />
                    </main>
                    <aside className="col-md-4">
                        <CheckoutCard />
                    </aside>
                </div>
            </div>

        </Layout>
    )
}

export function ContactInfo() {

    return (
        <article className="card mb-4">
            <div className="card-body">
                <h4 className="card-title mb-4">Contact info</h4>
                <form>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label>Frst name</label>
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label>Last name</label>
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label>Phone</label>
                            <input type="text" defaultValue={+998} className="form-control" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label>Email</label>
                            <input type="email" placeholder="example@gmail.com" className="form-control" />
                        </div>
                    </div>
                    {/* row.// */}
                </form>
            </div>
            {/* card-body.// */}
        </article>

    )
}

export function DeliveryInfo() {

    return (
        <article className="card mb-4">
            <div className="card-body">
                <h4 className="card-title mb-4">Delivery info</h4>
                <form>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label className="js-check box active">
                                <input type="radio" name="dostavka" defaultValue="option1" defaultChecked />
                                <h6 className="title">การส่งแบบ Delivery</h6>
                                <p className="text-muted">เราจะจัดส่งโดย บริทัษขนส่งที่ชำนาญการ</p>
                            </label>
                            {/* js-check.// */}
                        </div>
                        {/* <div className="form-group col-sm-6 disabled">
                            <label className="js-check box">
                                <input type="radio" name="dostavka" defaultValue="option1" disabled />
                                <h6 className="title">Pick-up</h6>
                                <p className="text-muted">
                                    Come to our office to somewhere
                                </p>
                            </label>
                        </div> */}
                    </div>
                    {/* row.// */}
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label>City*</label>
                            <select className="form-control">
                                <option value>Tashkent</option>
                                <option value>Buxoro</option>
                                <option value>Samarqand</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-6">
                            <label>Area*</label>
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>
                        <div className="form-group col-sm-8">
                            <label>Street*</label>
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>Building</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>House</label>
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>Postal code</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>Zip</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    {/* row.// */}
                </form>
            </div>
            {/* card-body.// */}
        </article>

    )
}

export function Accordion() {
    return (
        <article className="accordion" id="accordion_pay">
            <div className="card">
                <header className="card-header">
                    <img src="/assets/images/misc/payment-paypal.png" className="float-right" height={24} />
                    <label className="form-check collapsed" data-toggle="collapse" data-target="#pay_paynet">
                        <input className="form-check-input" name="payment-option" defaultChecked type="radio" defaultValue="option2" />
                        <h6 className="form-check-label">Paypal</h6>
                    </label>
                </header>
                <div id="pay_paynet" className="collapse show" data-parent="#accordion_pay">
                    <div className="card-body">
                        <p className="text-center text-muted">
                            เชื่อมต่อบัญชี PayPal ของคุณและใช้เพื่อชำระค่าใช้จ่าย คุณจะถูกเปลี่ยนเส้นทางไปที่ PayPal เพื่อเพิ่มข้อมูลสำหรับการเรียกเก็บเงินของคุณ
                        </p>
                        <p className="text-center">
                            <a href="#"><img src="/assets/images/misc/btn-paypal.png" height={32} /></a>
                            <br /><br />
                        </p>
                    </div>
                    {/* card body .// */}
                </div>
                {/* collapse .// */}
            </div>
            {/* card.// */}
            <div className="card">
                <header className="card-header">
                    <img src="/assets/images/misc/payment-card.png" className="float-right" height={24} />
                    <label className="form-check" data-toggle="collapse" data-target="#pay_payme">
                        <input className="form-check-input" name="payment-option" type="radio" defaultValue="option2" />
                        <h6 className="form-check-label">Credit Card</h6>
                    </label>
                </header>
                <div id="pay_payme" className="collapse" data-parent="#accordion_pay">
                    <div className="card-body">
                        <form className="form-inline">
                            <input type="text" className="form-control mr-2" placeholder="xxxx-xxxx-xxxx-xxxx" />
                            <input type="text" className="form-control mr-2" style={{ width: 100 }} placeholder="dd/yy" />
                            <input type="number" maxLength={3} className="form-control mr-2" style={{ width: 100 }} placeholder="cvc" />
                            <button className="btn btn btn-success">Button</button>
                        </form>
                    </div>
                    {/* card body .// */}
                </div>
                {/* collapse .// */}
            </div>
            {/* card.// */}
            <div className="card">
                <header className="card-header">
                    <img src="/assets/images/misc/payment-scb.png" className="float-right" height={24} />
                    <label className="form-check" data-toggle="collapse" data-target="#pay_card">
                        <input className="form-check-input" name="payment-option" type="radio" defaultValue="option1" />
                        <h6 className="form-check-label">Bank Transfer</h6>
                    </label>
                </header>
                <div id="pay_card" className="collapse" data-parent="#accordion_pay">
                    <div className="card-body">
                        <p className="text-muted">Some instructions about how to pay</p>
                        <p>
                            Bank of America, Account number: 12345678912346 <br />
                            IBAN: 12345, SWIFT: 987654
                        </p>
                    </div>
                    {/* card body .// */}
                </div>
                {/* collapse .// */}
            </div>
            {/* card.// */}
        </article>

    )
}

export function CheckoutCard() {

    return (

        <div className="card shadow">
            <div className="card-body">
                <h4 className="mb-3">Overview</h4>
                <dl className="dlist-align">
                    <dt className="text-muted">Delivery:</dt>
                    <dd>Pick-up</dd>
                </dl>
                <dl className="dlist-align">
                    <dt className="text-muted">Delivery type:</dt>
                    <dd>Standart</dd>
                </dl>
                <dl className="dlist-align">
                    <dt className="text-muted">Payment method:</dt>
                    <dd>Cash</dd>
                </dl>
                <hr />
                <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="h5">$300.50</dd>
                </dl>
                <hr />
                <p className="small mb-3 text-muted">
                    By clicking you are agree with terms of condition
                </p>
                <a href="#" className="btn btn-primary btn-block"> Button </a>
            </div>
            {/* card-body.// */}
        </div>
    )
}