import React, { useState, useEffect, useRef } from 'react'
import * as yup from "yup"
import Layout from '../../components/Layout/Admin'
import PublisherTable from '../../components/Tables'
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
        name: "ที่อยู่สำนักพิมพ์",
        key: "address",
        align: "left",
        type: "text",
        isInput: true,
        required: true
    },
    {
        name: 'เบอร์โทรศัพท์',
        key: 'tel',
        align: 'left',
        type: 'text',
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
    name: yup.string().required("กรุณากรอกชื่อสำนักพิมพ์"),
    address: yup.string().required("กรุณากรอกที่อยู่สำนักพิมพ์"),
    tel: yup.string().required("กรุณากรอกเบอร์โทรศัพท์").min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก"),
})

const AxiosConfig = {
    post: '/publisher/createpublisher',
    put: '/publisher/updatepublisher',
}

export default function Publisher() {


    const [publisher, setPublisher] = useState([])
    const [editmode, setEditmode] = useState(null)

    const ModalBtn = useRef(null)
    const ModalDel = useRef(null)

    async function getPublisher() {
        try {
            const res = await Axios.get('/publisher/getpublisher?withproduct=0')
            setPublisher(res.data)
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
        manageState(mode, publisher, setPublisher, data)
    }

    useEffect(() => {
        getPublisher()
    }, [])

    return (
        <Layout title="🏢 จัดการสำนักพิมพ์">
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col">
                            <button type='button' onClick={() => setEditmode(null)} className='btn btn-primary shadow-sm' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มสำนักพิมพ์</button>
                            <button type='button' ref={ModalBtn} className='btn btn-primary shadow-sm d-none' data-toggle="modal" data-target="#staticBackdrop"><i className="fas fa-plus-circle"></i> เพิ่มสำนักพิมพ์</button>
                        </div>
                    </div>
                    <PublisherTable fields={tableFields} data={publisher} callback={handleCallback} />
                </div>
            </div>
            <DynamicModal
                schema={schema}
                name="สำนักพิมพ์"
                field={tableFields}
                editmode={editmode}
                axiosconfig={AxiosConfig}
                callback={handleCallback}
            />
            <DeleteModal
                ref={ModalDel}
                callback={handleCallback}
                title="ลบสำนักพิมพ์"
                message={`คุณต้องการลบสำนักพิมพ์ ${editmode?.name} ใช่หรือไม่`}
                path={`/publisher/destroypublisher/${editmode?.id}`}
            />
        </Layout>
    )
}
