/**
 * 介绍容器
 */
import React, { Component } from 'react';
import './index.css';

class IntroduceBox extends Component {
  render() {
    return(
      <div className="introduce-box">
        <img src={ this.props.img } alt="" />
        <div className="right">
          <h3>{ this.props.title }</h3>
          <p>{ this.props.description }</p>
        </div>
      </div>
    )
  }
}

export default IntroduceBox;