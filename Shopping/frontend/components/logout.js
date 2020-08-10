import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { shroud } from './protected'

export default function Logout(){
    const { logout } = useAuth0()
    const router = useRouter()
    const [path,setPath]=useState(router.asPath)
    const returnTo =process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL

    function logoutWithRedirect(){
        logout({returnTo:returnTo.substring(0,returnTo.length-8)})
        if(shroud.has(path)){
            router.push('/')
        }
        else{
            router.push(path)
        }
    }

    return <div onClick={() =>logoutWithRedirect({})}>Log out</div>  
}