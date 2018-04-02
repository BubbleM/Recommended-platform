import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import BgAnimation from 'component/animation/bganimation.js';
import './login.sass';
export default class Home extends Component {
  render() {
    return <div>
      {/* <Header></Header> */}
      <canvas id="myCanvas"></canvas>
      <div className="main">
        {this.props.info ? this.props.info : '登陆'}
        <form action="/login" method="GET">
          <p>手机号: <input type="text" placeholder="请输入手机号" name="phone"/></p>
          {/* <p>昵称: <input type="text" placeholder="请输入用户名" name="username"/></p> */}
          <p>密码: <input type="password" placeholder="请输入密码" name="pwd"/></p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>;
  }
  componentDidMount() {
    BgAnimation('myCanvas');
  }
}