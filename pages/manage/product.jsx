import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../components/Layout/Admin'
import Axois from '../../components/Axios'
import ProductTable from '../../components/Tables/Product'
import ProductModal from '../../components/Modal/Product'

export default function Product() {
    const [products, setProducts] = useState([])
    const [loadding, setLoadding] = useState(false)
    const [editMode, setEditMode] = useState(null)
    const ModalBtn = useRef(null)

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

    function handleEditMode() {
        setEditMode(null)
    }

    function handleCallback(data) {
        let item
        switch (data.mode) {
            case "add":
                setProducts([...products, data.data])
                break
            case "edit":
                item = products.find(item => item?.id === data?.item.id)
                setEditMode(item)
                ModalBtn.current.click()
                break
            case "update":
                item = products.findIndex(item => item?.id === data?.data.id)
                console.log("=>", item)
                products[item] = data.data
                setProducts([...products])
                break
            case "delete":
                item = products.find(item => item?.id === data?.item.id)
            default:
                break
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
                    <ProductModal editmode={editMode} callback={handleCallback} />
                    <hr />
                    <div className="row mb-3">
                        <div className="col">
                            <button type='button' onClick={handleEditMode} className='btn btn-primary shadow-sm' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มสินค้าในระบบ</button>
                            <button type='button' ref={ModalBtn} className='btn btn-primary shadow-sm d-none' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มสินค้าในระบบ</button>
                        </div>
                    </div>
                    <ProductTable products={products} callback={handleCallback} />
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