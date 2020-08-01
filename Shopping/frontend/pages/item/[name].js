import Head from 'next/head'
import Layout from '../../components/layout'
import {useAuth0} from "@auth0/auth0-react"
import {useEffect } from 'react'
import Loading from '../../components/temp'

export default function Post({name,data}) {
    const { user } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    
    useEffect(() => {
        async function fetchData() {
            if(user){
                const { email } = user 
                const body ={
                    "email":email,
                    "id":data._id
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
                <title>{name}</title>
            </Head>
        </Layout>
      )}

export async function getStaticPaths() {
    let server=process.env.NEXT_PUBLIC_SERVER
    let response = await fetch(server+"/allproducts")
    let data = await response.json()
    const paths = data.map(data => {
    return {
        params: {
        name: data.name,
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
    const name = params.name
    const body ={
        "name":name
    }
    let response = await fetch(server+"/productinfo"+"?name="+name)
    let data = await response.json()
return {
    props: {
    name,data
    }
}
}