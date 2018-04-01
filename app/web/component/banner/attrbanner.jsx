import React, { Component } from 'react';
import './attrbanner.sass';

export default class AttrBanner extends Component{
  render(){
    let self = this;
    let { data } = self.props;
    return(
      <div className="attrbanner_wrap row">
        <h2>{data.title}</h2>
        {data.attrData.map((item, index) => {
          return (
            <div className="col-sm-6 col-md-3">
              <div className="thumbnail">
                <img src={item.img} alt="..."/>
                <div className="caption">
                  <h3>{item.attr}</h3>
                  <p>{item.describe}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  componentDidMount(){}
}