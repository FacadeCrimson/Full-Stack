import Head from 'next/head'
import Link from 'next/link'
import useGetData from '../lib/useGetData'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import Layout, { siteTitle } from '../components/layout'
import Itemcard from '../components/itemCardHorizontal'
import Loading from './loading'

function User() {
    const { user } = useAuth0()
    const { email } = user
    const params = {email:email}
    const response = useGetData('/check',params)
    return <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="profile">
                <div className="title">
                    <img src={user.picture} alt="Profile" className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"/>
                    <h2>Welcome {response.username} !</h2>
                </div>
                <div className="viewrow">
                    <div className="subtitle">View History</div>
                    <div className="item"> {response.history.map(data=><Itemcard name={data.name} img={data.img} price={data.price} ratings={data.ratings}></Itemcard> )}</div>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Shopping Cart</div>
                    <div className="item">{}</div>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Previous Orders</div>
                    <div className="item">{}</div>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Options</div>
                    <div className="item">Modify Information, Delete Account</div>
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