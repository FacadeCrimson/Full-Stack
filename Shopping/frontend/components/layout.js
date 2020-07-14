import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Website name'
export const siteTitle = 'Grocery'

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
          <div id={styles.name}>{siteTitle}</div>
          <div id={styles.cart}><img src="/supermarket.png" alt="Logo"/></div>
          <div id={styles.login}><Link href="/login"><a>Login/Signup</a></Link></div>
          <div id={styles.search}>
            <div id={styles.searchicon}>&#x1F50D;</div>
            <div id={styles.searchbar}><input type="text"></input></div>
            </div>

      </header>
      <header className={styles.header} id={styles.category}>
          <div>Women</div>
          <div>Shoes</div>
          <div>Bags&Assesories</div>
          <div>Beauty</div>
          <div>Men</div>
          <div>Kids</div>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}


// className={`${styles.headerImage} ${utilStyles.borderCircle}`}
// <h2 className={utilStyles.headingLg}>
// <Link href="/">
//   <a className={utilStyles.colorInherit}>{name}</a>
// </Link>
// </h2>