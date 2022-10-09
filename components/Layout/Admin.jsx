import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../Navbars/NavbarAdmin'
import SectionPage from '../SectionPage'
import AdminMenu from './AdminMenu'

export default function Admin({ children, categorys, title }) {

    const router = useRouter()
    return (
        <>
            <Navbar categorys={categorys} />
            <SectionPage title={title} />

            <section className="section-content padding-y">
                <div className="container-fluid" >
                    <div className="row">
                        <aside className="col-md-2">
                            <ul className="list-group shadow-sm">
                                {AdminMenu.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        <a className={`list-group-item ${(router.asPath === item.path) && "active"}`}>{item.name}</a>
                                    </Link>
                                ))}
                            </ul>
                        </aside>
                        <main className="col-md-10">
                            {children}
                        </main>
                    </div>
                </div>
            </section>
        </>
    )
}
