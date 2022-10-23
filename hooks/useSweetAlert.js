import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function useSweetAlert() {
    const MySwal = withReactContent(Swal)

    function success(title, html) {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: html || <i>You clicked the button!</i>,
            icon: 'success'
        })
    }

    function warning(title, html) {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: html || <i>You clicked the button!</i>,
            icon: 'warning'
        })
    }

    function error(title, html) {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: html || <i>You clicked the button!</i>,
            icon: 'error'
        })
    }

    function info(title, html) {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: html || <i>You clicked the button!</i>,
            icon: 'info'
        })
    }

    function toast(icon, title) {

        const Toast = MySwal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', MySwal.stopTimer)
                toast.addEventListener('mouseleave', MySwal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icon || 'success',
            title
        })
    }

    return { success, warning, error, info, toast }
}
