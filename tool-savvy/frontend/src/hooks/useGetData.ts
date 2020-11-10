import { useEffect } from 'react'

export default function useGetData(url:string,action:[Function,Function,Function],dispatch:any) {
    useEffect(()=>{
        async function getData(){
                dispatch(action[0]())
                try {
                  const response = await fetch(url)
                  const d = await response.json()
                  dispatch(action[1](d))
                } catch (error) {
                  dispatch(action[2]())
                }       
        }
        getData()
    },[])
}