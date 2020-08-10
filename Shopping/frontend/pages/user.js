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
    return !response?<div></div>:
    <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="profile">
                <div className="title">
                    <img src={user.picture} alt="Profile" className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"/>
                    <h2>Welcome {response.username} !</h2>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Most Recent View History</div>
                    <div className="item"> {response.history.slice(response.history.length>20?history.length-20:0).reverse().map(data=><Itemcard name={data.name} img={data.img} price={data.price} ratings={data.ratings}></Itemcard> )}</div>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Shopping Cart<div className="redirect"><Link href='/cart'><a>Manage Cart</a></Link></div></div>
                    <div className="item">{response.cart.map(data=><Itemcard name={data.product_id.name} img={data.product_id.img} price={data.product_id.price} ratings={data.product_id.ratings}></Itemcard> )}</div>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Previous Orders</div>
                    <div className="item">{}</div>
                </div>
                <div className="viewrow">
                    <div className="subtitle">Options</div>
                    <div className="item"><Link href='/cart'><a>Modify Infomation</a></Link>&nbsp;&nbsp;&nbsp;<Link href='/cart'><a>Delete Account</a></Link></div>
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
                    height:220px;
                    margin:20px 0;
                    box-shadow: 0px 0px 20px #606060;
                    border-radius:15px;
                    padding:10px 10px;
                }
                .redirect{
                    display:inline-block;
                    float:right;
                }
                .item{
                    height:160px;
                    margin-top:10px;
                    display: flex;
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