'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassName from 'classnames';
import './star.sass';

export default class Star extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className={`star ${this.starType()}`}>
        {
          this.itemClasses().map((itemClass, index) => {
            return (<span key={index} className={`star-item ${itemClass}`}></span>)
          })
        }
        <div>TEST</div>
      </div>
    )
  }
  starType() {
    return 'star-' + this.props.size;
  }
  itemClasses() {
    let self = this;
    let { size } = self.props; 
    const LENGTH = 5, CLS_ON = 'on', CLA_HALF = 'half', CLS_OFF = 'off';
    let result = [];
    let score = Math.floor(self.props.score * 2) / 2;
    let hasDecimal = score % 1 !== 0;
    let integer = Math.floor(score);
    for(let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
    if(hasDecimal) { result.push(CLA_HALF); }
    while(result.length < LENGTH) { result.push(CLS_OFF); }
    return result;
  }
}