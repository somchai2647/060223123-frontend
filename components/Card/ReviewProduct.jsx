import * as yup from "yup"
import Axios from '../Axios'
import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import useSweetAlert from '../../hooks/useSweetAlert'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({
    rating: yup.number().required(),
    comment: yup.string().required("กรุณากรอกความคิดเห็น"),
})


export default function ReviewProduct({ product }) {

    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([])

    const sweetalert = useSweetAlert()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    async function onSubmit(formdata) {
        try {
            setLoading(true)
            const payload = {
                ...formdata,
                proid: product.id,
            }
            const res = await Axios.post('/review/createReview', payload)
            const data = await res.data

            if (data) {
                setReviews(review => [...review, data])
            }


        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function getReviews() {
        try {
            const res = await Axios.get(`/review/getReviewProducts?productsid=${product.id}`)
            const data = await res.data
            setReviews(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="card mt-4">
                <div classname="card-body">
                    <header className="section-heading p-4">
                        <h3>Review</h3>
                        <div className="rating-wrap">
                            <ul className="rating-stars stars-lg">
                                <li style={{ width: '80%' }} className="stars-active">
                                    <img src="/assets/images/icons/stars-active.svg" alt />
                                </li>
                                <li>
                                    <img src="/assets/images/icons/starts-disable.svg" alt />
                                </li>
                            </ul>
                            <strong className="label-rating text-lg"> 4.5 <span className="text-muted">| 112 reviews</span></strong>
                        </div>
                    </header>
                    <div className='p-4'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="form-group col-12 col-md-3">
                                    <label htmlFor="SelectionRating">คะแนน</label>
                                    <select className="form-control" id="SelectionRating" defaultValue={"5"} {...register("rating")} >
                                        <option>5</option>
                                        <option>4</option>
                                        <option>3</option>
                                        <option>2</option>
                                        <option>1</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <textarea cols="30" rows="3" {...register("comment", { required: true })} maxLength={70} className="form-control" placeholder='ใส่ข้อความของคุณ'></textarea>
                                </div>
                                <div className="form-group col-12">
                                    <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "✏️ กำลังบันทึก" : "✏️ บันทึก"}</button>
                                </div>
                            </div>
                        </form>
                        <article className="box mb-3">
                            <div className="icontext w-100">
                                <img src="/assets/images/avatars/user-icon.png" className="img-xs icon rounded-circle" />
                                <div className="text">
                                    <span className="date text-muted float-md-right">24.04.2020 </span>
                                    <h6 className="mb-1">Mike John </h6>
                                    <ul className="rating-stars">
                                        <li style={{ width: '80%' }} className="stars-active">
                                            <img src="/assets/images/icons/stars-active.svg" alt />
                                        </li>
                                        <li>
                                            <img src="/assets/images/icons/starts-disable.svg" alt />
                                        </li>
                                    </ul>
                                    <span className="label-rating text-warning">Good</span>
                                </div>
                            </div> {/* icontext.// */}
                            <div className="mt-3">
                                <p>
                                    Dummy comment Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip
                                </p>
                            </div>
                        </article>

                    </div>
                </div>
            </div>
        </div>
    )
}
