import React from 'react'
import moment from 'moment'
import "moment/locale/th"

export default function CommandCardWarper({ reviews }) {
    return (
        <>
            {reviews.map((item) => (
                <CommandCard key={item.id} item={item} />
            ))}
        </>
    )
}

export function CommandCard({ item }) {
    return (
        <article className="box mb-3">
            <div className="icontext w-100">
                <img src="/assets/images/avatars/user-icon.png" className="img-xs icon rounded-circle" />
                <div className="text">
                    <span className="date text-muted float-md-right"> {moment(item.updatedAt).format("lll")}</span>
                    <h6 className="mb-1">{item?.User.fname} {item?.User.lname}</h6>
                    <ul className="rating-stars">
                        
                        <li style={{ width: `${item?.rating * 20}%` }} className="stars-active">
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