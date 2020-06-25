import React from 'react';

class Navbar extends React.Component{
  render(){
    return <div className = "navbar">
      <Navitem name="My education"/>
    </div>
  }
}

class Navitem extends React.Component{
  render(){
  return <div className = "navitem">{this.props.name}</div>
  }
}

class Main extends React.Component{
  render(){
    return <div id= "main">
      <h1>Simon Tan's Personal Website</h1>
      <Contact />
    </div>
  }
}

class Contact extends React.Component{
  render(){
    return <div className ="contact">
      <h3>Contact me</h3>
      <ul className="contactmethod">
        <li>Email: simontan@gwu.edu</li>
        <li>Phone: 571-224-8268</li>
        <li>Github: <a href="https://github.com/FacadeCrimson">github.com/FacadeCrimson</a></li>
      </ul>
    </div>
  }
}

class Main1 extends React.Component{
  render(){
    return <div id = "main1" onMouseOver={()=>this.props.onMouseOver()} onMouseLeave={()=>this.props.onMouseLeave()} style={this.props.style1}>
      <span className = "mainlabel" >About Me</span>
      <span className = "maintext" style={this.props.styleText}>"How are you?"</span>
      </div>
  }
}

class Main2 extends React.Component{
  render(){
    return <div id = "main2" onMouseOver={()=>this.props.onMouseOver()} onMouseLeave={()=>this.props.onMouseLeave()} style={this.props.style2}>
      <span className = "mainlabel" >My Experience</span>
      <span className = "maintext" style={this.props.styleText}>"How are you?"</span>
      </div>
  }
}

class Main3 extends React.Component{
  render(){
    return <div id = "main3" onMouseOver={()=>this.props.onMouseOver()} onMouseLeave={()=>this.props.onMouseLeave()} style={this.props.style3}>
      <span className = "mainlabel" >My Tech Stack</span>
      <span className = "maintext" style={this.props.styleText}>"How are you?"</span>
      </div>
  }
}

class Main4 extends React.Component{
  render(){
    return <div id = "main4" onMouseOver={()=>this.props.onMouseOver()} onMouseLeave={()=>this.props.onMouseLeave()} style={this.props.style4}>
      <span className = "mainlabel" >My Hobby</span>
      <span className = "maintext" style={this.props.styleText}>"How are you?"</span>
      </div>
  }
}

class Sidebar extends React.Component{
  render(){
    return <div className = "sidebar"></div>
  }
}

class First extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      current:undefined,
      style1:{},
      style2:{},
      style3:{},
      style4:{},
      styleText:{},
    };
  }

  changeStyle = (i)=>{
    var trans = 'scale(1)';
    var style ="style"+i.toString()
    this.setState({[style]: {transform:trans}, styleText:{opacity:1},current:i});
    for(var j=1;j<5;j++){
      if(j!==i){
        var otherStyle ="style"+j.toString()
        this.setState({[otherStyle]:{opacity:0}})
      }
    }
  }

  resetStyle =(i)=>{
    var trans = 'scale(1.25) rotate(36.85deg) translate('+(i*3-3).toString()+'vw,'+(i*4-4).toString()+'vw)';
    var style ="style"+i.toString()
    this.setState({[style]: {transform:trans}, styleText:{},current:undefined});
    for(var j=1;j<5;j++){
      if(j!==i){
        var otherStyle ="style"+j.toString()
        this.setState({[otherStyle]:{opacity:1}})
      }
    }
  }
  
  handleMouseOver(i){
    this.timeID = setTimeout(this.changeStyle, 1000,i);
  }

  handleMouseLeave(i){
    clearTimeout(this.timeID);
    if(this.state.current){
      this.resetStyle(i);
    }
  }

  render(){
    return <div className = "first">
      <Navbar />
      <Main />
      <Main1 onMouseOver={()=>this.handleMouseOver(1)} onMouseLeave={()=>this.handleMouseLeave(1)} style1={this.state.style1} styleText={this.state.current===1 ? this.state.styleText : {}}/>
      <Main2 onMouseOver={()=>this.handleMouseOver(2)} onMouseLeave={()=>this.handleMouseLeave(2)} style2={this.state.style2} styleText={this.state.current===2 ? this.state.styleText : {}}/>
      <Main3 onMouseOver={()=>this.handleMouseOver(3)} onMouseLeave={()=>this.handleMouseLeave(3)} style3={this.state.style3} styleText={this.state.current===3 ? this.state.styleText : {}}/>
      <Main4 onMouseOver={()=>this.handleMouseOver(4)} onMouseLeave={()=>this.handleMouseLeave(4)} style4={this.state.style4} styleText={this.state.current===4 ? this.state.styleText : {}}/>
      <Sidebar />
    </div>
  }
}

class MainBottom extends React.Component{
  render(){
    return <div id = "mainbottom"></div>
  }
}

class Second extends React.Component{
  render(){
  return <div className = "second">
    <Navbar />
    <MainBottom />
    <Sidebar />
  </div>
  }
}

function App() {
  
  return (
    <div>
    <First />
    <Second />
    </div>
  )
} 

export default App;
