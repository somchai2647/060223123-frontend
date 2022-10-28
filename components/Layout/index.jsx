import React from 'react'
import Navbar from '../Navbars/Navbar'
import Footer from '../Footer'

export default function Layout({ children, categorys }) {
    return (
        <>
            <Navbar categorys={categorys} />
            {children}
            <Footer />
        </>
    )
}
