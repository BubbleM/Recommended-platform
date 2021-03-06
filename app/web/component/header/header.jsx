import React, { Component } from 'react';
import './header.sass';
export default class Header extends Component {

  render() {
    return(
    <header className="header">
      <img src="/public/assets/LOGO" alt="iconlogo"/>
      <ul ref = 'el' className="nav">
        <li className="nav-item"><a href="/">首页</a></li>
        <li className="nav-item"><a href="/homePage">数据上传</a></li>
        <li className="nav-item"><a href="/showPage">结果展示</a></li>
        <li className="nav-item">关于我们</li>
      </ul>
      <div className="login">
        <button className="btn btn-success" role="button"><a href="/loginPage">登陆</a></button>
        <button className="btn btn-success" role="button"><a href="/registerPage">注册</a></button>
      </div>
    </header>
    )
  }

  componentDidMount() {
    var self = this;
    var liNodes = self.refs.el.children;
    if (window.innerWidth > 850) {
      for(let i = 0; i < liNodes.length; i++){
        liNodes[i].onmouseover = function(){
          liNodes[i].style.width = '200px';
        }
        liNodes[i].onmouseout = function(){
          liNodes[i].style.width = '110px';
        }
      }
    }
  }
}
