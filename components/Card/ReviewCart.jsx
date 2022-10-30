import React from 'react'
import Image from 'next/image';

export default function ReviewCart({ carts }) {
    return (
        <article className="card mb-4">
            <div className="card-body">
                <h4 className="card-title mb-4">สินค้าในตะกร้า</h4>
                <div className="row">
                    {carts.map((item) => {
                        const { name, price, discount, image } = item.Products
                        const total = price - (price * discount / 100)
                        return (
                            <div className="col-md-6" key={item.id}>
                                <figure className="itemside  mb-4">
                                    <div className="aside">
                                        {/* <img src="../images/items/1.jpg" className="border img-sm" /> */}
                                        <Image
                                            src={image[0]?.url}
                                            width={80}
                                            height={100}
                                            
                                        />
                                    </div>
                                    <figcaption className="info">
                                        <p>{name}</p>
                                        <span className="text-muted">{item.quantity}x = {total * item.quantity} </span>
                                    </figcaption>
                                </figure>
                            </div>
                        )
                    })}
                </div>
            </div>
        </article>
    )
}
