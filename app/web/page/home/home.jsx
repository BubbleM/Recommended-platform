import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
// import List from 'component/home/list.jsx';
import ProdBanner from 'component/banner/prodbanner.jsx';
import AttrBanner from 'component/banner/attrbanner.jsx';
import './home.sass';
export default class Home extends Component {
  componentDidMount() {
  }

  render() {
    return <div className="home_wrap">
      <Header></Header>
      <div className="content">
        <ProdBanner data={this.props.bgInfo[0]}/>
        <AttrBanner data={this.props.attrInfo}/>
        <ProdBanner data={this.props.bgInfo[1]}/>
        <ProdBanner data={this.props.bgInfo[2]}/>
        {/* <div className="page-container page-component">
          <List list={this.props.list}></List>
        </div> */}
      </div>
      <footer>
        <span>Amazing基于Node.js和React的数据推荐平台©2018展示专用</span><br/><br/>
        <span>
          <a href="/registerPage">注册&nbsp;|&nbsp;</a>
          <a href="/loginPage">登录&nbsp;|&nbsp;</a>
          <a href="">关于我们&nbsp;|&nbsp;</a>
          <a href="">功能&nbsp;|&nbsp;</a>
          <a href="">隐私权政策&nbsp;|&nbsp;</a>
          <a href="">服务条款</a>
        </span>
      </footer>
    </div>;
  }
}