import Head from 'next/head'
import Link from 'next/link'
import useGetData from '../lib/useGetData'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import Layout, { siteTitle } from '../components/layout'
import Temp from '../components/temp'
import Itemcard from '../components/itemCardHorizontal'
import Loading from './loading'

function User() {
    const { user } = useAuth0()
    const { email } = user
    const params = {email:email}
    const response = useGetData('/getcart',params)
    return (!response?<Temp></Temp>:
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="profile">
                <div className="viewrow">
                    {response}
                </div>
            </div>
            
            <style jsx>{`
                .profile{
                    width:1200px;
                    margin:20px auto;
                }
                .title{
                    height:100px;
                    padding:20px;
                }
                .title h2{
                    display:inline-block;
                    margin:20px 30px;
                    
                }
                .title img{
                    height:100%;
                }
                .viewrow{
                    width:100%;
                    height:200px;
                    border: 1px solid grey;
                    margin:10px 0 ;
                }
                .item{
                    height:160px;
                    margin-top:10px;
                    overflow:scroll;
                    overflow-y: hidden;
                    white-space:nowrap;
                    
                }
            `}</style>
        </Layout>
    )
}

export default withAuthenticationRequired(User, {
    onRedirecting: () => <Loading></Loading>,
    loginOptions: {
        appState: {
            targetUrl:'/cart'
        }
      }
}
)