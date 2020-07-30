import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { getStaticProps } from './category/[navi]'

export default function Login() {
  const { user, getAccessTokenSilently } = useAuth0()
  const [response,setResponse] = useState()
  const [form,setForm] = useState({"Name":"","Username":"","Gender":"","Email":user.email,"Phone":"","Address":""})

  const handleSubmit=async (event)=>{
    event.preventDefault()
    const warning=await formCheck()
    if(warning){
      return}
    const token = await getAccessTokenSilently()
    const url=process.env.NEXT_PUBLIC_SERVER+"/signup"
    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append('Content-Type','application/json')
    var requestOptions = {
    method: 'POST',
    body: JSON.stringify(form),
    headers: myHeaders,
    redirect: 'follow'
    }
    let res = await fetch(`${url}`, requestOptions)
    setResponse(res)
    return
  }

  const handleChange=(event)=>{
    const tid=event.target.id
    const tvalue=event.target.value
    setForm({
      ...form,
      [tid]:tvalue
    })
  }

  const formCheck =async ()=>{
    const warning=document.getElementById('warning')
    var message=""
    if(!form.Name){message=message+"Name field required!  "}
    if(!form.Username){message=message+"Name field required!  "}
    if(!form.Gender){message=message+"Name field required!  "}
    if(!form.Email){message=message+"Name field required!  "}
    if(!form.Phone){message=message+"Name field required!  "}
    if(!form.Address){message=message+"Name field required!  "}
    warning.style.display="block"
    warning.innerHTML=message
    if (message){
      return true
    }
    return false
  }

  return (<Layout>
            <Head>
              <title>{siteTitle}</title>
            </Head>
            <div className="loginform">
                <div className="title">Finish Your Registration Process</div>
                <form onSubmit={handleSubmit}>
                  <Formline name="Name" value={form.Name} onChange={handleChange}></Formline>
                  <Formline name="Username" value={form.Username} onChange={handleChange}></Formline>
                  <Formline name="Gender" value={form.Gender} onChange={handleChange}></Formline>
                  <Formline name="Email" value={form.Email} onChange={handleChange}></Formline>
                  <Formline name="Phone" value={form.Phone} onChange={handleChange}></Formline>
                  <Formline name="Address" value={form.Address} onChange={handleChange}></Formline>
                  <div id="warning"></div>
                  <button type="submit" value="Submit">Submit</button>
                </form>
                {!response?<div>OK</div>:<div>{response.data}</div>}
            </div>
            <style jsx>{`
              .loginform{
                width:1000px;
                height:1000px;
                border-radius:15px;
                box-shadow:0px 0px 20px #606060;
                margin:10px auto;
                text-align:center;
                padding:10px;
              }
              .title{
                font-size:40px;
              }
              button{
                background-color:#51a9ff;
                border:none;
                border-radius: 10px;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
              }
              button:hover{
                background-color:#0064c7;
              }
              #warning{
                width:800px;
                margin:auto;
                text-align:left;
                color:red;
                display:none;
              }
            `}</style>
          </Layout>
  )
}

function Formline(props) {
  return <>
          <div className="formline"><label htmlFor={props.name}>{props.name}</label><input type="text" id={props.name} value={props.value} onChange={props.onChange}></input></div>
            <style jsx>{`
                .formline{
                  display:block;
                  width:600px;
                  margin:30px auto;
                }
                .formline label{
                  margin:auto;
                  float:left;
                  width:100px;
                }
                .formline input{
                  width:500px;
                  margin-right:0;
                  font-size:20px;
                  line-height:25px;
                }
            `}</style>
          </>
}