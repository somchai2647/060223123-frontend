import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Admin'
import Axios from '../../components/Axios'
import OrderingCard from '../../components/Card/OrderingCard'

export default function Order({ categorys }) {

    const [orders, setorders] = useState([])

    async function getOrders() {
        try {
            const res = await Axios.get("/order/getOrders")
            const data = await res.data
            if (data) {
                setorders(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Layout categorys={categorys} title={"📦 การสั่งซื้อสินค้า"}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active text-warning" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="true">Pending</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-info" id="shipped-tab" data-toggle="tab" href="#shipped" role="tab" aria-controls="shipped" aria-selected="false">Shipped</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-success" id="success-tab" data-toggle="tab" href="#success" role="tab" aria-controls="success" aria-selected="false">Success</a>
                            </li>  <li className="nav-item">
                                <a className="nav-link text-danger" id="cancel-tab" data-toggle="tab" href="#cancel" role="tab" aria-controls="cancel" aria-selected="false">Cancel</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                                <PendingWarpper orders={orders} status="pending" callback={getOrders} />
                            </div>
                            <div className="tab-pane fade" id="shipped" role="tabpanel" aria-labelledby="shipped-tab">
                                <PendingWarpper orders={orders} status="shipped" callback={getOrders} />
                            </div>
                            <div className="tab-pane fade" id="success" role="tabpanel" aria-labelledby="success-tab">
                                <PendingWarpper orders={orders} status="success" callback={getOrders} />
                            </div>
                            <div className="tab-pane fade" id="cancel" role="tabpanel" aria-labelledby="cancel-tab">
                                <PendingWarpper orders={orders} status="cancel" callback={getOrders} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


function PendingWarpper({ orders = [], status, callback }) {

    return (
        <div>
            <div className='mt-4'>
                {orders?.filter(item => item.status === status).map((item) => (
                    <OrderingCard key={item.id} order={item} callback={callback} disabled={status === "pending"} />
                ))}
            </div>
        </div>
    )
}