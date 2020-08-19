import Head from 'next/head'
import Layout from '../components/layout'
import Article from '../components/article'

export default function Contact() {
  
  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <Article title="Contact" content={["My name is Lechen Tan and I am currently a graduate student at George Washington University.","I will graduate by December, 2020 and I am looking for full time job of full stack development.",
    "If you feel impressed or just would like a chat, email me @ simontan@gwu.edu."]}></Article>
    </Layout>
  )
}