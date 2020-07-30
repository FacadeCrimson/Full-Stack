import Head from 'next/head'
import Link from 'next/link'
import useGetData from '../lib/useGetData'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import Layout, { siteTitle } from '../components/layout'
import Loading from './loading'

function User() {
    const data= useGetData('/test')
    const { user } = useAuth0()
    const { name, picture, email } = user
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <img src={picture} alt="Profile" className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"/>
            <h2>{name}</h2>
            <p>{email}</p>
            <div>{JSON.stringify(user, null, 2)}</div>
            <div>{!data?<div>Loading...</div>:<div>{data.data}</div>}</div>
            <style jsx>{`
            `}</style>
        </Layout>
    )
}

export default withAuthenticationRequired(User, {
    onRedirecting: () => <Loading></Loading>,
    loginOptions: {
        appState: {
            targetUrl:'/user'
        }
      }
}
)