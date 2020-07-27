import { useAuth0 } from './react-auth0-spa'
import { useState, useEffect } from 'react'

export default function useFetchData(path){
    const [data, setData] = useState()
    const { getTokenSilently } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    
    useEffect(() => {
        async function fetchData() {
            const token = await getTokenSilently()
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