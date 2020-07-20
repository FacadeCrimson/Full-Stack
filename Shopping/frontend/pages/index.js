import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

export default function Home() {
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
          <div className="subimg1"> <Subimage name="vegetable"></Subimage></div>
          <div className="subimg1"> <Subimage name="fruit"></Subimage></div>
          <div className="subimg1"> <Subimage name="meat"></Subimage></div>
        </div>
        <div id="column2">
          <div className="subimg2"><Subimage name="grain"></Subimage></div>
          <div className="subimg2"> <Subimage name="dairy"></Subimage></div>
          <div className="subimg2"> <Subimage name="drink"></Subimage></div>
          <Link href="/login"><div className="subimg2" id="signup"> <div>Signup Now!</div> <div>Enjoy membership benefits!</div></div></Link>

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
        background-color:purple;
        justify-content: center;
        align-items: center;
        text-align:center;
        font-family: 'Barlow', sans-serif;
        font-size:20px;
        padding-top:80px;
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
    <Link href="/category/[navi]" as={`/category/${props.name}`}><img src={`/images/${props.name}.jpg`}></img></Link>
    <div className="centered">{label.toUpperCase()}</div>
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

// export async function getStaticProps() {
 
// }