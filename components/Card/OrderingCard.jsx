import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Axios from '../Axios'
import useSweetAlert from '../../hooks/useSweetAlert'
import "moment/locale/th"

export default function OrderingCard({ order, disabled, callback }) {

    const IconPayment = {
        "Credit Card": <span className="text-success">
            <i className="fas fa-credit-card mr-2" aria-hidden="true"></i>
            Credit  **** 4216
        </span>,
        "Paypal": <span className="text-success b">
            Paypal
        </span>,
        "Bank": <span className="text-success">
            <i className="fas fa-university mr-2" aria-hidden="true"></i>
            Bank
        </span>
    }

    const alert = useSweetAlert()

    const [total, setTotal] = useState(0)

    async function handleSubmitProduct(status) {
        try {
            const payload = {
                status: status
            }
            const res = await Axios.put(`/order/updateOrder/${order.id}`, payload)
            const data = await res.data

            if (data) {
                if (status === "shipped") {
                    alert.success("อัพเดทสถานะสำเร็จ", "สถานะของคุณได้ถูกอัพเดทเป็น ส่งสินค้า เรียบร้อยแล้ว")
                } else {
                    alert.success("อัพเดทสถานะสำเร็จ", "สถานะของคุณได้ถูกอัพเดทเป็น ยกเลิกสินค้า เรียบร้อยแล้ว")
                }
                callback(true)
            }

        } catch (error) {
            console.log(error)
            alert.error("เกิดข้อผิดพลาด", "ไม่สามารถอัพเดทสถานะได้")
        }
    }

    function calculateTotalPrice() {
        let _total = 0
        order.OrderItem.map((item) => {

            const { name, image, price, discount } = item.Products
            const quantity = item.quantity
            _total += (price - (price * discount / 100)) * quantity
        })
        setTotal(_total)
    }

    useEffect(() => {
        calculateTotalPrice()
    }, [])


    return (
        <div>
            <article className="card order-group shadow-sm mt-4">
                <header className="card-header">
                    <b className="d-inline-block mr-3">Transaction ID: {order.id}</b>
                    <span>วันเวลา: {moment(order.createdAt).format("LLL")}</span>

                    {disabled &&
                        <div className='d-flex mt-2'>
                            <button onClick={() => handleSubmitProduct("shipped")} className='btn btn-outline-success mr-2'>ยืนยันการสั่งซื้อ</button>
                            <button onClick={() => handleSubmitProduct("cancel")} className='btn btn-outline-danger mr-2'>ยกเลิกรายการซื้อ</button>
                        </div>
                    }
                </header>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <h6 className="text-muted">การชำระ</h6>
                            {IconPayment[order.paymethod]} {order.paymethod === "Paypal" && <span className='text-success'>{order.User.email}</span>}
                            <p>
                                ค่าขนส่ง:  0 บาท <br />
                                <span className="b h4">Total:  {total.toFixed(2)} บาท</span>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted">ติดต่อ</h6>
                            <p>{order.User.fname}  {order.User.lname}<br /> {order.User.tel} <br /> {order.User.email}</p>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted">ที่อยู่จัดส่ง</h6>
                            <p> {order.User.address.replaceAll("|", " ")} </p>
                        </div>
                    </div> {/* row.// */}
                    <hr />
                    <ImageWarpper OrderItem={order.OrderItem} />
                </div>
            </article>

        </div>
    )
}

export function ImageWarpper({ OrderItem }) {
    return (
        <ul className="row">
            {OrderItem?.map(item => {
                const { name, image, price, discount } = item.Products
                const quantity = item.quantity
                const total = (price - (price * discount / 100)) * quantity
                return (
                    <li className="col-md-4" key={item.id}>
                        <figure className="itemside  mb-3">
                            <div className="aside">
                                <Image
                                    src={image[0].url}
                                    alt={name}
                                    quality={50}
                                    height={100}
                                    width={70}
                                    className="img-sm border"
                                />
                            </div>
                            <figcaption className="info align-self-center">
                                <p className="title">{name}</p>
                                <span className="text-muted">{total}  x {quantity}</span>
                            </figcaption>
                        </figure>
                    </li>
                )
            })}
        </ul>
    )
}