import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Layout, { siteTitle } from '../components/layout'

export default function Login() {
  const router = useRouter()
  const { user, getAccessTokenSilently } = useAuth0()
  const [response,setResponse] = useState()
  const [form,setForm] = useState({"Name":"","Username":"","Birthday":{"Year":1900,"Month":1,"Day":1},"Gender":"Male","Email":user?user.email:"","Phone":"","Address":""})

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
    let json =await res.json()
    if(json.data==="OK"){
      setTimeout(() => {
        router.query.path ? router.push({pathname: router.query.path }):router.push({pathname:'/'})
      }, 3000);
    }
    setResponse(json)
    return
  }

  const handleChange=(event)=>{
    const tid=event.target.id
    const tvalue=event.target.value
    if(tid==="Year"||tid==="Month"||tid==="Day"){
        var bday=form.Birthday
        bday[tid]=tvalue
        setForm({
          ...form,
          "Birthday":bday
        })
        return
    }
    setForm({
      ...form,
      [tid]:tvalue
    })
    return
  }

  const formCheck =async ()=>{
    const warning=document.getElementById('warning')
    var message=""
    if(!form.Name){message=message+"Name field required!  "}
    if(!form.Username){message=message+"Username field required!  "}
    if(!form.Gender){message=message+"Gender field required!  "}
    if(!form.Email){message=message+"Email field required!  "}
    if(!form.Phone){message=message+"Phone field required!  "}
    if(!form.Address){message=message+"Address field required!  "}
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
                  <Textinput name="Name" value={form.Name} onChange={handleChange}></Textinput>
                  <Textinput name="Username" value={form.Username} onChange={handleChange}></Textinput>
                  <div className="line">
                    <label>Birthday</label>
                    <Selectinput name="Year" value={form.Birthday.Year} onChange={handleChange} list={numberRange(1900,2020)}></Selectinput>
                    <Selectinput name="Month" value={form.Birthday.Month} onChange={handleChange} list={numberRange(1,13)}></Selectinput>
                    <Selectinput name="Day" value={form.Birthday.Day} onChange={handleChange} list={numberRange(1,32)}></Selectinput>
                    <label>Gender</label>
                    <Selectinput name="Gender" value={form.Gender} onChange={handleChange} list={["Male","Female"]}></Selectinput>
                  </div>
                  <Textinput name="Email" value={form.Email} onChange={handleChange}></Textinput>
                  <Textinput name="Phone" value={form.Phone} onChange={handleChange}></Textinput>
                  <Textinput name="Address" value={form.Address} onChange={handleChange}></Textinput>
                  <div id="warning"></div>
                  <button type="submit" value="Submit">Submit</button>
                </form>
                {response?<div>Your registration is completed!<p>Redirecting...</p></div>:null}
            </div>
            <style jsx>{`
              .loginform{
                width:1000px;
                height:600px;
                border-radius:15px;
                box-shadow:0px 0px 20px #606060;
                margin:10px auto;
                text-align:center;
                padding:20px 10px;
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
              .line{
                width:600px;
                margin:auto;
                text-align:left;
                padding: 0 18px;
              }
            `}</style>
          </Layout>
  )
}

function Textinput(props) {
  return <>
          <div className="Textinput"><label htmlFor={props.name}>{props.name}</label><input type="text" id={props.name} value={props.value} onChange={props.onChange}></input></div>
            <style jsx>{`
                .Textinput{
                  display:block;
                  width:600px;
                  margin:30px auto;
                }
                .Textinput label{
                  float:left;
                  width:100px;
                }
                .Textinput input{
                  width:500px;
                  margin-right:0;
                  font-size:15px;
                  line-height:25px;
                }
            `}</style>
          </>
}

function Selectinput(props) {
  return <>
          <select id={props.name} value={props.value} onChange={props.onChange}>
            <optgroup>
              {props.list.map((item,index)=><option key={index} value={item}>{item}</option>)}
            </optgroup>
          </select>
            <style jsx>{`
              optgroup{
                font-size:30px;
              }
              select{
                margin:0 15px;
              }
            `}</style>
          </>
}

function numberRange(start, end) {
  return new Array(end - start).fill().map((d, i) => i + start);
}