import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout,{topnavi}  from '../../components/layout'

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page:1,
    };
  }

  render(){
    const number=Array.from(Array(Math.floor(this.props.vegetables.length/12)+1).keys())
    const page=this.props.vegetables.slice((this.state.page-1)*12,this.state.page*12-1)
    return (
      <Layout>
        <Head>
        <title>{this.props.path}</title>
      </Head>
      <div className="main">
      <div className={`mainleft maintop`}>

      </div>
      <div className={`mainright maintop`}>

      </div>
      <div className={`mainleft mainbottom`}>

      </div>
      <div className={`mainright mainbottom`} id="display">
        {
        page.map(item=>
          <Itemcard key={item.id} img={item.img} name={item.name} rating={item.rating} price={item.price}></Itemcard>
        )
        }
        <div className='pagination'>{
          number.map(n=><span key={n+1} className="page" onClick={()=>this.setState({page:n+1})}>{n+1}</span>)
        }
          </div>
      </div>

      </div>
     

      <style jsx>{`
      .main{
        width:1200px;
        margin:auto;
      }
      .mainleft{
        width:200px;
        float:left;
        background-color:purple;

      }
      .maintop{
        height:50px;
      }
      .mainright{
        width:auto;
      }
      .mainbottom{
        min-height:500px;
      }
      .pagination{
        width:auto;
        height:50px;
        background-color:yellow;
        position:absolute;
        bottom:-50px;
        left:1000px;
        text_align:center;
      }
      .page{
        text-decoration: underline;
      }
      .page:hover{
        cursor:pointer;
        color:blue;
      }
    `}</style>
      </Layout>
    
    )
  }

  }
    

class Itemcard extends React.Component{
  render(){
    return(
      <div className="card">
         <Link href="/item/[name]" as={`/item/${this.props.name}`}><img src={this.props.img}></img></Link>
         <Link href="/item/[name]" as={`/item/${this.props.name}`}><a>{this.props.name}</a></Link>
        <div>{this.props.rating}</div>
        <span>$ </span>{this.props.price}
      <style jsx>{`
        .card{
          height:400px;
          width:250px;
          padding:10px;
          padding-top:20px;
          background-color:yellow;
          border:black solid 1px;
          margin:0 41px;
          float:left;
        }
        .card img{
          margin-bottom:20px;
        }
        .card img:hover{
          cursor:pointer;
          transform: scale(1.1);
        }
      `}</style>
      </div>
    )
  }
}

export async function getStaticPaths() {
    const paths = topnavi.map(topnavi => {
        return {
          params: {
            navi: topnavi
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
    let response = await fetch(server+"/products")
    let data = await response.json()
    let vegetables = []
    // calculate rating
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
  
    for(let item of data){
      const rating = item.ratings?average(item.ratings):0
      vegetables.push({
        "id":item._id,
        "img":server+item.img,
        "name":item.name,
        "rating":starGenerator(rating),
        "price":item.price
      })
    }
    const path = params.navi
    return {
      props: {
        path,
        vegetables
      }
    }
 }

 function starGenerator(rating){
  var star=""
  const n=Math.trunc(rating)
  for(let i=0;i<n;i++){
    star=star+"★"
  }
  for(let i=n;i<5;i++){
    star=star+"☆"
  }
  return star
 }

//  react hook
// import useSWR from 'swr'

// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }