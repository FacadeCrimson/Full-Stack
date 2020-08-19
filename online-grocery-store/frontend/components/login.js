import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

export default function Logout(){
    const { loginWithRedirect } = useAuth0()
    const router = useRouter()

    return <div onClick={() => loginWithRedirect({appState: {targetUrl: router.asPath}})}>Log in</div>
}
