import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {useState, useEffect } from 'react'
import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  useEffect(() => {
    async function fetchData() {
        let server=process.env.NEXT_PUBLIC_SERVER
        let res = await fetch(server+"/allproducts")
        let json = await res.json()
        console.log(json)
    }
    fetchData()
  }, []

  )
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>

      </Head>
      <App></App>
      <style jsx>{`
    `}</style>
    </Layout>
  )
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