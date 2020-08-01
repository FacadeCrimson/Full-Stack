import Head from 'next/head'
import Link from 'next/link'
import useGetData from '../lib/useGetData'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import Layout, { siteTitle } from '../components/layout'
import Temp from '../components/temp'
import Loading from './loading'

function User() {
    const { user } = useAuth0()
    const { email } = user
    const params = {email:email}
    const customer = useGetData('/check',params)
    return (!customer?<Temp></Temp>:
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="profile">
                <div className="title">
                    <img src={user.picture} alt="Profile" className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"/>
                    <h2>Welcome {customer.Username} !</h2>
                </div>
                <div className="viewrow">
                    <div className="subtitle">View History</div>
                    {customer.history.map(data=><div key={data._id}>{data._id}</div>)}
                    <div className="item">{}</div>
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


// var customerSchema = new Schema({
//       orders:[
//         {time:{ type: Date,},
//          products:[{
//           product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//           name:{ type: String, required: true},
//           quantity:{ type: Number, required:true},
//         }]
//         }],
//       history:[{product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}],
//       cart:[{
//         product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//         name:{ type: String, required: true},
//         quantity:{ type: Number, required:true},
//       }]
//   },{timestamps: true})