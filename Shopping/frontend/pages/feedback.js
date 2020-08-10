import Head from 'next/head'
import Layout from '../components/layout'

export default function Feedback() {
  
  return (
    <Layout>
      <Head>
        <title>Feedback</title>
      </Head>
      <div id="response">
        <form className="form" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSddmWyx1_aJvYSIxH7sIcquntxErMgQGCygpDT-k152qnHsWA/formResponse" method="post" target="hidden_iframe">
        <label>Title</label>
          <input name="entry.2093844086" type="text" pattern=".{3,}"  required title="3 characters minimum"/>

          <label>Feedback</label>
          <textarea name="entry.315161779" cols="17" rows="5" required ></textarea>

          <label>Email (Optional)</label>
          <input name="entry.1086420941" type="email" />

          <input type="submit" value="Send" />

      </form>

      </div>
      <style>{`
        #response{
            margin:100px 30px;
            padding:20px;
            position:relative;
            text-align:center;
            font-size:30px;
            background:white;
            font-family: cursive;
        }
        
        #response,
        #response::before,
        #response::after {
            box-shadow: 1px 1px 1px rgba(0,0,0,0.25);
            border: 1px solid #bbb;
        }
        
        #response::before,
        #response::after {
            content: "";
            position: absolute;
            height: 95%;
            width: 99%;
            background-color: #eee;
        }
        
        #response::before {
            right: 15px;
            top: 0;
            transform: rotate(-5deg);
            z-index: -1;
        }
        
        #response::after {
            top: -10px;
            right: -5px;
            transform: rotate(5deg);
            z-index: -2;
        }
        
        input,textarea{
            display:block;
            margin:auto;
            line-height:30px;
            width:300px;
            border:1px solid #606060;
            border-radius:5px;
            resize:none;
        }
        
        input[type="submit"]{
            width:100px;
            margin:auto;
            margin-top:20px;
            padding:5px;
            border:1px solid #606060;
            border-radius:10px;
            font-weight:300;
            color:#000000;
            text-align:center;
            transition: all 1s;
        }
        
        input[type="submit"]:hover{
            color:#FFFFFF;
            background-color:#000000;
        }
      `}</style>
      
    </Layout>
  )
}