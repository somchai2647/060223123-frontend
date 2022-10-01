import React from 'react'
import Navbar from '../Navbars/Navbar';

export default function Layout({ children, categorys }) {
    return (
        <>
            <Navbar categorys={categorys} />
            {children}
        </>
    )
}
