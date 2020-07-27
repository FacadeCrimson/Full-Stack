import Head from 'next/head'
import Link from 'next/link'
import useFetchData from '../lib/getreq'
import Layout, { siteTitle } from '../components/layout'

export default function User() {
    const data= useFetchData('/test')
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div>{!data?<div>Loading...</div>:<div>{data}</div>}</div>
            <style jsx>{`
            `}</style>
        </Layout>
    )
}