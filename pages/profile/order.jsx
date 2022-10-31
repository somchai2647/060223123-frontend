import Axios from '../../components/Axios'
import Layout from '../../components/Layout'
import React, { useEffect, useState } from 'react'
import SectionPage from '../../components/SectionPage'
import UserMenu from '../../components/Card/UserMenu'
import OrderingCard from '../../components/Card/OrderingCard'

export default function OrderPage({ categorys }) {

    const [orders, setorders] = useState([])
    const [loading, setLoading] = useState(false)

    async function getOrders() {
        try {
            setLoading(true)
            const res = await Axios.get("/order/getMyOrder")
            const data = await res.data
            if (data) {
                setorders(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    function getCout(data, status) {
        return data.filter(item => item.status === status).length
    }

    return (
        <Layout categorys={categorys}>
            <SectionPage title={"📦 รายการสั่งซื้อของฉัน"} />
            <section className="section-content">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active text-warning" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="true">Pending <b>{getCout(orders, "pending")}</b></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-info" id="shipped-tab" data-toggle="tab" href="#shipped" role="tab" aria-controls="shipped" aria-selected="false">Shipped <b>{getCout(orders, "shipped")}</b></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-success" id="success-tab" data-toggle="tab" href="#success" role="tab" aria-controls="success" aria-selected="false">Success <b>{getCout(orders, "success")}</b></a>
                                        </li>  <li className="nav-item">
                                            <a className="nav-link text-danger" id="cancel-tab" data-toggle="tab" href="#cancel" role="tab" aria-controls="cancel" aria-selected="false">Cancel <b>{getCout(orders, "cancel")}</b></a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                                            {loading ? <div className="text-center mt-4"><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div> : <PendingWarpper orders={orders} status="pending" callback={getOrders} />}
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
                    </div>
                </div>
            </section>
        </Layout>
    )
}

function PendingWarpper({ orders = [], status, callback }) {

    return (
        <div>
            <div className='mt-4'>
                {orders?.filter(item => item.status === status).map((item) => (
                    <OrderingCard key={item.id} order={item} callback={callback} isMember disabled={true} />
                ))}
            </div>
        </div>
    )
}