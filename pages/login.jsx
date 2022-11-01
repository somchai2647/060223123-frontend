import Link from 'next/link'
import { useRouter } from 'next/router'
import Axios from '../components/Axios'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import useSweetAlert from '../hooks/useSweetAlert'
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import React, { useEffect, useState, useContext } from 'react'

export default function Login(category) {
    const authenContext = useContext(AuthenContext)
    const userContext = useContext(UserContext)

    const sweetalert = useSweetAlert()
    const router = useRouter()
    const { username } = router.query

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const [loadding, setLoadding] = useState(false)
    const [checked, setChecked] = useState(false)

    async function onSubmit(dataform) {
        try {
            setLoadding(true)
            const res = await Axios.post('/auth/login', dataform)


            const { role, token } = res.data
            localStorage.setItem('token', token)

            if (checked) {
                localStorage.setItem('username', dataform.username)
            }

            if (role === "ADMIN") {
                router.push("/manage/order");
            } else {
                router.push("/");
            }
            authenContext.setIsLogin(true)
            userContext.setUser(res.data)


        } catch (error) {
            sweetalert.warning("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง", "กรุณาลองใหม่อีกครั้ง")
        } finally {
            setLoadding(false)
        }
    }

    function handleCheck() {
        setChecked(!checked)
    }

    useEffect(() => {

        if (localStorage.getItem('username')) {
            setValue('username', localStorage.getItem('username'))
            setChecked(true)
        }
        if (username) {
            setValue("username", username)
        }
    }, [router.isReady])

    return (
        <Layout categorys={category["categorys"]}>
            <section className="section-conten" style={{ minHeight: '70vh' }}>
                <div className="card mx-auto shadow-sm" style={{ maxWidth: 380, marginTop: "4rem" }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">เข้าสู่ระบบ</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input {...register("username", { required: true })} disabled={loadding} className="form-control" placeholder="ชื่อผู้ใช้งาน*" autoFocus={!username} type="text" />
                            </div>
                            <div className="form-group">
                                <input {...register("password", { required: true })} disabled={loadding} className="form-control" placeholder="รหัสผ่าน*" type="password" autoFocus={username} autoComplete='off' />
                            </div>
                            <div className="form-group">
                                <a href="#" className="float-right">ลืมรหัสผ่าน?</a>
                                <label className="float-left custom-control custom-checkbox"> <input type="checkbox" className="custom-control-input" onClick={handleCheck} defaultChecked={!!checked} value={checked} /> <div className="custom-control-label"> จดจำชื่อผู้ใช้งาน </div> </label>
                            </div> {/* form-group form-check .// */}
                            {(errors.password || errors.username) && <span className='text-danger'>กรุณากรอกให้ครบถ้วน</span>}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loadding}> {loadding ? "กำลังเข้าสู่ระบบ" : "เข้าสู่ระบบ"} </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-center mt-4">คุณยังไม่มีบัญชีผู้ใช้หรือไม่? <Link href="/register"><a className='text-primary'>สมัครสมาชิก</a></Link></p>
                <br /><br />
            </section>
        </Layout>
    )
}
