import React, { Component } from 'react';
import Down from '../../img/down.png';
import './index.css';

class PageDown extends Component {
  render() {
    return(
      <img className="page-down" src={ Down } alt="" onClick={ this.props.pageDown }/>
    )
  }
}
export default PageDown;