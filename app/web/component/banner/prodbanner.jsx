import React, { Component } from 'react';
import './prodbanner.sass';

export default class ProdBanner extends Component{
  render(){
    let self = this;
    let { data } = self.props;
    return(
      <div className="prodbanner_wrap row">
        <img src={data.img} alt=""/>
        <div className="intro-holder col-xs-6 col-md-5">
          <h2>{data.title}</h2>
          <p>{data.msg}</p>
        </div>
      </div>
    )
  }
  componentDidMount(){}
}