import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'

export const siteTitle = 'One-stop Grocery'
export const topnavi = ["Vegetable","Fruit","Meat","Grain","Dairy","Drink"]

export default function Layout({ children }) {
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
          <div id={styles.cart}><img src="/supermarket.png" alt="Logo"/></div>
          <div id={styles.login}><Link href="/login"><a>Login/Signup</a></Link></div>
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
          <a>About</a>
          <a>Acknowledgement</a>
          <a>Contact</a>
          <a>Feedback</a>
          <Link href="/management" >
              <a>Management</a>
          </Link>
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
};