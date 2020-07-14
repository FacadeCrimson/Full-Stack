import Head from 'next/head'
import Layout,{topnavi}  from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
    return (
      <Layout>
        <Head>
        <title>{postData}</title>
      </Head>
      <div className={`${utilStyles.mainleft} ${utilStyles.maintop}`}>

      </div>
      <div className={`${utilStyles.mainright} ${utilStyles.maintop}`}>

      </div>
      <div className={`${utilStyles.mainleft} ${utilStyles.mainbottom}`}>

      </div>
      <div className={`${utilStyles.mainright} ${utilStyles.mainbottom}`}>

      </div>

      <style jsx>{`
      …
    `}</style>
      </Layout>
    
    )
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
    // const res = await fetch('..')
    // return res.json()
    const postData = params.navi
    return {
      props: {
        postData
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