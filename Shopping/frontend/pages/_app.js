import '../styles/global.css'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Auth0Provider } from '@auth0/auth0-react'


export default function App({ Component, pageProps }) {
    // const router = useRouter()
    // const [paths,setPaths] = useState([])
    // useEffect(
    //   setPaths(()=>{paths.push(router.paths)},[router.paths])
    // )
    // const onRedirectCallback = (appState) => {
    //   router.push('/user')
    // }
    return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    redirectUri={process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL}
  ><Component {...pageProps} />
  </Auth0Provider>
  }