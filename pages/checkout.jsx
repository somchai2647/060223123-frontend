import * as yup from "yup"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import SectionPage from '../components/SectionPage'
import ReviewCart from '../components/Card/ReviewCart'
import Axios from '../components/Axios'
import { useForm } from 'react-hook-form'
import SVGLoading from '../components/SVGLoading'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    house: yup.string().required("กรุณากรอกบ้านเลขที่"),
    road: yup.string().required("กรุณากรอกถนน"),
    subdistrict: yup.string().required("กรุณากรอกตำบล"),
    district: yup.string().required("กรุณากรอกอำเภอ"),
    province: yup.string().required("กรุณากรอกจังหวัด"),
    zipcode: yup.string().required("กรุณากรอกรหัสไปรษณีย์")
})


export default function Checkout(props) {
    const router = useRouter()

    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState("")
    const [myAddress, setMyAddress] = useState("")
    const [total, setTotal] = useState(0)
    const [method, setMethod] = useState("Paypal")

    async function getCart() {
        try {
            setLoading(true)
            const res = await Axios.get(`/cart/getcart/${props.user.username}`)
            const data = await res.data
            if (data && data.length > 0) {
                setCart(data)
                let total = 0
                data.map((cart) => {
                    const quantity = cart.quantity
                    const { price, discount } = cart.Products
                    const subtotal = price - quantity * (discount / 100 * price)
                    total += subtotal
                })
                setTotal(total)
            } else {
                router.push("/cart")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function checkout() {
        try {
            setLoading(true)
            const payload = {
                paymethod: method,
                address: address,
            }
            const res = await Axios.post(`/order/createCheckout`, payload)
            const data = await res.data
            if (data) {
                router.push('/cart')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    function handleInputUpdate(value) {
        setAddress(address => value)
    }

    function handlePaymentMethod(value) {
        setMethod(method => value)
    }

    useEffect(() => {
        if (props.user) {
            getCart()
            setMyAddress(props.user.address)
        }
    }, [router.isReady, props])


    return (
        <Layout categorys={props.categorys}>
            <SectionPage title="🛒 เช็คเอาท์" />
            <div className="container mt-4">
                <div className="row">
                    <main className="col-md-8">
                        {loading && <SVGLoading />}
                        <ReviewCart carts={cart} />
                        <DeliveryInfo inputupdate={handleInputUpdate} address={myAddress} />
                        <Accordion method={handlePaymentMethod} />
                    </main>
                    <aside className="col-md-4">
                        <CheckoutCard loading={loading} method={method} total={total} onCheckout={checkout} />
                    </aside>
                </div>
            </div>
        </Layout>
    )
}


export function DeliveryInfo({ inputupdate, address = "" }) {

    const { register, watch, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const watchAllFields = watch()

    useEffect(() => {
        const { province, district, subdistrict, road, house, zipcode } = watchAllFields
        const address = `${house}|${road}|${subdistrict}|${district}|${province}|${zipcode}`
        inputupdate(address)
    }, [watchAllFields])

    useEffect(() => {
        if (address) {
            const _address = address.split("|")
            setValue("house", _address[0])
            setValue("road", _address[1])
            setValue("subdistrict", _address[2])
            setValue("district", _address[3])
            setValue("province", _address[4])
            setValue("zipcode", _address[5])
        }
    }, [address])



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
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label>จังหวัด*</label>
                            <input type="text" {...register("province", { required: true })} placeholder="จังหวัด" className="form-control" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label>อำเภอ*</label>
                            <input type="text" {...register("district", { required: true })} placeholder="อำเภอ" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>ตำบล*</label>
                            <input type="text" {...register("subdistrict", { required: true })} className="form-control" />
                        </div>
                        <div className="form-group col-sm-8">
                            <label>ถนนและซ้อย</label>
                            <input type="text" {...register("road", { required: true })} placeholder="ถนนและซ้อย" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>บ้านเลขที่*</label>
                            <input type="text" maxLength={5} {...register("house", { required: true })} placeholder="บ้านเลขที่" className="form-control" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>รหัสไปรษณีย์*</label>
                            <input type="text" maxLength={5} {...register("zipcode", { required: true })} className="form-control" />
                        </div>
                    </div>
                    {/* row.// */}
                </form>
            </div>
            {/* card-body.// */}
        </article>

    )
}

export function Accordion({ method }) {

    function handleInputUpdate(value) {
        method(value)
    }

    return (
        <article className="accordion" id="accordion_pay">
            <div className="card">
                <header className="card-header" >
                    <img src="/assets/images/misc/payment-paypal.png" className="float-right" height={24} />
                    <label className="form-check collapsed" data-toggle="collapse" data-target="#pay_paynet">
                        <input className="form-check-input" name="payment-option" onClick={() => handleInputUpdate("Paypay")} defaultChecked type="radio" defaultValue="option2" />
                        <h6 className="form-check-label">Paypal</h6>
                    </label>
                </header>
                <div id="pay_paynet" className="collapse show" data-parent="#accordion_pay">
                    <div className="card-body">
                        <p className="text-center text-muted">
                            เชื่อมต่อบัญชี PayPal ของคุณและใช้เพื่อชำระค่าใช้จ่าย คุณจะถูกเปลี่ยนเส้นทางไปที่ PayPal เพื่อเพิ่มข้อมูลสำหรับการเรียกเก็บเงินของคุณ
                        </p>
                        <p className="text-center">
                            <img src="/assets/images/misc/btn-paypal.png" height={32} />
                            <br /><br />
                        </p>
                    </div>
                    {/* card body .// */}
                </div>
                {/* collapse .// */}
            </div>
            {/* card.// */}
            <div className="card">
                <header className="card-header" onClick={() => handleInputUpdate("Credit Card")}>
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
                            <button className="btn btn btn-success"> ตรวจสอบ </button>
                        </form>
                    </div>
                    {/* card body .// */}
                </div>
                {/* collapse .// */}
            </div>
            {/* card.// */}
            <div className="card">
                <header className="card-header" onClick={() => handleInputUpdate("Bank")}>
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

export function CheckoutCard({ method = "Paypal", total = 0, onCheckout, loading }) {

    function handleCheckout() {
        onCheckout(true)
    }

    return (

        <div className="card shadow">
            <div className="card-body">
                <h4 className="mb-3">ภาพรวม</h4>
                <dl className="dlist-align">
                    <dt className="text-muted">Delivery:</dt>
                    <dd>Delivery</dd>
                </dl>
                <dl className="dlist-align">
                    <dt className="text-muted">Delivery type:</dt>
                    <dd>Standart</dd>
                </dl>
                <dl className="dlist-align">
                    <dt className="text-muted">Payment method:</dt>
                    <dd>{method}</dd>
                </dl>
                <hr />
                <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="h5">{total.toFixed(2)} บาท</dd>
                </dl>
                <hr />
                <p className="small mb-3 text-muted">
                    การคลิกแสดงว่าคุณยอมรับข้อกำหนดและเงื่อนไข
                </p>
                <button onClick={handleCheckout} disabled={loading} className="btn btn-primary btn-block"> ชำระเงิน </button>
            </div>
            {/* card-body.// */}
        </div>
    )
}