import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Axios from '../Axios'

export default function Product({ product, editmode, callback }) {
    const { register, handleSubmit, errors } = useForm()
    const [loadding, setLoadding] = useState(false)
    const [categorys, setCategorys] = useState([])

    const formControl = useRef(null)

    function clickUpload() {
        formControl.current.click()
    }

    async function loadCategory() {
        try {
            const res = await Axios.get(`/category/getcategory`)
            const data = res.data
            setCategorys(data)
        } catch (error) {
            console.error(error)
        }
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

    useEffect(() => {
        loadCategory()
    }, [])


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
                                        <label for="inputName">ชื่อสินค้า</label>
                                        <input type="text" {...register("name")} id="inputName" className="form-control" />
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                        <label for="inputName">ประเภทสินค้า</label>
                                        <select id="inputState" defaultValue={""} class="form-control">
                                            <option value="" disabled>เลือกประเภทสินค้า</option>
                                            {categorys?.map((item) => (
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
