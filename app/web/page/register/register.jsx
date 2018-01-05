import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import './register.css';
export default class Register extends Component {
  componentDidMount() {
  }

  render() {
    return <div>
      <Header></Header>
      <div className="main">
        注册
        <form action="">
          <input placeholder='请输入用户名'/>
          <br/>
          <input placeholder='请输入密码'/>
        </form>
      </div>
    </div>;
  }
}