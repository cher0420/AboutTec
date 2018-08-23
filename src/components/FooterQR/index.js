/**
 * 底部二维码
 */
import React, { Component } from 'react';
import qr from '../../img/market/2.jpg';
import './index.css';

class FooterQR extends Component{
  render() {
    return(
      <footer className="footer-qr">
        <img src={ qr } alt="" />
      </footer>
    )
  }
}
export default FooterQR;