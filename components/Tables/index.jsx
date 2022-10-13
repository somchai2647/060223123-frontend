import React from 'react'

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
                                <td key={field.key} className={field.align}>{item[field.key]}</td>
                            ))}
                            <td className='text-center'>
                                <DropdownItem />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export function DropdownItem() {
    return (
        <div className="dropdown dropleft">
            <a className="btn btn-sm" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-ellipsis-v"></i>
            </a>
            <div className="dropdown-menu ">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>


    )
}