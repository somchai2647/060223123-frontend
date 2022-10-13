import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Axios from '../Axios'
import useBook from '../../hooks/useBook';

export default function Product({ product, editmode, callback }) {
    const [categorys, authors, publishers] = useBook()

    const { register, handleSubmit, errors } = useForm()
    const [loadding, setLoadding] = useState(false)

    const formControl = useRef(null)

    function clickUpload() {
        formControl.current.click()
    }


    async function onSubmit(dataform) {
        try {
            setLoadding(true)
            console.log(dataform)
            // const res = await Axios.post('/product/createproduct', dataform)
            // console.log(res.data)
            // callback(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadding(false)
        }
    }


    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">เพิ่มสินค้าในระบบ</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputCategory">ประเภทสินค้า</label>
                                        <select id="inputCategory" defaultValue={""} className="form-control">
                                            <option value="" disabled>เลือกประเภทสินค้า</option>
                                            {categorys?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAuthor">ชื่อผู้เขียน</label>
                                        <select id="inputAuthor" defaultValue={""} className="form-control">
                                            <option value="" disabled>เลือกชื่อผู้เขียน</option>
                                            {authors?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAuthor">ชื่อสำนักพิมพ์</label>
                                        <select id="inputAuthor" defaultValue={""} className="form-control">
                                            <option value="" disabled>เลือกสำนักพิมพ์</option>
                                            {publishers?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
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
