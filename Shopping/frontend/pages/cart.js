import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useState } from 'react'
import useGetData from '../lib/useGetData'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import Layout, { siteTitle } from '../components/layout'
import Temp from '../components/temp'
import Loading from './loading'
import Itemcard from '../components/itemCardHorizontal'
import Message from '../components/message'

function Cart() {
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
                {response.length!==0?response.map(
                item=><Cartitem {...item}></Cartitem>)
            :<Message info="You have nothing in cart yet."></Message>
            }
            </div>
            
            <style jsx>{`
                .profile{
                    width:1000px;
                    margin:20px auto;
                }
            `}</style>
        </Layout>
    )
}

export default withAuthenticationRequired(Cart, {
    onRedirecting: () => <Loading></Loading>,
    loginOptions: {
        appState: {
            targetUrl:'/cart'
        }
      }
}
)

function Cartitem(props){
    const router = useRouter()
    const { user, getAccessTokenSilently } = useAuth0()
    const {quantity,setQuantity} = useState(props.quantity)

    const handleClick=async (event,code)=>{
        event.preventDefault()
        const token = await getAccessTokenSilently()
        if(code===2){
            const url=process.env.NEXT_PUBLIC_SERVER+"/removeItem"
            let myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append('Content-Type','application/json')
            const requestOptions = {
            method: 'POST',
            body: JSON.stringify({"itemid":props.product_id._id,"email":user.email}),
            headers: myHeaders,
            redirect: 'follow'
            }
            let res = await fetch(`${url}`, requestOptions)
            let json =await res.json()
            if(json.data==="OK"){
                router.reload()
                return
            }
                alert("Deleting item failed.")
                router.reload()
                return

        }
        const value = code===0?1:-1
        const url=process.env.NEXT_PUBLIC_SERVER+"/cart"
        let myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${token}`)
        myHeaders.append('Content-Type','application/json')
        const requestOptions = {
        method: 'POST',
        body: JSON.stringify({"itemid":props.product_id._id,"name":props.product_id.name,"quantity":value,"email":user.email}),
        headers: myHeaders,
        redirect: 'follow'
        }
        let res = await fetch(`${url}`, requestOptions)
        let json =await res.json()
        if(json.data==="OK"){
            router.reload()
            return
        }
            alert("Modifying item quantity failed.")
            router.reload()
            return
    }

    return <div className="viewrow" key={props.product_id._id}>
        <div className="col">
            <Itemcard {...props.product_id}></Itemcard>
        </div>
        <div className="col">
            <h3>Total quantity</h3>
            <div>{props.quantity}</div>
            <h3>Total price</h3>
            <div>$ {round(props.product_id.price*props.quantity,2)}</div>
        </div>
        <div className="col" id="buttons">
            <button onClick={()=>handleClick(event,0)}>Add</button>
            <button onClick={()=>handleClick(event,1)} disabled={props.quantity===0?true:false}>Remove</button>
            <button onClick={()=>handleClick(event,2)}>Delete</button>          
        </div>

        <style jsx>{`
                .viewrow{
                    width:100%;
                    height:200px;
                    margin:15px 0;
                    display:flex; 
                }
                .col{
                    height:100%;
                    flex:30%;
                    margin:0 10px;
                    text-align:center;
                }
                .col h3{
                    margin:10px 0;
                }
                .col button{
                    display:block;
                    margin:10px 0;
                    background-color:#51a9ff;
                    border:none;
                    border-radius: 10px;
                    color: white;
                    margin:10px 100px;
                    width:100px;
                    padding: 15px 15px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
                    }
                .col button:disabled{
                    background-color:#606060;
                }
                }
            `}</style>
        
    </div>
}

function round(number, precision) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
    //same as:
    //return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}