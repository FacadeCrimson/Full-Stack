import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { useAuth0 } from '../components/react-auth0-spa'
import Link from 'next/link'

export default function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState();
  const { getTokenSilently } = useAuth0();

  const fetchData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    const token = await getTokenSilently()

    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    }

    let res = await fetch(`${baseUrl}/test`, requestOptions)
    let data = await res.text()
    await setPeople(data)
    await setIsLoading(false)
  }

  useEffect( () => { fetchData(); }, [] );
  
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>

            </Head>
            <div>{isLoading?<div>Loading...</div>:<div>{people}</div>}</div>
            <style jsx>{`
            `}</style>
        </Layout>
    )
}