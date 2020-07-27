import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

export default function useGetData(path){
    const [data, setData] = useState()
    const { getAccessTokenSilently } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    
    useEffect(() => {
        async function fetchData() {
            const token = await  getAccessTokenSilently()
            var myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${token}`)
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            }
            let res = await fetch(`${baseUrl}${path}`, requestOptions)
            let json = await res.json()
            setData(json.data)
        }
        fetchData()
      }, [])
    return data
  }