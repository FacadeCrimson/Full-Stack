import Head from 'next/head'
import { useState} from 'react'
import Layout, { siteTitle } from './layout'
import useInterval from '../lib/useInterval'

export default function Loading(){

    const [number, setNumber] = useState(1)
    useInterval(() => {
        setNumber(number + 1)
        if(number>5){
            setNumber(1)
        }
      }, 1000)

    const dot=".".repeat(number)
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="wrapper"><div className="text">Loading<p>{dot}</p></div></div>

        <style jsx>{`
            .wrapper{
                width:100%;
                height:800px;
                background-color:#303030;
                color:white;
                text-align: center;
                align-item:center;
                padding-top:280px
            }
            .text{
                font-size:50px;
            }
        `}</style>
        </Layout>
    )

}