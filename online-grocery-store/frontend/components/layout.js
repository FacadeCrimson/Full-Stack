import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import Logout from './logout'
import Login from './login'

export const siteTitle = 'One-stop Grocery'
export const topnavi = ["Vegetable","Fruit","Meat","Grain","Dairy","Drink"]

export default function Layout({ children }) {
  const { isAuthenticated} = useAuth0()
  
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/shop.png" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap" rel="stylesheet"></link>
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
          <Link href="/cart" ><div id={styles.cart}><img src="/supermarket.png" alt="Logo"/></div></Link>
          <div id={styles.login}>
          {isAuthenticated ? (<Logout></Logout> ):(<Login></Login>)}
          </div>
          <div id={styles.search}>
            <div id={styles.searchicon}>&#x1F50D;</div>
            <div id={styles.searchbar}><input type="text"></input></div>
            </div>
      </header>
      <header className={styles.header} className={styles.category}>
          {
            topnavi.map(topnavi=>{
              return <Topnavi name={topnavi} key={topnavi}></Topnavi>
            })
          }
      </header>
      <main>{children}</main>
      <footer>
        <div className={`${styles.category} ${styles.footer}`}>
        <Link href="/about" ><a>About</a></Link>
        <Link href="/acknowledgement" ><a>Acknowledgement</a></Link>
        <Link href="/contact" ><a>Contact</a></Link>
        <Link href="/feedback" ><a>Feedback</a></Link>
        <Link href="/user" ><a>User</a></Link>
        <Link href="/management" ><a>Management</a></Link>
        </div>
        <div className={`${styles.category} ${styles.footer}`}>© 2020 One-stop Grocery</div>
      </footer>
    </div>
  )
}

class Topnavi extends React.Component{
  render(){
    return(
    <div className="topnavi"><Link href="/category/[navi]" as={`/category/${this.props.name}`}><a>{this.props.name}</a></Link></div>
    )
  }
}
