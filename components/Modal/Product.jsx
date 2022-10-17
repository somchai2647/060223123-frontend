import * as yup from "yup"
import Axios from '../Axios'
import { useForm, useFieldArray } from 'react-hook-form'
import useBook from '../../hooks/useBook'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState, useEffect, useRef } from 'react'
import ErrorLabel from '../ErrorLabel';

const schema = yup.object().shape({
    name: yup.string().required("กรุณากรอกชื่อสินค้า"),
    price: yup.number().required("กรุณากรอกราคาสินค้า").positive("กรุณากรอกราคาสินค้าให้มากกว่า 0"),
    discount: yup.number().max(100, "ส่วนลดสูงสุด 100%"),
    cost: yup.number().required("กรุณากรอกราคาทุนสินค้า").positive("กรุณากรอกราคาทุนสินค้าให้มากกว่า 0"),
    desc: yup.string(),
    category: yup.string().required("กรุณาเลือกหมวดหมู่สินค้า"),
    author: yup.string().required("กรุณาเลือกผู้แต่ง"),
    publisher: yup.string().required("กรุณาเลือกสำนักพิมพ์"),
    amountpage: yup.number().required("กรุณากรอกจำนวนหน้า").positive("กรุณากรอกจำนวนหน้าให้มากกว่า 0"),
    stock: yup.number().required("กรุณากรอกจำนวนสินค้า").positive("กรุณากรอกจำนวนสินค้าให้มากกว่า 0"),
    stockAlm: yup.number().required("กรุณากรอกจำนวนเตือนสินค้า").positive("กรุณากรอกจำนวนสินค้าเตือนให้มากกว่า 0"),
    isRecommend: yup.boolean(),
});

