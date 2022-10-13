import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Admin';
import CategoryTable from '../../components/Tables';
import Axios from "../../components/Axios";

const tableFields = [
    {
        name: 'ชื่อประเภทสินค้า',
        key: 'name',
        align: 'left',
    },
    {
        name: 'สร้างเมื่อ',
        key: 'createdAt',
        align: 'center',
    }
]

export default function Category() {

    const [categories, setCategories] = useState([])

    async function getCategories() {
        try {
            const res = await Axios.get('/category/getcategory')
            setCategories(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    function handleCallback(data) {
        console.log(data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Layout title="จัดการหมวดหมู่สินค้าในระบบ">
            <div className="card">
                <div className="card-body">
                    <CategoryTable fields={tableFields} data={categories} callback={handleCallback} />
                </div>
            </div>
        </Layout>
    )
}
