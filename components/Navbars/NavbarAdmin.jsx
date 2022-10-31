import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import AuthenContext from '../../contexts/AuthenContext'
import UserContext from '../../contexts/UserContext'
import Axios from '../Axios'
import AdminMenu from '../Layout/AdminMenu'
import useAuthen from '../../hooks/useAuthen'

export default function Navbar({ categorys }) {

    const auth = useAuthen()
    const authenContext = useContext(AuthenContext)
    const userContext = useContext(UserContext)

    function handleLogout() {
        auth.logout()
    }

    return (
        <div>
            <header className="section-header">
                <section className="header-main border-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-4">
                                <Link href={"/"}>
                                    <a className="brand-wrap">
                                        <img className="logo" src="/assets/images/logo-large.png" alt='logo-large' />
                                    </a>
                                </Link>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <form action="#" className="search">
                                    <div className="input-group w-100">
                                        <input type="text" className="form-control" placeholder="คำค้นหา" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="fa fa-search" /> ค้นหา
                                            </button>
                                        </div>
                                    </div>
                                </form> {/* search-wrap .end// */}
                            </div> {/* col.// */}
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="widgets-wrap float-md-right">
                                    <div className="widget-header  mr-3">
                                        <Link href={"/cart"}>
                                            <a className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart" /></a>
                                        </Link>
                                        {/* <span className="badge badge-pill badge-danger notify">0</span> */}
                                    </div>
                                    <div className="widget-header icontext">
                                        {authenContext.isLogin ?

                                            <div className="dropdown show">
                                                <a href="#" className="icon icon-sm rounded-circle border" role="button" id="dropdownMenuUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user" /></a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                                                    {AdminMenu.map((item, index) => (
                                                        <Link href={item.path} key={index}>
                                                            <a className="dropdown-item">{item.name}</a>
                                                        </Link>
                                                    ))}
                                                    <hr />
                                                    <Link href="/profile/changpassword">
                                                        <a className="dropdown-item">🔐 เปลี่ยนรหัสผ่าน</a>
                                                    </Link>
                                                    <button className="dropdown-item text-danger" onClick={handleLogout} >ออกจากระบบ</button>
                                                </div>
                                            </div>
                                            :
                                            <Link href="/login">
                                                <a className="icon icon-sm rounded-circle border" role="button"><i className="fa fa-user" /></a>
                                            </Link>
                                        }
                                        {authenContext.isLogin ?
                                            <div className="text">
                                                <span className="text-muted">ยินดีต้อนรับ!</span>
                                                <br />
                                                <a>{userContext.user.fname} {userContext.user.lname}</a>
                                            </div>
                                            : <div className="text">
                                                <span className="text-muted">ยินดีต้อนรับ!</span>
                                                <br />
                                                <Link href="/login">
                                                    <a >เข้าสู่ระบบ </a>
                                                </Link>
                                                |
                                                <Link href="/register">
                                                    <a> สมัครสมาชิก</a>
                                                </Link>
                                            </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </div >


    )
}

export function AdminPanel() {
    return (
        <div className='mt-2'>
            <Link href={"/manage"}>
                <a className='btn btn-primary btn-sm text-white'>Admin Panel</a>
            </Link>
        </div>
    )
}

export function Nav({ categorys = [] }) {

    return (
        <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="main_nav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link href="/">
                                <a className="nav-link" >หน้าหลัก</a>
                            </Link>
                        </li>
                        {categorys?.slice(0, 9).map((category) => (
                            <li className="nav-item dropdown" key={category.id}>
                                <Link href={`/category/${category.id}`}>
                                    <a className="nav-link" >{category.name}</a>
                                </Link>
                            </li>
                        ))}
                        {categorys?.length > 9 && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> เพิ่มเติม </a>
                                <div className="dropdown-menu">
                                    {categorys?.slice(9).map((category) => (
                                        <Link href={`/category/${category.id}`} key={category.id}>
                                            <a className="dropdown-item">{category.name}</a>
                                        </Link>
                                    ))}

                                    {/* <div className="dropdown-divider" /> */}
                                </div>
                            </li>
                        )}

                    </ul>
                </div> {/* collapse .// */}
            </div> {/* container .// */}
        </nav>
    )
}

