import React from 'react'
import Navbar from '../Navbars/NavbarAdmin';
import SectionPage from '../SectionPage'

export default function Admin({ children, categorys, title }) {
    return (
        <>
            <Navbar categorys={categorys} />
            <SectionPage title={title} />
            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-3">
                            <ul className="list-group">
                                <a className="list-group-item active" href="#"> Account overview</a>
                                <a className="list-group-item" href="#"> My Orders </a>
                                <a className="list-group-item" href="#"> My wishlist </a>
                                <a className="list-group-item" href="#"> Return and refunds </a>
                                <a className="list-group-item" href="#">Settings </a>
                                <a className="list-group-item" href="#"> My Selling Items </a>
                                <a className="list-group-item" href="#"> Received orders </a>
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
