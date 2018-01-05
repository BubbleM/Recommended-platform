import React, { Component } from 'react';
import './header.css';
export default class Header extends Component {
  componentDidMount() {
    
  }

  render() {
    return <header className="header">
      <div className="container"><h1>
        <a href="/" className="router-link-active">数据推荐平台</a></h1>
      <ul className="nav">
        <li className="nav-item"><a href="/">INDEX</a></li>
        <li className="nav-item"><a href="/home">HOME</a></li>
        <li className="nav-item"><a href="/login">LOGIN</a></li>
        <li className="nav-item"><a href="/register">REGISTER</a></li>
        {/* <li className="nav-item"><a href='/home'>HOME</a></li> */}
        {/* <li className="nav-item"><a href="/client">Client-Render</a></li> */}
        {/* <li className="nav-item"><a href="/css/module">Css-Module</a></li> */}
        {/* <li className="nav-item"><a href="/spa/redux">SPA-CSR</a></li> */}
        {/* <li className="nav-item"><a href="/spa/ssr">SPA-SSR</a></li> */}
      </ul>
      </div>
    </header>;
  }
}
