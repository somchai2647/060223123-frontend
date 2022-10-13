import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Axios from '../Axios'
import useBook from '../../hooks/useBook'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    discount: yup.number().required(),
    cost: yup.number().required(),
    desc: yup.string().required(),
    category: yup.string().required(),
    author: yup.string().required(),
    publisher: yup.string().required(),
    amountpage: yup.number().required(),
    stock: yup.number().required(),
    stockAlm: yup.number().required(),
});

export default function Product({ product, editmode, callback }) {
    const [categorys, authors, publishers] = useBook()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const [loadding, setLoadding] = useState(false)

    const formControl = useRef(null)
    const closeModal = useRef(null)

    function clickUpload() {
        formControl.current.click()
    }

    async function onSubmit(dataform) {
        try {
            setLoadding(true)
            console.log(dataform)
            const res = await Axios.post('/product/createproduct', dataform)
            if (res.data) {
                callback(res.data)
                reset()
                closeModal.current.click()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadding(false)
        }
    }

    useEffect(() => {
        console.log("ERROR", errors)
    }, [errors])



    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">เพิ่มสินค้าในระบบ</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={closeModal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputName">ชื่อสินค้า</label>
                                        <input type="text" {...register("name")} id="inputName" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDetail">รายละเอียดสินค้า</label>
                                        <textarea className="form-control" {...register("desc")} id="inputDetail" rows="3"></textarea>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputCategory">ประเภทสินค้า</label>
                                        <select id="inputCategory" defaultValue={""}  {...register("category", { required: true })} className="form-control">
                                            <option value="" disabled>เลือกประเภทสินค้า</option>
                                            {categorys?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAuthor">ชื่อผู้เขียน</label>
                                        <select id="inputAuthor" defaultValue={""}  {...register("author", { required: true })} className="form-control">
                                            <option value="" disabled>เลือกชื่อผู้เขียน</option>
                                            {authors?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAuthor">ชื่อสำนักพิมพ์</label>
                                        <select id="inputAuthor" {...register("publisher", { required: true })} defaultValue={""} className="form-control">
                                            <option value="" disabled>เลือกสำนักพิมพ์</option>
                                            {publishers?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAmountPage">จำนวนหน้า</label>
                                        <input type="number" {...register("amountpage")} min={1} id="inputAmountPage" className="form-control" />
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputStock">จำนวนคงเหลือ</label>
                                        <input type="number" {...register("stock")} min={1} id="inputStock" className="form-control" />
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputstockAlm">จำนวนแจ้งเตือนสำหรับคงเหลือ</label>
                                        <input type="number" {...register("stockAlm")} min={1} id="inputstockAlm" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputCost">ราคาต้นทุนสินค้า</label>
                                        <input type="number" {...register("cost")} step={0.01} min={1} id="inputCost" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputPrice">ราคาขายสินค้า</label>
                                        <input type="number" {...register("price")} step={0.01} min={1} id="inputPrice" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputDiscout">ลดราคาสินค้า %</label>
                                        <input type="number" {...register("discount")} min={1} id="inputDiscout" className="form-control" />
                                    </div>
                                </div>
                                <button type="submit" className="d-none" ref={formControl} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={clickUpload} className="btn btn-primary">บันทึกข้อมูล</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิด</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
