import { useContext } from "react"
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import useSweetAlert from '../hooks/useSweetAlert'
import Axios from '../components/Axios'

export default function useCart() {
    const authenContext = useContext(AuthenContext)
    const userContext = useContext(UserContext)
    const SweetAlert = useSweetAlert()

    async function addCard(productid, quantity) {
        try {
            if (!authenContext.isLogin) {

                SweetAlert.warning("กรุณาเข้าสู่ระบบ", "กรุณาเข้าสู่ระบบก่อนทำรายการ")
                return
            }
            const payload = {
                productid: productid,
                username: userContext.user.username,
                quantity: quantity
            }
            const res = await Axios.post("/cart/createCart", payload)
            const data = await res.data

            if (data) {
                SweetAlert.toast("success", "เพิ่มสินค้าลงตะกร้าสำเร็จ")
            }

        } catch (error) {
            console.error(error)
        }
    }


    return { addCard }
}                                   