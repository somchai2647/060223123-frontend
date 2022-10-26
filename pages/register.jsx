import * as yup from "yup"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Axios from '../components/Axios'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorLabel from '../components/ErrorLabel'
import useSweetAlert from '../hooks/useSweetAlert';

const schema = yup.object().shape({
    username: yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
    password: yup.string().required("กรุณากรอกรหัสผ่าน"),
    fname: yup.string().required("กรุณากรอกชื่อจริง"),
    lname: yup.string().required("กรุณากรอกนามสกุล"),
    email: yup.string().email("กรุณากรอกอีเมลให้ถูกต้อง").required("กรุณากรอกอีเมล"),
    tel: yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
});

export default function Register(category) {

    const sweetalert = useSweetAlert()

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [loadding, setLoadding] = useState(false)

    async function onSubmit(dataform) {
        try {
            setLoadding(true)
            const res = await Axios.post('/auth/register', dataform)
            const user = await res.data
            if (user) {
                sweetalert.success('สมัครสมาชิกสำเร็จ', 'กรุณาเข้าสู่ระบบ')
                router.push('/login?username=' + dataform.username)
            }
        } catch (error) {
            sweetalert.warning("สมัครสมาชิกไม่สำเร็จ", error.response.data.message)
        } finally {
            setLoadding(false)
        }
    }

    return (
        <Layout categorys={category["categorys"]}>
            <section className="section-conten" style={{ minHeight: '70vh' }}>
                <div className="card mx-auto shadow-sm" style={{ maxWidth: 480, marginTop: "4rem" }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">สมัครสมาชิก</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <input {...register("username", { required: true })} disabled={loadding} className="form-control" placeholder="ชื่อผู้ใช้งาน*" autoFocus type="text" />
                                    {errors.username && <ErrorLabel text={errors.username.message} />}
                                </div>
                                <div className="form-group col-12">
                                    <input {...register("password", { required: true })} disabled={loadding} className="form-control" placeholder="รหัสผ่าน*" type="password" autoComplete='off' />
                                    {errors.password && <ErrorLabel text={errors.password.message} />}
                                </div>
                                <div className="form-group col-12 col-md-6">
                                    <input {...register("fname", { required: true })} disabled={loadding} className="form-control" placeholder="ชื่อ*" type="text" />
                                    {errors.fname && <ErrorLabel text={errors.fname.message} />}
                                </div>
                                <div className="form-group col-12 col-md-6">
                                    <input {...register("lname", { required: true })} disabled={loadding} className="form-control" placeholder="นามสกุล*" type="text" autoComplete='off' />
                                    {errors.lname && <ErrorLabel text={errors.lname.message} />}
                                </div>
                                <div className="form-group col-12">
                                    <input {...register("email", { required: true })} disabled={loadding} className="form-control" placeholder="อีเมล*" type="email" autoComplete='off' />
                                    {errors.email && <ErrorLabel text={errors.email.message} />}
                                </div>
                                <div className="form-group col-12">
                                    <input {...register("tel", { required: true })} maxLength={10} disabled={loadding} className="form-control" placeholder="เบอร์ติดต่อ*" type="text" autoComplete='off' />
                                    {errors.tel && <ErrorLabel text={errors.tel.message} />}
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loadding}> {loadding ? "กำลังสมัครสมาชิก" : "สมัครสมาชิก"} </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-center mt-4">คุณมีบัญชีผู้ใช้แล้ว? <Link href="/login"><a className='text-primary'>เข้าสู่ระบบ</a></Link></p>
                <br /><br />
            </section>
        </Layout>
    )
}
