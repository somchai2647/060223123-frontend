import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link';

export default function Page404(props) {
    return (
        <Layout categorys={props.categorys}>
            <div className="container text-center m-5">
                <Image
                    src={"/assets/images/404-V2.svg"}
                    width={400}
                    height={400}
                />
                <h1>Error 404 Not Found!</h1>
                <Link href={"/"}>
                    <a className='btn btn-outline-primary'>กลับไปหน้าหลัก</a>
                </Link>
            </div>
        </Layout>
    )
}
