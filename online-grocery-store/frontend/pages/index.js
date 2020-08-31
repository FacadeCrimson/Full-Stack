import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { useAuth0 } from '@auth0/auth0-react'

export default function Home() {
  const { loginWithRedirect } = useAuth0()
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      </section>
      
      <div className="imggrid">
        <div id="column1">
          <div id="mainimg"><img src="/images/ogimage.jpg"></img></div>
          <div className="subimg1"> <Subimage name="Vegetable"></Subimage></div>
          <div className="subimg1"> <Subimage name="Fruit"></Subimage></div>
          <div className="subimg1"> <Subimage name="Meat"></Subimage></div>
        </div>
        <div id="column2">
          <div className="subimg2"><Subimage name="Grain"></Subimage></div>
          <div className="subimg2"> <Subimage name="Dairy"></Subimage></div>
          <div className="subimg2"> <Subimage name="Drink"></Subimage></div>
          <div className="subimg2" id="signup" onClick={() => loginWithRedirect({screen_hint: "signup",})}> <div>Signup Now!</div> <div>Enjoy membership benefits!</div></div>
        </div>
        

      </div>
      <style jsx>{`
      .imggrid{
        width:1200px;
        height:1200px;
        margin:20px auto;
        display: flex;
        box-shadow: 0px 0px 20px #606060;
      }
      #column1{
        width:900px;
        overflow:hidden;
      }
      #column2{
        width:300px;
      }
      #mainimg{
        width:900px;
        height:900px;
        overflow:hidden;
        position:relative;
      }
      #mainimg img{
        height: 900px;
        position:absolute;
        left: 50%;
        transform: translateX(-45%);
      }
      img:hover{
        transform: scale(1.1);
      }
      .subimg1{
        width:300px;
        height:300px;
        overflow:hidden;
        position:relative;
        display:inline-block;
      }
      .subimg2{
        width:300px;
        height:300px;
        overflow:hidden;
        position:relative;
      }
      #signup{
        background-color:white;
        justify-content: center;
        align-items: center;
        text-align:center;
        font-family: 'Barlow', sans-serif;
        font-size:20px;
        padding-top:90px;
        line-height:2.2;
      }
      #signup:hover{
        cursor:pointer;
        color:skyblue;
      }
    `}</style>
    </Layout>
  )
}

function Subimage(props){
  const label=props.name
  return <div className="wrapper">
    <Link href="/category/[navi]" as={`/category/${label}`}><img src={`/images/${label}.jpg`}></img></Link>
    <Link href="/category/[navi]" as={`/category/${label}`}><div className="centered">{label.toUpperCase()}</div></Link>
     <style jsx>{`
    img{
    height: 300px;
    position:absolute;
    left: 50%;
    transform: translateX(-45%);
  }
  .wrapper:hover > img{
    cursor:pointer;
    opacity:0.5;
    transition:opacity 1s ease;
  }
  .wrapper:hover > .centered{
    z-index:1;
  }
  .centered:hover{
    cursor:pointer;
  }

  .centered{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Barlow', sans-serif;
      font-size:30px;
      z-index:-1;
  }
`}</style>
    </div>
  
}