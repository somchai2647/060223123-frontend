import React from 'react'
import moment from 'moment'
import "moment/locale/th"
import Image from 'next/image';

export default function OrderingCard({ order }) {
    return (
        <div>
            <article className="card order-group mt-4">
                <header className="card-header">
                    <b className="d-inline-block mr-3">Transaction ID: {order.id}</b>
                    <span>วันเวลา: {moment(order.createdAt).format("LLL")}</span>
                </header>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <h6 className="text-muted">การชำระ</h6>
                            <span className="text-success">
                                <i className="fab fa-lg fa-cc-visa" />
                                Visa  **** 4216
                            </span>
                            <p>Subtotal: $356 <br />
                                Shipping fee:  $56 <br />
                                <span className="b">Total:  $456 </span>
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
                </div> {/* card-body .// */}
            </article>

        </div>
    )
}

export function ImageWarpper({ OrderItem }) {
    return (
        <ul className="row">
            {OrderItem?.map(item => {
                const { name, image, price } = item.Products
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
                                <span className="text-muted">$145 </span>
                            </figcaption>
                        </figure>
                    </li>
                )
            })}
        </ul>
    )
}