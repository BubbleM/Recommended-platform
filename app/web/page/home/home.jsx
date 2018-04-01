import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
// import List from 'component/home/list.jsx';
import ProdBanner from 'component/banner/prodbanner.jsx';
import AttrBanner from 'component/banner/attrbanner.jsx';
import './home.css';
export default class Home extends Component {
  componentDidMount() {
  }

  render() {
    return <div>
      <Header></Header>
      <div className="main">
        <ProdBanner data={this.props.bgInfo[0]}/>
        <AttrBanner data={this.props.attrInfo}/>
        <ProdBanner data={this.props.bgInfo[1]}/>
        <ProdBanner data={this.props.bgInfo[2]}/>
        {/* <div className="page-container page-component">
          <List list={this.props.list}></List>
        </div> */}
      </div>
    </div>;
  }
}