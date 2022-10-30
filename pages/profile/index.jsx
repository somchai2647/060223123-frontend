import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/Card/UserMenu'
import SectionPage from '../../components/SectionPage';

export default function Overview({ categorys }) {
    return (
        <Layout categorys={categorys}>
            <SectionPage title={"👤 ข้อมูลส่วนตัว"} />
            <section className="section-content">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
