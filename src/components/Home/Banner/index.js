/**
 * 首页banner
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Banner extends Component {
  render() {
    return(
      <section className="home-banner">
        <div className="home-banner-slogan">
          <h1>灵活 高效 智能 专业 便捷</h1>
          <p>Hightalk 语音机器人，您的7*24h 专属智能助理</p>
          <Link to="/marketplace" className="experience">立即体验</Link>
        </div>
      </section>
    )
  }
}

export default Banner;