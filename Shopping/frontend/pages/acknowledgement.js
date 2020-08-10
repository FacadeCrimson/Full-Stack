import Head from 'next/head'
import Layout from '../components/layout'
import Article from '../components/article'

export default function Acknowledgement() {
  
  return (
    <Layout>
      <Head>
        <title>Acknowledgement</title>
      </Head>
      <Article title="Acknowledgement" content={["Thanks to MongoDB Atlas, Heroku and Vercel for free hosting!","Thanks to Flaticon for those delicate icons, Unsplash for beautiful pictures and Google Fonts."]}></Article>
    </Layout>
  )
}