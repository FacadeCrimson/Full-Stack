import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

export default function useGetData(path,params=""){
    const [data, setData] = useState()
    const { getAccessTokenSilently } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    let url
    if(params){
      const newparams = new URLSearchParams(params)
      url= baseUrl+path+'?'+newparams.toString()
      console.log(url)
    }
    else{
      url= baseUrl+path
    }
    
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
            let res = await fetch(url, requestOptions)
            let json = await res.json()
            setData(json)
        }
        fetchData()
      }, [])
    return data
  }