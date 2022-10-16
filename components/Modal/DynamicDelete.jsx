import React, { useState } from 'react'
import Axios from '../Axios'

const DeleteTicker = React.forwardRef(({ title, path, callback, message }, ref) => {

    const [loadding, setLoadding] = useState(false)

    async function handleDelete() {
        try {
            setLoadding(true)
            const res = await Axios.delete(path)

            if (res.data) {
                callback({
                    mode: "delete",
                    data: res.data
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadding(false)
            ref.current.click()
        }
    }

    return (
        <>
            {/* Button trigger modal */}
            <button type="button" ref={ref} className="btn btn-secondary btn-sm d-none" data-toggle="modal" data-target="#DynamicDeleteModal">
                Open Delete Modal
            </button>
            <div>
                <div className="modal fade" id="DynamicDeleteModal" tabIndex={-1} role="dialog" aria-labelledby="DynamicDeleteModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {message}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={loadding}>ใช่, ลบรายการนี้</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" disabled={loadding}>ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default DeleteTicker