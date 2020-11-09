import { useEffect, useState } from 'react'

export default function useGetData(url:string,action:[Function,Function,Function],dispatch:any) {
    const [data,setData] = useState()
    useEffect(()=>{
        async function getData(dispatch:any){
                dispatch(action[0]())
                try {
                  const response = await fetch(url)
                  const d = await response.json()
                  setData(d)
                  dispatch(action[1](data))
                } catch (error) {
                  dispatch(action[2]())
                }
              
        }
        getData(dispatch)
    })
    return data
}