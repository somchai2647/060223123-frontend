import React, { useState, useEffect, useRef } from 'react'
import * as yup from "yup"
import Layout from '../../components/Layout/Admin'
import CategoryTable from '../../components/Tables'
import Axios from "../../components/Axios"
import DynamicModal from "../../components/Modal"
import manageState from '../../helpers/manageState'
import DeleteModal from '../../components/Modal/DynamicDelete';

const tableFields = [
    {
        name: 'ชื่อประเภทสินค้า',
        key: 'name',
        align: 'left',
        type: 'text',
        isInput: true
    },
    {
        name: 'สร้างเมื่อ',
        key: 'createdAt',
        align: 'center',
        type: 'date',
        isInput: false,
    }
]

const schema = yup.object().shape({
    name: yup.string().required("กรุณากรอกชื่อประเภทสินค้า")
})

const AxiosConfig = {
    post: '/category/createcategory',
    put: '/category/updatecategory',
}

export default function Category() {

    const [categories, setCategories] = useState([])
    const [editmode, setEditmode] = useState(null)

    const ModalBtn = useRef(null)
    const ModalDel = useRef(null)

    async function getCategories() {
        try {
            const res = await Axios.get('/category/getcategory?order=desc')
            setCategories(res.data)
        } catch (error) {
            console.error(error)
        }
    }


    function handleCallback(backdata) {
        const { mode, data } = backdata
        switch (mode) {
            case "edit":
                setEditmode(data)
                ModalBtn.current.click()
                break;
            case "del":
                setEditmode(data)
                ModalDel.current.click()
                break;
            default:
                break;
        }
        manageState(mode, categories, setCategories, data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Layout title="จัดการหมวดหมู่สินค้าในระบบ">
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col">
                            <button type='button' onClick={() => setEditmode(null)} className='btn btn-primary shadow-sm' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มหมวดหมู่สินค้า</button>
                            <button type='button' ref={ModalBtn} className='btn btn-primary shadow-sm d-none' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มหมวดหมู่สินค้า</button>
                        </div>
                    </div>
                    <CategoryTable fields={tableFields} data={categories} callback={handleCallback} />
                </div>
            </div>
            <DynamicModal
                schema={schema}
                name="หมวดหมู่สินค้า"
                field={tableFields}
                editmode={editmode}
                axiosconfig={AxiosConfig}
                callback={handleCallback}
            />
            <DeleteModal
                ref={ModalDel}
                callback={handleCallback}
                title="ลบหมวดหมู่สินค้า"
                text={`คุณต้องการลบหมวดหมู่สินค้า ${editmode?.name} ใช่หรือไม่`}
                path={`/category/destroycategory/${editmode?.id}`}
            />
        </Layout>
    )
}
