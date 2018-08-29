/**
 * 机器人市场Banner 领域
 */
import React, { Component } from 'react';
import './index.css';

class FieldBox extends Component {
  render() {
    return(
      <main className="field-box-content">
        <img src={ this.props.field.DomainIcon } alt="" />
        <p>{ this.props.field.DomainName }</p>
      </main>
    )
  }
}
export default FieldBox;
