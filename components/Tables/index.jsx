import React from 'react'
import Moment from 'moment'
import "moment/locale/th"

export default function TableDynamic({ fields = [], data = [], callback }) {

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover w-100">
                <thead>
                    <tr className="bg-primary text-white text-center">
                        <td className='text-center'>ลำดับ</td>
                        {fields?.map((field) => (
                            <th scope="col" key={field.key}>{field.name}</th>
                        ))}
                        <th scope="col">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length === 0 && (
                        <tr key={1}>
                            <td colSpan={fields.length + 1} className="text-center">-ไม่พบข้อมูล-</td>
                        </tr>
                    )}
                    {data?.map((item, index) => (
                        <tr key={item.id}>
                            <td className='text-center'>{index + 1}.</td>
                            {fields?.map((field) => (
                                <td key={field.key} className={`text-${field.align}`}>{field.type == "date" ? Moment(item[field.key]).format("lll") : item[field.key]}</td>
                            ))}
                            <td className='text-center'>
                                <DropdownItem data={item} callback={callback} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export function DropdownItem({ data, callback }) {

    function handleClick(mode) {
        callback({ mode, data })
    }

    return (
        <div className="dropdown dropleft">
            <button className="btn btn-sm" type="button" data-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu ">
                <button className="dropdown-item" type="button" onClick={() => handleClick("edit")}><i className="fas fa-edit"></i> แก้ไข</button>
                <button className="dropdown-item text-danger" type="button" onClick={() => handleClick("del")}><i className="fas fa-trash"></i> นำออก</button>
            </div>
        </div>
    )
}


