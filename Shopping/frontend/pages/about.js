import React from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'

export default function Home(props,user) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>

      </Head>
        <div>{props.data}</div>
        <div>{user.user}</div>
      <App></App>
      <style jsx>{`
    `}</style>
    </Layout>
  )
}


export async function getServerSideProps(context) {
    let server=process.env.NEXT_PUBLIC_SERVER
    let response = await fetch(server+'/test')
    let data = await response.text()
    console.log(data)
    return {
      props: {"data":data}, // will be passed to the page component as props
      user: {"user":response.locals.user}
    }
  }

  const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  }

  const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
  })

  function ThemeTogglerButton() {
    return (
      <ThemeContext.Consumer>
        {({theme, toggleTheme}) => (
          <button
            onClick={toggleTheme}
            style={{backgroundColor: theme.background}}>
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    )
  }


class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleTheme = () => {
        this.setState(state => ({
          theme:
            state.theme === themes.dark
              ? themes.light
              : themes.dark,
        }))
      }
  
      this.state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme,
      }
    }
  
    render() {
      return (
        <ThemeContext.Provider value={this.state}>
          <ThemeTogglerButton />
        </ThemeContext.Provider>
      );
    }
  }