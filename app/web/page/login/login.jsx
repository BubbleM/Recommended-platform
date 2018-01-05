import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import './login.css';
export default class Home extends Component {
  componentDidMount() {
  }

  render() {
    return <div>
      <Header></Header>
      <div className="main">
        登陆
        <form action="">
          <input placeholder='请输入用户名'/>
          <br/>
          <input placeholder='请输入密码'/>
        </form>
      </div>
    </div>;
  }
}