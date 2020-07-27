import '../styles/global.css'
import { Auth0Provider } from '../components/react-auth0-spa'

export default function App({ Component, pageProps }) {
    return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    client_id={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    client_secret={process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}
    audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    redirect_uri={process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL}
  ><Component {...pageProps} />
  </Auth0Provider>
    
  }