import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Admin'
import Axois from '../../components/Axios'
import ProductTable from '../../components/Tables/Product'
import ProductModal from '../../components/Modal/Product'

export default function Product() {
    const [products, setProducts] = useState([])
    const [loadding, setLoadding] = useState(false)

    async function getProducts() {
        try {
            setLoadding(true)
            const res = await Axois.get('/product/getproduct')
            setProducts(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadding(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Layout nonavbar={true} title="จัดการสินค้าในระบบ">
            <div className="card">
                <div className="card-body">
                    <WarpperStatus />
                    <ProductModal />
                    <hr />
                    <div className="row mb-3">
                        <div className="col">
                            <button type='button' className='btn btn-primary shadow-sm' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มสินค้าในระบบ</button>
                        </div>
                    </div>
                    <ProductTable products={products} />
                </div>
            </div>
        </Layout>
    )
}

export function WarpperStatus() {

    return (
        <div className="row">
            <div className="col-md-4">
                <article className="card card-body shadow-sm mb-2">
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-success">
                                <i className="fa fa-box white" />
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">สินค้าพร้อมใช้งาน</h5>
                            <p className='text-lg'>20 รายการ</p>
                        </figcaption>
                    </figure> {/* iconbox // */}
                </article> {/* panel-lg.// */}
            </div>{/* col // */}
            <div className="col-md-4">
                <article className="card card-body shadow-sm mb-2">
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-warning">
                                <i className="fa fa-exclamation white" />
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">สินค้าใกล้หมด</h5>
                            <p className='text-lg'>20 รายการ</p>
                        </figcaption>
                    </figure> {/* iconbox // */}
                </article> {/* panel-lg.// */}
            </div>{/* col // */}
            <div className="col-md-4">
                <article className="card card-body shadow-sm mb-2">
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-danger">
                                <i className="fa fa-times-circle white" />
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">สินค้าไม่พร้อมใช้งาน </h5>
                            <p className='text-lg'>20 รายการ</p>
                        </figcaption>
                    </figure> {/* iconbox // */}
                </article> {/* panel-lg.// */}
            </div>{/* col // */}
        </div>

    )
}