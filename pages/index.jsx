import Navbar from '../components/Navbars/Navbar'
import Layout from '../components/Layout'
import Axios from '../components/Axios'

export default function Home(category) {
  return (
    <Layout categorys={category["categorys"]}>
      <h1>HOME</h1>

    </Layout>
  )
}