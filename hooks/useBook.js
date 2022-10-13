import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Axios from '../components/Axios';

export default function useBook() {
    const router = useRouter();
    const [categorys, setCategorys] = useState([])
    const [authors, setAuthors] = useState([])
    const [publishers, setPublishers] = useState([])

    async function loadCategory() {
        try {
            const res = await Axios.get(`/category/getcategory`)
            const data = res.data
            setCategorys(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function loadAuthor() {
        try {
            const res = await Axios.get(`/author/getauthor`)
            const data = res.data
            setAuthors(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function loadPublisher() {
        try {
            const res = await Axios.get(`/publisher/getpublisher`)
            const data = res.data
            setPublishers(data)
        } catch (error) {
            console.error(error)
        }


    }

    useEffect(() => {
        loadCategory()
        loadAuthor()
        loadPublisher()
    }, [router.isReady])

    return [categorys, authors, publishers]
}