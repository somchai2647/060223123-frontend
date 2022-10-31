import { useContext } from "react"
import AuthenContext from '../contexts/AuthenContext'
import UserContext from '../contexts/UserContext'
import Axios from '../components/Axios'
import { useRouter } from 'next/router'
import useSweetAlert from './useSweetAlert';

export default function useAuthen() {
    const authenContext = useContext(AuthenContext)
    const userContext = useContext(UserContext)
    const alert = useSweetAlert()
    const router = useRouter()

    async function logout() {
        try {

            authenContext.setIsLogin(false)
            userContext.setUser({})
            localStorage.removeItem("token")
            router.push("/")
            alert.toast("success", "ออกจากระบบสำเร็จ")


        } catch (error) {
            console.error(error)
        }
    }

    async function getMe() {
        return userContext.user
    }

    return { logout, getMe }
}
