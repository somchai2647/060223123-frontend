import React from 'react'

export default function SectionPage({ title }) {
    return (
        <section className="section-pagetop bg">
            <div className="container">
                <h2 className="title-page">{title}</h2>
            </div>
        </section>
    )
}
