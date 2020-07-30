import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { shroud } from './protected'

export default function Logout(){
    const { logout } = useAuth0()
    const router = useRouter()
    const [path,setPath]=useState(router.asPath)

    function logoutWithRedirect(){
        logout()
        if(shroud.has(path)){
            router.push('/')
        }
        else{
            router.push(path)
        }
    }

    return <div onClick={() =>logoutWithRedirect({})}>Log out</div>  
}