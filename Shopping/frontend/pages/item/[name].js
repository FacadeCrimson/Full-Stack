import Head from 'next/head'
import Layout from '../../components/layout'
import {useAuth0} from "@auth0/auth0-react"
import {useState, useEffect } from 'react'
import starGenerator from '../../lib/starGenerator'

export default function Post({name,item}) {
    const { user, getAccessTokenSilently } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    const [form,setForm] = useState("")
    const [quantity,setQuantity] = useState(0)
    
    useEffect(() => {
        async function fetchData() {
            if(user){
                const { email } = user 
                const body ={
                    "email":email,
                    "id":item._id
                }
                let myHeaders = new Headers()
                myHeaders.append('Content-Type','application/json')
                const requestOptions = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: myHeaders,
                redirect: 'follow'
                }
                await fetch(`${baseUrl}/history`, requestOptions)
            }
        }
        fetchData()
      }, [user]
     )

    const handleSubmit=async (event)=>{
        event.preventDefault()
        if(!user){
            alert("Please log in to comment!")
            return
        }
        const token = await getAccessTokenSilently()
        const url=process.env.NEXT_PUBLIC_SERVER+"/comment"
        let myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${token}`)
        myHeaders.append('Content-Type','application/json')
        const requestOptions = {
        method: 'POST',
        body: JSON.stringify({"itemid":item._id,"comment":form,"date":new Date(),"email":user.email}),
        headers: myHeaders,
        redirect: 'follow'
        }
        let res = await fetch(`${url}`, requestOptions)
        let json =await res.json()
        setForm("")
        if(json.data==="OK"){
            return
        }
        alert("Comment posting failed.")
        return
      }


    const handleChange=(event)=>{
        const tvalue=event.target.value
        setForm(tvalue)
        return
    }

    const handleQuantityChange=(event)=>{
        const tvalue=event.target.value
        setQuantity(tvalue)
        return
    }

    const handleQuantitySubmit=async (event)=>{
        event.preventDefault()
        const token = await getAccessTokenSilently()
        const url=process.env.NEXT_PUBLIC_SERVER+"/cart"
        let myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${token}`)
        myHeaders.append('Content-Type','application/json')
        const requestOptions = {
        method: 'POST',
        body: JSON.stringify({"itemid":item._id,"name":item.name,"quantity":quantity,"email":user.email}),
        headers: myHeaders,
        redirect: 'follow'
        }
        let res = await fetch(`${url}`, requestOptions)
        let json =await res.json()
        setQuantity(0)
        if(json.data==="OK"){
            return
        }
        alert("Adding to cart failed.")
        return
    }

    return (
        <Layout>
            <Head>
                <title>{name}</title>
            </Head>
            <div className="main"> 
                <div className="firstrow">
                    <div className="img"><img src={baseUrl+item.img}></img></div>
                    <div className="text">
                        <h2>{item.name}</h2>
                        <div>{item.category} {item.tag}</div>
                        <div>$ {item.price}</div>
                        <div>{starGenerator(item.ratings)} {item.ratings.length} ratings</div>
                        {user && <form id="quantityselect" onSubmit={handleQuantitySubmit}><input id="quantity" type="text" type="number" min="0" value={quantity} onChange={handleQuantityChange}></input><button type="submit">Add to cart</button></form>}
                        <h3>info</h3>
                        <div>
                            <div>size: {item.info.size}</div>
                            <div>weight: {item.info.weight}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Description</h2>
                        <div>{item.info.description}</div>
                    </div>
                    <div className="comments">
                    {item.comments.map(comment=><Comment key={comment.time} {...comment}></Comment>)}
                    </div>
                    
                        <form id="commentinput" onSubmit={handleSubmit}>
                        <h3>Leave your comments</h3>
                        <textarea onChange={handleChange} value={form}></textarea>
                        <button type="submit" value="Submit">Submit</button>
                        </form>
                        
                </div>

            </div>
            <style jsx>{`
                .main{
                    width:1200px;
                    margin:20px auto;
                }
                .firstrow{
                    width:100%;
                    height:500px;
                    display: flex;
                }
                .img{
                    width:50%;
                    height:100%;
                    padding:20px;
                    flex: 50%;
                }
                .img img{
                    height:100%;
                }
                .text{
                    width:50%;
                    height:100%;
                    padding:20px 50px;
                    flex: 50%;
                    text-align:right;
                }
                #quantity{
                    margin:20px 10px;
                    display: inline-block;
                    font-size:20px;
                }
                #quantityselect{
                    margin-top:10px;
                }
                #commentinput{
                    width:100%;
                    padding:50px;
                }
                textarea{
                    width:100%;
                    height:200px;
                    padding:10px;
                    font-size:20px;
                }
                button{
                    background-color:#51a9ff;
                    border:none;
                    border-radius: 10px;
                    color: white;
                    margin:10px;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    cursor: pointer;
                    float:right;
                  }
                  .comments{
                      padding:40px;
                  }
            `}</style>
        </Layout>
      )}

export async function getStaticPaths() {
    let server=process.env.NEXT_PUBLIC_SERVER
    let response = await fetch(server+"/allproducts")
    let data = await response.json()
    const paths = data.map(data => {
    return {
        params: {
        name: data.name,
        }
    }
    })
return {
    paths,
    fallback: false
}
}
    
export async function getStaticProps({ params }) {
    let server=process.env.NEXT_PUBLIC_SERVER 
    const name = params.name
    const body ={
        "name":name
    }
    let response = await fetch(server+"/productinfo"+"?name="+name)
    let item = await response.json()
return {
    props: {
    name,item
    }
}
}


function Comment(props){
    return <div className="wrapper">
                <div className="identifier"><div id="name">{props.name}</div><div id="time">{props.time}</div></div>
                <div id="content">{props.content}</div>
                <style jsx>{`
                .identifier{
                    width:100%;
                    height:20px;
                }
                #name{
                    float:left;
                }
                #time{
                    float:right;
                }
                #content{
                    padding:0 60px;

                }
                .wrapper{
                    padding:10px 10px;
                }
                div.wrapper:nth-child(2n+1){
                    background-color:#d4ebf2;
                }

                  }
            `}</style>
            </div>
}