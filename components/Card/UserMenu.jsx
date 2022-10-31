import React from 'react'
import Link from 'next/link'
import useAuthen from '../../hooks/useAuthen';

export default function UserMenu() {

    const auth = useAuthen()

    function handleLogout() {
        auth.logout()
    }

    return (
        <>
            <div className="card">
                <article className="filter-group">
                    <header className="card-header">
                        <h6 className="title">บัญชีของฉัน</h6>
                    </header>
                    <div className="filter-content">
                        <div className="card-body">
                            <ul className="list-menu">
                                <li className='mb-3'>
                                    <Link href="/profile">
                                        <a href="#">ข้อมูลส่วนตัว</a>
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link href={"/cart"}>
                                        <a href="#">ตะกร้าสินค้า</a>
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link href={"/"}>
                                        <a href="#">รายการสั่งซื้อของฉัน</a>
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link href={"/"}>
                                        <a href="#">รีวิวของฉัน</a>
                                    </Link>
                                </li>
                                <hr />
                                <li className='mb-3'><a href="#">เปลี่ยนรหัสผ่าน</a></li>
                                <li className='mb-3'><a href="#" onClick={handleLogout} className='text-danger'>ออกจากระบบ</a></li>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
