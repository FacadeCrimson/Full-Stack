import React from 'react';


class Navbar extends React.Component{
  render(){
    return <div className = "navbar"></div>
  }
}

class Main extends React.Component{
  render(){
    return <div id = "main"></div>
  }
}

class Main1 extends React.Component{
  render(){
    return <div id = "main1"></div>
  }
}

class Main2 extends React.Component{
  render(){
    return <div id = "main2" ></div>
  }
}

class Main3 extends React.Component{
  // translate(5vw)
  render(){
    // const main2Style ={
    //   backgroundColor: "green",
    // }
    return <div id = "main3"></div>
  }
}

class Sidebar extends React.Component{
  render(){
    return <div className = "sidebar"></div>
  }
}

class First extends React.Component{
  render(){
    
    
    return <div className = "first">
      <Navbar />
      <Main />
      <Main1 />
      <Main2 />
      <Main3 />
      <Sidebar />
    </div>
  }
}

class Second extends React.Component{
  render(){
  return <div className = "second"></div>
  }
}

function App() {
  
  return (
    <>
    <First />
    <Second />
    </>
  )
} 

export default App;
