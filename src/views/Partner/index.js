/**
 * 合作伙伴
 */
import React, { Component } from 'react';
import FooterQR from '../../components/FooterQR';
import './index.css';
import emitter from "../../services/events";
import URL from '../../components/BaseUrl';

class Partner extends Component {
  componentDidMount() {
    emitter.emit("setNarBackground", '#0e2052');
  }

  // componentWillUnmount(){
  //   emitter.emit("setNarBackground", 'none');
  // }

  render() {
    const blobUrl = URL.getBlobUrl;
    return(
      <main>
        <div className="partner-content">
          <h1>合作伙伴</h1>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb0.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb1.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb2.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb3.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb4.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb5.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb7.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb8.jpg" } alt="" />
          </div>
          <div className="partner">
            <img src={ blobUrl + "img/article/partner/hb9.jpg" } alt="" />
          </div>
        </div>
        <FooterQR/>
      </main>
    )
  }
}

export default Partner;
