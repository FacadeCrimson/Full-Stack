import Head from 'next/head'
import Layout,{topnavi}  from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
    return (
      <Layout>
    <Head>
        <title>{postData}</title>
      </Head>
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
    const postData = params.navi
    return {
      props: {
        postData
      }
    }
 }