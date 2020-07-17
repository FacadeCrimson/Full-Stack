import Head from 'next/head'
import React from 'react';
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default class Management extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          current:0
        };
      }
    handleClick(i){
        this.setState({current:i})
        const navi=document.querySelectorAll(".active")
        navi.forEach(item=>item.classList.remove("active"))
        const selected=document.getElementById(i.toString())
        selected.classList.add("active")
    }

    renderSwitch(param) {
        switch(param) {
            case 1:
              return <Statistic></Statistic>
              break;
            case 2:
              return <Listing></Listing>
              break;
            case 3:
              return <Stock></Stock>
            default:
              return <Main></Main>
            }
    }

    render(){
        return (
            <>
            <Head>
            <link rel="icon" href="/shop.png" />
            <title>Management Portal</title>
            </Head>
            <div className="portal">
                <div className="portalnavi">
                    <div id="header">
                        <div id="logo"><img src="/logo.png" alt="Logo"/></div>
                        <div id="name">Shopping</div>
                    </div>
                        <ul id="navlist">
                            <li id="0" onClick={()=>this.handleClick(0)}>Main</li>
                            <li id="1" onClick={()=>this.handleClick(1)}>Statistic</li>
                            <li id="2" onClick={()=>this.handleClick(2)}>Listing</li>
                            <li id="3" onClick={()=>this.handleClick(3)}>Stock</li>
                            <li id="4" onClick={()=>this.handleClick(4)}>Logout</li>
                        </ul>
                </div>
                <div className="portalcontent">
                         {this.renderSwitch(this.state.current)}
                </div>
            </div>
            <style jsx>{`
                .portal{
                    width:1500px;
                    height:1000px;
                    margin:50px auto;
                    box-shadow: 0px 0px 10px #606060;
                    border-radius:20px;
                    overflow: hidden;
                } 
                .portalnavi{
                    width:200px;
                    height:100%;
                    background-color:white;
                    float: left;
                    border-right:1px solid #909090;
                }
                #header{
                    display:flexbox;
                    flex-direction:row;
                    width:100%;
                    height:80px;
                    padding:10px 10px;
                }
                #logo{
                    width:50px;
                }
                #name{
                    font-size:26px;
                    padding:5px 15px;
                }
                ul{
                    margin-left:-40px;
                }
                ul > .active {
                    background-color:#606060;
                    color:white;
                }
                li{
                    font-size:20px;
                    padding:10px 30px;
                }
                li:hover{
                    background-color:#606060;
                    color:white;
                    cursor:pointer;
                }
                .portalcontent{
                    width:auto;
                    height:100%;
                }
            `}</style>
    
            </>
        )
    }
    
}

class Main extends React.Component{
    render(){
        return <div>Main</div>
    }

}
class Statistic extends React.Component{
    render(){
        return <div>Statistic</div>
    }

}

class Listing extends React.Component{
    render(){
        return <><div>Listing</div>
        <ul>
            <li>Info Update</li>
            <li>Add Item</li>
            <li>Remove Item</li>
            <li></li>
        </ul>
        <div><form action="http://127.0.0.1:5000/img" method="post" enctype="multipart/form-data">
          <label>Name <input type="text" name="imgname"></input></label>
          <label>Category <input type="text" name="category"></input></label>
            <input type="file" name="avatar" />
            <input type="submit"></input>
        </form></div>
        
        </>
    }

}

class Stock extends React.Component{
    render(){
        return <div>Stock</div>
    }

}
