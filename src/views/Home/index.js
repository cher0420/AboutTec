/**
 * 首页
 */
import React, { Component } from 'react';
import Banner from '../../components/Home/Banner';
import Introduce from '../../components/Home/Introduce';
import HotDomain from '../../components/Home/HotDomain';
import FooterQR from '../../components/FooterQR';
import PageDown from '../../components/PageDown';
import emitter from "../../services/events";

var keys = [37, 38, 39, 40];
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
    e.preventDefault();
  // e.returnValue = false;
}

function keydown(e) {
  for (var i = keys.length; i--;) {
    if (e.keyCode === keys[i]) {
      preventDefault(e);
      return;
    }
  }
}

function wheel(e) {
  e.preventDefault();
  window.event.returnValue = false;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { onScroll: false, current: 0 };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    emitter.emit("setNarBackground", 'none');
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.setState({ current: scrollTop / window.innerHeight });
    window.addEventListener('wheel', this.handleScroll);
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  };

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  };


  handleScroll = (event) => {
    if(Math.abs(event.deltaY) < 15) {
      return;
    }
    if (this.state.current < 2 && event.deltaY > 0) {
      window.removeEventListener('wheel', this.handleScroll);
      this.setState({ current: this.state.current + 1 });
    } else if (this.state.current > 0 && event.deltaY < 0) {
      window.removeEventListener('wheel', this.handleScroll);
      this.setState({ current: this.state.current - 1 });
    } else {
      this.setState({ onScroll: false });
      return;
    }
    window.scrollTo({
      top: (window.innerHeight) * ( this.state.current ),
      behavior: "smooth"
    });
      setTimeout(()=>{
      window.addEventListener('wheel', this.handleScroll);
    },500);
  };

  pageDown = (e) => {
    if (this.state.current >= 2) {
      return false;
    }
    window.scrollTo({
      top: (window.innerHeight) * ( this.state.current + 1 ),
      behavior: "smooth"
    });
    this.setState({ current: this.state.current + 1 });
  };

  render() {
    return(
      <main>
        <Banner/>
        <Introduce/>
        <HotDomain/>
        <FooterQR/>
        { this.state.current < 2 && <PageDown pageDown={ this.pageDown }/> }
      </main>
    )
  }
}

export default Home;
