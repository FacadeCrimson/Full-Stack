import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

export default function usePost(path,body){
    const [data, setData] = useState()
    const { getAccessTokenSilently } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    
    useEffect(() => {
        async function fetchData() {
            const token = await  getAccessTokenSilently()
            var myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${token}`)
            var requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: myHeaders,
            redirect: 'follow'
            }
            let res = await fetch(`${baseUrl}${path}`, requestOptions)
            let status = res.status
            setData(status)
        }
        fetchData()
      }, [])
    return data
  }