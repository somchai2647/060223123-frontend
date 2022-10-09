import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

export default function Product({ product, editmode, callback }) {
    const { register, handleSubmit, errors } = useForm()
    const [loadding, setLoadding] = useState(false)

    const formControl = useRef(null)

    function clickUpload() {
        formControl.current.submit()
    }

    async function onSubmit(dataform) {
        try {
            setLoadding(true)
            const res = await Axios.post('/product/createproduct', dataform)
            console.log(res.data)
            callback(res.data)
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
                            <form onSubmit={handleSubmit(onSubmit)} ref={formControl}>
                                <input type="text" {...register("name")} />
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
