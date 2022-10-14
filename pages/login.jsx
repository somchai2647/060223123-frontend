import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'
import Axios from '../components/Axios'
import { useForm } from 'react-hook-form'

export default function Login(category) {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [loadding, setLoadding] = useState(false)

    async function onSubmit(dataform) {
        try {
            const res = await Axios.post('/auth/login', dataform)

            const { role, token } = res.data
            localStorage.setItem('token', token)
            if (role === "ADMIN") {
                router.push("/manage");
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoadding(false)
        }
    }

    return (
        <Layout categorys={category["categorys"]}>
            <section className="section-conten" style={{ minHeight: '70vh' }}>
                <div className="card mx-auto shadow-sm" style={{ maxWidth: 380, marginTop: "4rem" }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">เข้าสู่ระบบ</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input {...register("username", { required: true })} disabled={loadding} className="form-control" placeholder="ชื่อผู้ใช้งาน*" autoFocus type="text" />
                            </div> {/* form-group// */}
                            <div className="form-group">
                                <input {...register("password", { required: true })} disabled={loadding} className="form-control" placeholder="รหัสผ่าน*" type="password" autoComplete='off' />
                            </div> {/* form-group// */}
                            <div className="form-group">
                                <a href="#" className="float-right">ลืมรหัสผ่าน?</a>
                                <label className="float-left custom-control custom-checkbox"> <input type="checkbox" className="custom-control-input" defaultChecked /> <div className="custom-control-label"> จดจำชื่อผู้ใช้งาน </div> </label>
                            </div> {/* form-group form-check .// */}
                            {(errors.password || errors.username) && <span className='text-danger'>กรุณากรอกให้ครบถ้วน</span>}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loadding}> {loadding ? "กำลังเข้าสู่ระบบ" : "เข้าสู่ระบบ"} </button>
                            </div> {/* form-group// */}
                        </form>
                    </div> {/* card-body.// */}
                </div> {/* card .// */}
                <p className="text-center mt-4">คุณยังไม่มีบัญชีผู้ใช้หรือไม่? <Link href="/register"><a className='text-primary'>สมัครสมาชิก</a></Link></p>
                <br /><br />
            </section>
        </Layout>
    )
}