export default function Product({ editmode, callback }) {
    const [categorys, authors, publishers] = useBook()

    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm({
        resolver: yupResolver(schema)
    })

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ control, name: "imagebook" })

    const [loadding, setLoadding] = useState(false)

    const formControl = useRef(null)
    const btnControl = useRef(null)

    function handleAppend() {
        append({ url: "" })
    }

    function clickUpload() {
        formControl.current.click()
    }

    function closeModal() {
        btnControl.current.click()
    }

    async function onSubmit(dataform) {
        try {
            setLoadding(true)
            console.log(dataform)
            const res = editmode ? await Axios.put(`/product/updateProduct/${editmode.id}`, dataform) : await Axios.post('/product/createproduct', dataform)
            if (res.data) {
                callback({
                    mode: editmode ? "update" : "add",
                    data: res.data,
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            // reset()
        }
        setLoadding(false)
        // closeModal()
    }

    useEffect(() => {
        reset()
        if (editmode) {
            setValue('name', editmode.name)
            setValue('price', editmode.price)
            setValue('discount', editmode.discount)
            setValue('cost', editmode.cost)
            setValue('desc', editmode.desc)
            setValue('category', editmode?.category?.id)
            setValue('author', editmode?.author?.id)
            setValue('publisher', editmode?.publisher?.id)
            setValue('amountpage', editmode.amountpage)
            setValue('stock', editmode.stock)
            setValue('stockAlm', editmode.stockAlm)
            setValue('isRecommend', editmode.isRecommend)
        }
    }, [editmode])


    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel"> {editmode ? "แก้ไขสินค้าในระบบ" : "เพิ่มสินค้าในระบบ"}</h5>
                            <button type="button" disabled={loadding} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-row">
                                    <div className="form-group pl-2">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input"  {...register("isRecommend", { value: false })} id="recommandSwitch" />
                                            <label className="custom-control-label" htmlFor="recommandSwitch">⭐ จัดอยู่ในหมวดหมู่แนะนำ</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputName">ชื่อสินค้า <span className='text-danger'>*</span></label>
                                        <input type="text" {...register("name")} id="inputName" className="form-control" autoFocus />
                                        {errors.name && <ErrorLabel text={errors.name.message} />}
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDetail">รายละเอียดสินค้า</label>
                                        <textarea className="form-control" {...register("desc")} id="inputDetail" rows="3"></textarea>
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputCategory">ประเภทสินค้า <span className='text-danger'>*</span></label>
                                        <select id="inputCategory" defaultValue={""}  {...register("category", { required: true })} className="form-control">
                                            <option value="" disabled>เลือกประเภทสินค้า</option>
                                            {categorys?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                        {errors.category && <ErrorLabel text={errors.category.message} />}
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAuthor">ชื่อผู้เขียน <span className='text-danger'>*</span></label>
                                        <select id="inputAuthor" defaultValue={""}  {...register("author", { required: true })} className="form-control">
                                            <option value="" disabled>เลือกชื่อผู้เขียน</option>
                                            {authors?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                        {errors.author && <ErrorLabel text={errors.author.message} />}
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAuthor">ชื่อสำนักพิมพ์ <span className='text-danger'>*</span></label>
                                        <select id="inputAuthor" {...register("publisher", { required: true })} defaultValue={""} className="form-control">
                                            <option value="" disabled>เลือกสำนักพิมพ์</option>
                                            {publishers?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                        {errors.publisher && <ErrorLabel text={errors.publisher.message} />}
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputAmountPage">จำนวนหน้า <span className='text-danger'>*</span></label>
                                        <input type="number" {...register("amountpage")} min={1} id="inputAmountPage" className="form-control" />
                                        {errors.amountpage && <ErrorLabel text={errors.amountpage.message} />}
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputStock">จำนวนคงเหลือ <span className='text-danger'>*</span></label>
                                        <input type="number" {...register("stock")} min={1} id="inputStock" className="form-control" />
                                        {errors.stock && <ErrorLabel text={errors.stock.message} />}
                                    </div>
                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="inputstockAlm">จำนวนแจ้งเตือนสำหรับคงเหลือ</label>
                                        <input type="number" {...register("stockAlm")} min={1} id="inputstockAlm" className="form-control" />
                                        {errors.stockAlm && <ErrorLabel text={errors.stockAlm.message} />}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputCost">ราคาต้นทุนสินค้า <span className='text-danger'>*</span></label>
                                        <input type="number" {...register("cost")} step={0.01} min={1} id="inputCost" className="form-control" />
                                        {errors.cost && <ErrorLabel text={errors.cost.message} />}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputPrice">ราคาขายสินค้า <span className='text-danger'>*</span></label>
                                        <input type="number" {...register("price")} step={0.01} min={1} id="inputPrice" className="form-control" />
                                        {errors.price && <ErrorLabel text={errors.price.message} />}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputDiscout">ลดราคาสินค้า %</label>
                                        <input type="number" {...register("discount")} min={0} id="inputDiscout" className="form-control" />
                                        {errors.discount && <ErrorLabel text={errors.discount.message} />}
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <button className="btn btn-primary btn-sm" onClick={handleAppend} type="button"><i className="fas fa-plus-circle"></i> เพิ่มภาพประกอบ</button>
                                    </div>
                                    <div className="form-group col-12">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">หน้าปกหนังสือ</span>
                                            </div>
                                            <input type="text" className="form-control" {...register("cover")} placeholder="URL: http://" aria-label="URL: http://" aria-describedby="button-addon2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    {fields.map((item, index) => (
                                        <div className="form-group col-12" key={item.id}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">ภาพประกอบ</span>
                                                </div>
                                                <input type="text" className="form-control" {...register(`imagebook.${index}.url`)} placeholder="URL: http://" aria-label="URL: http://" aria-describedby="button-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-danger" onClick={() => remove(index)} type="button" id="button-addon2"><i className="fas fa-trash"></i> นำออก</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" className="d-none" ref={formControl} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={clickUpload} className="btn btn-primary" disabled={loadding}><i className="fas fa-save mr-1"></i> {loadding ? "กำลังบันทึก..." : "บันทึก"}</button>
                            <button type="button" className="btn btn-secondary" ref={btnControl} data-dismiss="modal" >ปิด</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
