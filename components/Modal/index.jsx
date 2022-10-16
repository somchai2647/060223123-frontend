import React, { useState, useEffect, useRef } from 'react'
import Axios from '../Axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorLabel from '../ErrorLabel';

export default function DynamicModal({ field = [], name, callback, schema, editmode, axiosconfig }) {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: schema ? yupResolver(schema) : null
    })

    const [loadding, setLoadding] = useState(false)
    const btnControl = useRef(null)
    const formControl = useRef(null)

    function clickUpload() {
        formControl.current.click()
    }

    function closeModal() {
        btnControl.current.click()

    }

    async function onSubmit(formdata) {
        try {
            setLoadding(true)
            const res = editmode ? await Axios.put(`${axiosconfig.put}/${editmode.id}`, formdata) : await Axios.post(axiosconfig.post, formdata)
            if (res.data) {
                callback({
                    mode: editmode ? 'update' : 'add',
                    data: res.data
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            reset()
        }
        setLoadding(false)
        closeModal()
    }

    useEffect(() => {
        reset()
        if (editmode) {
            field?.map(item => {
                setValue(item.key, editmode[item.key])
            })
        }
    }, [editmode])


    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel"> {editmode ? `แก้ไข${name}` : `เพิ่ม${name}`}</h5>
                            <button type="button" disabled={loadding} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-row">
                                    {field?.filter(x => x.isInput).map((field, index) => (
                                        <div className="form-group col-md-12" key={index}>
                                            <label htmlFor={`Input${field.key}`}>{field.name} {field.required && <span className='text-danger'>*</span>} </label>
                                            <input type={field.type} {...register(field.key)} id={`Input${field.key}`} className="form-control" />
                                            {errors[field.key] && <ErrorLabel text={errors[field.key].message} />}
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" className="d-none" ref={formControl} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={clickUpload} className="btn btn-primary" disabled={loadding}>{loadding ? "กำลังบันทึก..." : "บันทึก"}</button>
                            <button type="button" className="btn btn-secondary" ref={btnControl} data-dismiss="modal" >ปิด</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
