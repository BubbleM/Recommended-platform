import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import BgAnimation from 'component/animation/bganimation.js';
import './../login/login.sass';
export default class Register extends Component {
  render() {
    return <div>
      {/* <Header></Header> */}
      <div className="sign_container">
        <div className="sign_header">
          <img src="/public/assets/LOGO" alt="logo"/>
          <div className="title">个性化数据推荐平台</div>
        </div>
        <form action="/register" method="GET" encType="multipart/form-data">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-earphone"></i>
              </div>
              <input type="text" className="form-control" name="phone" placeholder="请输入手机号"/>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-earphone"></i>
              </div>
              <input type="text" className="form-control" name="username" placeholder="请输入用户名"/>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-lock"></i>
              </div>
              <input type="password" className="form-control" name="pwd" placeholder="请输入密码"/>
            </div>
          </div>
          <div className="Register-declaration">注册即代表你同意《ImageMark注册协议》</div>
          <div className="form-group">
					  <button type="submit" className="btn btn-primary width100">注册</button>
				  </div>
        </form>
      </div>
      <canvas id="myCanvas"></canvas>
    </div>;
  }
  componentDidMount() {
    BgAnimation('myCanvas');
  }
}