import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import { useAuth0} from '@auth0/auth0-react'
import Layout, { siteTitle } from '../components/layout'
import useInterval from '../lib/useInterval'

export default function Loading(){
    const router = useRouter()
    const {user,getAccessTokenSilently}=useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    useEffect(()=>{
        async function fetchData() {
        if(router.query){
            if(user){
                const {email} = user
                const url = "/check?email="+email
                const token = await  getAccessTokenSilently()
                var myHeaders = new Headers()
                myHeaders.append("Authorization", `Bearer ${token}`)
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                }
                let res = await fetch(`${baseUrl}${url}`, requestOptions)
                let json = await res.json()
                if(json.status==="fail"){
                    router.replace({pathname: '/signup',query: { path: router.query.path },})
                }
                else{
                    router.replace(router.query.path)
                }
            }
        }
    }   fetchData()
    },[router.query,user])

    const [number, setNumber] = useState(1)
    useInterval(() => {
        setNumber(number + 1)
        if(number>5){
            setNumber(1)
        }
      }, 1000)

    const dot=".".repeat(number)
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="wrapper"><div className="text">Loading<p>{dot}</p></div></div>

        <style jsx>{`
            .wrapper{
                width:100%;
                height:800px;
                background-color:#303030;
                color:white;
                text-align: center;
                align-item:center;
                padding-top:280px
            }
            .text{
                font-size:50px;
            }
        `}</style>
        </Layout>
    )

}