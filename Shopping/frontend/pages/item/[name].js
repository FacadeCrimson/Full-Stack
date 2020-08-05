import Head from 'next/head'
import Layout from '../../components/layout'
import {useAuth0} from "@auth0/auth0-react"
import {useState, useEffect } from 'react'
import Loading from '../../components/temp'
import starGenerator from '../../lib/starGenerator'

export default function Post({name,item}) {
    const { user, getAccessTokenSilently } = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    const [form,setForm] = useState("")
    
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
                        <br></br>
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
                    {item.comments.map(comment=><Comment {...comment}></Comment>)}
                    
                        <form onSubmit={handleSubmit}>
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
                form{
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
    return <div>
                <div>{props.name}</div><div>{props.time}</div>
                <div>{props.content}</div>
            </div>
}