import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'

const name = 'Website name'
export const siteTitle = 'Grocery'
export const topnavi = ["Woman","Shoes","Bags&Assesories","Beauty","Men","Kids"]

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/shop.png" />
        <meta
          name="description"
          content="A simulated shopping website."
        />
        <meta
          property="og:image"
          content={`../public/images/ogimage.jpg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>  
          <div id={styles.logo}><img src="/logo.png" alt="Logo"/></div>
          <div id={styles.name}><Link href="/"><a>{siteTitle}</a></Link></div>
          <div id={styles.cart}><img src="/supermarket.png" alt="Logo"/></div>
          <div id={styles.login}><Link href="/login"><a>Login/Signup</a></Link></div>
          <div id={styles.search}>
            <div id={styles.searchicon}>&#x1F50D;</div>
            <div id={styles.searchbar}><input type="text"></input></div>
            </div>
      </header>
      <header className={styles.header} id={styles.category}>
          {
            topnavi.map(topnavi=>{
              return <Topnavi name={topnavi} key={topnavi}></Topnavi>
            })
          }
      </header>
      <main>{children}</main>
      <footer>

      </footer>
    </div>
  )
}

class Topnavi extends React.Component{
  render(){
    return(
    <div className="topnavi"><Link href="/topnavi/[navi]" as={`/topnavi/${this.props.name}`}><a>{this.props.name}</a></Link></div>
    )
  }
};