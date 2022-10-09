import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../Navbars/NavbarAdmin'
import SectionPage from '../SectionPage'
import AdminMenu from './AdminMenu'

export default function Admin({ children, categorys, title }) {

    const router = useRouter()

    console.log(router.asPath)
    return (
        <>
            <Navbar categorys={categorys} />
            <SectionPage title={title} />

            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-3">
                            <ul className="list-group">
                                {AdminMenu.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        <a className={`list-group-item ${(router.asPath === item.path) && "active"}`}>{item.name}</a>
                                    </Link>
                                ))}
                                {/* <a className="list-group-item active" href="#"> Account overview</a>
                                <a className="list-group-item" href="#"> My wishlist </a>
                                <a className="list-group-item" href="#"> Return and refunds </a>
                                <a className="list-group-item" href="#">Settings </a>
                                <a className="list-group-item" href="#"> My Selling Items </a>
                                <a className="list-group-item" href="#"> Received orders </a> */}
                            </ul>
                        </aside>
                        <main className="col-md-9">
                            {children}
                        </main>
                    </div>
                </div>
            </section>
        </>
    )
}
