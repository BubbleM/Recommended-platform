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
        <form action="/register" method="GET" encType="multipart/form-data">
          <p>手机号: <input type="text" placeholder="请输入手机号" name="phone"/></p>
          <p>昵称: <input type="text" placeholder="请输入用户名" name="username"/></p>
          <p>密码: <input type="password" placeholder="请输入密码" name="pwd"/></p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>;
  }
}