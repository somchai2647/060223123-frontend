import React from 'react'

export default function Product({ products = [], callback }) {
    return (
        <div className='table-responsive'>
            <table className="table table-striped table-hover shadow-sm">
                <thead>
                    <tr className="bg-primary text-white text-center">
                        <th scope="col">ลำดับ</th>
                        <th scope="col">ชื่อสินค้า</th>
                        <th scope="col">หมวดหมู่สินค้า</th>
                        <th scope="col">ชื่อผู้เขียน</th>
                        <th scope="col">ราคาขาย</th>
                        <th scope="col">ลดราคา</th>
                        <th scope="col">สินค้าคงเหลือ</th>
                        <th scope="col">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center">ไม่พบรายการสินค้า</td>
                        </tr>
                    )}
                    {products?.map((item, index) => (
                        <tr key={item.id} className='text-center'>
                            <th scope="row">{++index}. </th>
                            <td className='text-left'>{item.name}</td>
                            <td>{item.category?.name}</td>
                            <td>{item.author?.name}</td>
                            <td>{item.price} บาท</td>
                            <td>{item.discout} บาท</td>
                            <td>{item.stock}</td>
                            <td>
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
                <button className="dropdown-item text-danger" type="button" onClick={() => handleClick("delete")}><i className="fas fa-trash"></i> นำออก</button>
            </div>
        </div>
    )
}
