import Head from 'next/head'
import Layout from '../../components/layout'


export default function Post({path,vegetables}) {
    return (
      <Layout>
        <Head>
        <title>{path}</title>
      </Head>
      </Layout>
      )}


    export async function getStaticPaths() {
        let server=process.env.NEXT_PUBLIC_SERVER
        let response = await fetch(server+"/products")
        let data = await response.json()
        const paths = data.map(data => {
        return {
            params: {
            name: data.name
            }
        }
        })
    return {
        paths,
        fallback: false
    }
    }
    
    export async function getStaticProps({ params }) {
    let server=process.env.NEXT_PUBLIC_SERVER
    // let response = await fetch(server+"/products")
    // let data = await response.json()
    
    const path = params.name
    return {
        props: {
        path,
        }
    }
    }