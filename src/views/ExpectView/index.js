/**
 * 敬请期待页面
 */
import React, { Component } from 'react';
import FooterQR from '../../components/FooterQR';
import Expect from '../../components/Expect';
import './index.css';
import emitter from "../../services/events";

class ExpectView extends Component {
  componentDidMount() {
    emitter.emit("setNarBackground", '#0e2052');
  }

  // componentWillUnmount(){
  //   emitter.emit("setNarBackground", 'none');
  // }

  render() {
    return(
      <main>
        <div className="expect-content">
          <Expect/>
        </div>
        <FooterQR/>
      </main>
    )
  }
}

export default ExpectView;
