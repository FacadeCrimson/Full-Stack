import Head from 'next/head'
import { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Login() {
  return (<>
    <div className={utilStyles.headingLg}>
    <div id={utilStyles.logo}><img src="/logo.png" alt="Logo"/></div>
    <div id={utilStyles.name}>Shopping</div>
    </div>
    <div className={utilStyles.loginform}>
        <div></div>
    </div>
    <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
    </>
  )
}