import Head from 'next/head'
import Layout from '../components/layout'
import Article from '../components/article'

export default function About() {
  
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <Article title="About" content={["This is my personal project where I try to realise a Single-Page Application for online grocery store. I build the website and API server from ground up, with self-sufficient log in/out, search, filter, comment, history and cart functions. Authorization code flow implemented using Auth0 with PKCE.",
                                      "The project is developed in Node.js environment. API is facilitated using Express framework and MongoDB database with data models and interactions. The frontend is polished with Next.js and React."]}></Article>
    </Layout>
  )
}