import * as yup from "yup"
import Axios from '../Axios'
import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import useSweetAlert from '../../hooks/useSweetAlert'
import { useForm } from 'react-hook-form'
import CommandCard from './CommandCard'
import ErrorLabel from '../ErrorLabel'

const schema = yup.object().shape({
    rating: yup.number().required(),
    comment: yup.string().required("กรุณากรอกความคิดเห็น"),
})


export default function ReviewProduct({ product }) {

    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([])

    const sweetalert = useSweetAlert()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
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
                sweetalert.success("บันทึกข้อมูลสำเร็จ", "ขอบคุณสำหรับความคิดเห็นของคุณ")
                getReviews()
                reset()
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

    useEffect(() => {

        getReviews()

    }, [])


    return (
        <div>
            <div className="card mt-4">
                <div className="card-body">
                    <header className="section-heading p-4">
                        <h3>Review</h3>
                        <div className="rating-wrap">
                            <ul className="rating-stars stars-lg">
                                <li style={{ width: '80%' }} className="stars-active">
                                    <img src="/assets/images/icons/stars-active.svg" />
                                </li>
                                <li>
                                    <img src="/assets/images/icons/starts-disable.svg" />
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
                                    {errors.comment && <ErrorLabel message={errors.comment.message} />}
                                </div>
                                <div className="form-group col-12">
                                    <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "✏️ กำลังบันทึก" : "✏️ บันทึก"}</button>
                                </div>
                            </div>
                        </form>
                        <CommandCard reviews={reviews} />
                    </div>
                </div>
            </div>
        </div>
    )
}
