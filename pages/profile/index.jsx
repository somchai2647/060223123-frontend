import * as yup from "yup"
import { useForm } from 'react-hook-form'
import Axios from '../../components/Axios'
import Layout from '../../components/Layout'
import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Card/UserMenu'
import SectionPage from '../../components/SectionPage'
import { yupResolver } from '@hookform/resolvers/yup'
import useSweetAlert from '../../hooks/useSweetAlert'
import ErrorLabel from '../../components/ErrorLabel';

const schema = yup.object().shape({
    username: yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
    password: yup.string().required("กรุณากรอกรหัสผ่าน"),
    fname: yup.string().required("กรุณากรอกชื่อจริง"),
    lname: yup.string().required("กรุณากรอกนามสกุล"),
    email: yup.string().email("กรุณากรอกอีเมลให้ถูกต้อง").required("กรุณากรอกอีเมล"),
    tel: yup.string().required("กรุณากรอกเบอร์โทรศัพท์").min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก"),
    house: yup.string().required("กรุณากรอกบ้านเลขที่"),
    road: yup.string().required("กรุณากรอกถนน"),
    subdistrict: yup.string().required("กรุณากรอกตำบล"),
    district: yup.string().required("กรุณากรอกอำเภอ"),
    province: yup.string().required("กรุณากรอกจังหวัด"),
    zipcode: yup.string().required("กรุณากรอกรหัสไปรษณีย์").min(5, "กรุณากรอกรหัสไปรษณีย์ให้ครบ 5 หลัก"),
});

export default function Overview({ categorys }) {
    const alert = useSweetAlert()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [loading, setloading] = useState(false)

    async function onSubmit(data) {
        console.log(data)
    }

    async function getProfile() {
        try {
            const res = await Axios.get("/profile/getProfile")
            const data = await res.data
            if (data) {
                let address = data.address
                address = address.split("|")
                setValue("username", data.username)
                setValue("fname", data.fname)
                setValue("lname", data.lname)
                setValue("email", data.email)
                setValue("tel", data.tel)

                setValue("house", address[0])
                setValue("road", address[1])
                setValue("subdistrict", address[2])
                setValue("district", address[3])
                setValue("province", address[4])
                setValue("zipcode", address[5])
                // const address = `${house}|${road}|${subdistrict}|${district}|${province}|${zipcode}`

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <Layout categorys={categorys}>
            <SectionPage title={"👤 ข้อมูลส่วนตัว"} />
            <section className="section-content">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h2 className="mb-4">ข้อมูลส่วนตัว</h2>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>ชื่อผู้ใช้งาน*</label>
                                                <input {...register("username", { required: true })} disabled className="form-control" placeholder="ชื่อผู้ใช้งาน*" autoFocus type="text" />
                                                {errors.username && <ErrorLabel text={errors.username.message} />}
                                            </div>
                                            <div className="form-group col-12 col-md-6">
                                                <label>ชื่อ*</label>
                                                <input {...register("fname", { required: true })} disabled={loading} className="form-control" placeholder="ชื่อ*" type="text" />
                                                {errors.fname && <ErrorLabel text={errors.fname.message} />}
                                            </div>
                                            <div className="form-group col-12 col-md-6">
                                                <label>นามสกุล*</label>
                                                <input {...register("lname", { required: true })} disabled={loading} className="form-control" placeholder="นามสกุล*" type="text" autoComplete='off' />
                                                {errors.lname && <ErrorLabel text={errors.lname.message} />}
                                            </div>
                                            <div className="form-group col-12">
                                                <label>อีเมลล์*</label>
                                                <input {...register("email", { required: true })} disabled={loading} className="form-control" placeholder="อีเมล*" type="email" autoComplete='off' />
                                                {errors.email && <ErrorLabel text={errors.email.message} />}
                                            </div>
                                            <div className="form-group col-12">
                                                <label>เบอร์ติดต่อ*</label>
                                                <input {...register("tel", { required: true })} maxLength={10} disabled={loading} className="form-control" placeholder="เบอร์ติดต่อ*" type="text" autoComplete='off' />
                                                {errors.tel && <ErrorLabel text={errors.tel.message} />}
                                            </div>
                                        </div>
                                        <hr />
                                        <h2 className="mb-4">ที่อยู่</h2>
                                        <div className="form-row">
                                            <div className="form-group col-sm-6">
                                                <label>จังหวัด*</label>
                                                <input type="text" {...register("province", { required: true })} placeholder="จังหวัด" className="form-control" />
                                                {errors.province && <ErrorLabel text={errors.province.message} />}
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label>อำเภอ*</label>
                                                <input type="text" {...register("district", { required: true })} placeholder="อำเภอ" className="form-control" />
                                                {errors.district && <ErrorLabel text={errors.district.message} />}

                                            </div>
                                            <div className="form-group col-sm-4">
                                                <label>ตำบล*</label>
                                                <input type="text" {...register("subdistrict", { required: true })} placeholder="อำเภอ" className="form-control" />
                                                {errors.subdistrict && <ErrorLabel text={errors.subdistrict.message} />}

                                            </div>
                                            <div className="form-group col-sm-8">
                                                <label>ถนนและซ้อย</label>
                                                <input type="text" {...register("road", { required: true })} placeholder="ถนนและซ้อย" className="form-control" />
                                                {errors.road && <ErrorLabel text={errors.road.message} />}

                                            </div>
                                            <div className="form-group col-sm-4">
                                                <label>บ้านเลขที่*</label>
                                                <input type="text" maxLength={5} {...register("house", { required: true })} placeholder="บ้านเลขที่" className="form-control" />
                                                {errors.house && <ErrorLabel text={errors.house.message} />}

                                            </div>
                                            <div className="form-group col-sm-4">
                                                <label>รหัสไปรษณีย์*</label>
                                                <input type="text" maxLength={5} {...register("zipcode", { required: true })} placeholder="รหัสไปรษณีย์" className="form-control" />
                                                {errors.zipcode && <ErrorLabel text={errors.zipcode.message} />}

                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}> {loading ? "กำลังบันทึกข้อมูล" : "บันทึกข้อมูล"} </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
