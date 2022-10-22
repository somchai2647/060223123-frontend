import React, { useState } from 'react'

export default function HeaderPanel({ callback, numberitem = 0 }) {

    const [grid, setGrid] = useState(false)

    function toggle() {
        callback(!grid)
        setGrid(!grid)
    }
    return (
        <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
                <span className="mr-md-auto">{numberitem} Items found </span>
                <select className="mr-2 form-control">
                    <option>Latest items</option>
                    <option>Trending</option>
                    <option>Most Popular</option>
                    <option>Cheapest</option>
                </select>
                <div className="btn-group">
                    <button className={`btn btn-outline-secondary ${!grid && "active"}`} onClick={toggle} data-toggle="tooltip" title="List view">
                        <i className="fa fa-bars" /></button>
                    <button className={`btn  btn-outline-secondary ${grid && "active"}`} onClick={toggle} data-toggle="tooltip" title="Grid view">
                        <i className="fa fa-th" /></button>
                </div>
            </div>
        </header>
    )
}
