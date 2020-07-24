import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>

      </Head>
      <div>{props.data}</div>
      <style jsx>{`
    `}</style>
    </Layout>
  )
}


export async function getServerSideProps(context) {
    let server=process.env.NEXT_PUBLIC_SERVER
    let response = await fetch(server+'/test')
    // let data = await response.json()
    return {
      props: {"data":response}, // will be passed to the page component as props
    }
  }