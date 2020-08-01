import Head from 'next/head'
import Layout from '../../components/layout'
import {useAuth0} from "@auth0/auth0-react"
import {useEffect } from 'react'
import Loading from '../../components/Temp'

export default function Post({path}) {
    const { user } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    
    useEffect(() => {
        async function fetchData() {
            if(user){
                const { email } = user 
                const body ={
                    "email":email,
                    "path":path
                }
                let myHeaders = new Headers()
                myHeaders.append('Content-Type','application/json')
                const requestOptions = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: myHeaders,
                redirect: 'follow'
                }
                await fetch(`${baseUrl}/history`, requestOptions)
            }
        }
        fetchData()
      }, [user]
     )

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