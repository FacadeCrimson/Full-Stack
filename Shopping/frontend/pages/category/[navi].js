import Head from 'next/head'
import Layout,{topnavi}  from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData,vegetables}) {
    return (
      <Layout>
        <Head>
        <title>{postData}</title>
      </Head>
      <div className="main">
      <div className={`mainleft maintop`}>

      </div>
      <div className={`mainright maintop`}>

      </div>
      <div className={`mainleft mainbottom`}>

      </div>
      <div className={`mainright mainbottom`}>
        {vegetables.map(item=>
          <Itemcard img={item.img} name={item.name} rating={item.rating} price={item.price}></Itemcard>
        )
        }
      </div>

      </div>
     

      <style jsx>{`
      .main{
        width:1500px;
        height:2000px;
        margin:auto;
      }
      .mainleft{
        width:200px;
        float:left;
      }
      .maintop{
        height:30px;
      }
      .mainright{
        width:auto;
      }
      .mainbottom{
        height:auto;
      }
    `}</style>
      </Layout>
    
    )
  }

class Itemcard extends React.Component{
  render(){
    return(
      <div className="card">
        {this.props.img}
        {this.props.name}
        {this.props.rating}
        {this.props.price}
      <style jsx>{`
        .card{
          height:300px;
          width:200px;
          backgroundcolor:yellow;
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
    let response = await fetch(process.env.NEXT_PUBLIC_SERVER+"/products")
    let data = await response.json()
    let vegetables = []
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    for(let item of data){
      vegetables.push({
        "img":item.img,
        "name":item.name,
        "rating":item.rating?average(item.rating):0,
        "price":item.price
      })
    }
    const postData = params.navi
    return {
      props: {
        postData,
        vegetables
      }
    }
 }

//  react hook
// import useSWR from 'swr'

// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }