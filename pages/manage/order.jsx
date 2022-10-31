import React from 'react'
import Layout from '../../components/Layout/Admin'
import OrderingCard from '../../components/Card/OrderingCard';
import Axios from '../../components/Axios';

export default function Order({ categorys, orders }) {
    return (
        <Layout categorys={categorys} title={"📦 การสั่งซื้อสินค้า"}>
            <div className="card">
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
                                <PendingWarpper orders={orders} status="pending" />
                            </div>
                            <div className="tab-pane fade" id="shipped" role="tabpanel" aria-labelledby="shipped-tab">
                                <PendingWarpper orders={orders} status="shipped" />
                            </div>
                            <div className="tab-pane fade" id="success" role="tabpanel" aria-labelledby="success-tab">
                                <PendingWarpper orders={orders} status="success" />
                            </div>
                            <div className="tab-pane fade" id="cancel" role="tabpanel" aria-labelledby="cancel-tab">
                                <PendingWarpper orders={orders} status="cancel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


function PendingWarpper({ orders = [], status }) {

    return (
        <div>
            <div className='mt-4'>
                {orders?.filter(item => item.status === status).map((item) => (
                    <OrderingCard key={item.id} order={item} />
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await Axios.get("/order/getOrders")
    const orders = await res.data

    return {
        props: {
            orders
        }
    }
}
