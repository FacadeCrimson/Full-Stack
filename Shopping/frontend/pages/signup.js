import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

export default function Login() {
  const { getAccessTokenSilently } = useAuth0()
  const url=process.env.NEXT_PUBLIC_SERVER+"/signup"
  const [data,setData] = useState()

  const handleSubmit=async ()=>{
    const token = await getAccessTokenSilently()
    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append('Content-Type','application/json')
    var requestOptions = {
    method: 'POST',
    body: '{"data":"OK"}',
    headers: myHeaders,
    redirect: 'follow'
    }
    let res = await fetch(`${url}`, requestOptions)
    setData(res)
  }

  return (<Layout>
            <Head>
              <title>{siteTitle}</title>
            </Head>
            <div className="loginform">
                <div className="title">Finish Your Registration Process</div>
                <form onSubmit={handleSubmit}>
                  <input type="submit" value="Submit" />
                </form>
                {!data?<div>OK</div>:<div>{data.data}</div>}
            </div>
            <style jsx>{`
              .loginform{
                width:1000px;
                height:1000px;
                border-radius:15px;
                box-shadow:0px 0px 20px #606060;
                margin:10px auto;
                text-align:center;
                padding:10px;
              }
              .title{
                font-size:50px;
              }
            `}</style>
          </Layout>
  )
}
