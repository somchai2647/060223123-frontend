import React, { useState, useEffect, useRef } from 'react'
import * as yup from "yup"
import Layout from '../../components/Layout/Admin'
import AuthorTable from '../../components/Tables'
import Axios from "../../components/Axios"
import DynamicModal from "../../components/Modal"
import manageState from '../../helpers/manageState'
import DeleteModal from '../../components/Modal/DynamicDelete';

const tableFields = [
    {
        name: 'ชื่อผู้เขียน/ผู้แต่ง',
        key: 'name',
        align: 'left',
        type: 'text',
        isInput: true,
        required: true
    },
    {
        name: "อีเมลล์",
        key: "email",
        align: "left",
        type: "email",
        isInput: true,
        required: true
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
    name: yup.string().required("กรุณากรอกชื่อผู้เขียน/ผู้แต่ง"),
    email: yup.string().email("กรุณากรอกอีเมลล์ให้ถูกต้อง").required("กรุณากรอกอีเมลล์"),
})

const AxiosConfig = {
    post: '/author/createauthor',
    put: '/author/updateauthor',
}

export default function Author() {

    const [authors, setAuthors] = useState([])
    const [editmode, setEditmode] = useState(null)

    const ModalBtn = useRef(null)
    const ModalDel = useRef(null)

    async function getAuthors() {
        try {
            const res = await Axios.get('/author/getauthor?withproduct=0')
            setAuthors(res.data)
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
        manageState(mode, authors, setAuthors, data)
    }

    useEffect(() => {
        getAuthors()
    }, [])

    return (
        <Layout title="🧑‍🏫 จัดการผู้เขียน/ผู้แต่ง">
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col">
                            <button type='button' onClick={() => setEditmode(null)} className='btn btn-primary shadow-sm' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มผู้เขียน/ผู้แต่ง</button>
                            <button type='button' ref={ModalBtn} className='btn btn-primary shadow-sm d-none' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มผู้เขียน/ผู้แต่ง</button>
                        </div>
                    </div>
                    <AuthorTable fields={tableFields} data={authors} callback={handleCallback} />
                </div>
            </div>
            <DynamicModal
                schema={schema}
                name="ผู้เขียน/ผู้แต่ง"
                field={tableFields}
                editmode={editmode}
                axiosconfig={AxiosConfig}
                callback={handleCallback}
            />
            <DeleteModal
                ref={ModalDel}
                callback={handleCallback}
                title="ลบผู้เขียน/ผู้แต่ง"
                message={`คุณต้องการลบผู้เขียน/ผู้แต่ง ${editmode?.name} ใช่หรือไม่`}
                path={`/author/destroyauthor/${editmode?.id}`}
            />
        </Layout>
    )
}
