import React, { useContext } from 'react'
import moment from 'moment'
import "moment/locale/th"
import useSweetAlert from '../../hooks/useSweetAlert'
import UserContext from '../../contexts/UserContext'
import Axios from '../Axios'

export default function CommandCardWarper({ reviews, onDelete }) {
    return (
        <>
            {reviews.map((item) => (
                <CommandCard key={item.id} item={item} onDelete={onDelete} />
            ))}
        </>
    )
}

export function CommandCard({ item, onDelete }) {
    const user = useContext(UserContext)

    const alert = useSweetAlert()

    async function removeItem() {
        try {
            const res = await Axios.delete(`/review/destroyReview/${item.id}`)
            const data = await res.data
            onDelete(true)

        } catch (error) {
            console.error(error)
        }

    }

    async function handleRemove() {
        await alert.confirm({
            title: "คุณต้องการลบความคิดเห็นนี้ใช่หรือไม่?",
            text: "คุณจะไม่สามารถกู้คืนความคิดเห็นนี้ได้หากลบแล้ว",
            icon: "warning",
        }, {
            title: "ลบแล้ว!",
            text: "ความคิดเห็นของคุณถูกลบแล้ว",
            icon: "success",
        }, removeItem)
    }

    return (
        <article className="box mb-3">
            <div className="icontext w-100">
                <img src="/assets/images/avatars/user-icon.png" className="img-xs icon rounded-circle" />
                <div className="text">
                    <span className="date text-muted float-md-right"> {moment(item.updatedAt).format("lll")}
                        {user?.user.username === item.userId && <button className="btn btn-sm" type="button" onClick={handleRemove}><i className="fas fa-trash"></i></button>}
                    </span>
                    <h6 className="mb-1">{item.User.fname} {item.User.lname}</h6>
                    <ul className="rating-stars">

                        <li style={{ width: `${item.rating * 20}%` }} className="stars-active">
                            <img src="/assets/images/icons/stars-active.svg" alt="staractive" />
                        </li>
                        <li>
                            <img src="/assets/images/icons/starts-disable.svg" alt="stardisable" />
                        </li>
                    </ul>
                    {/* <span className="label-rating text-warning">Good</span> */}
                </div>
            </div> {/* icontext.// */}
            <div className="mt-3">
                <p>
                    {item.comment}
                </p>
            </div>
        </article>
    )
}