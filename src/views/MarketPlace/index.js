/**
 * 机器人市场
 **/
import React, { Component } from 'react';
import Banner from '../../components/MarketPlace/Banner';
import FooterQR from '../../components/FooterQR';
import emitter from '../../services/events';
import BotBox from '../../components/MarketPlace/BotBox';
import Expect from '../../components/Expect';
import './index.css';

class MarketPlace extends Component {
  constructor(props) {
    super(props);
    this.state = { field: {} };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setField = emitter.addListener('setField', (field) => {
      this.setState({ field: field });
    });
  }

  // componentWillUnmount(){
    // emitter.removeAllListeners('setField');
  // }

  render() {
    const botBoxs = [];
    if (this.state.field.bots && this.state.field.bots.length) {
      this.state.field.bots.forEach((bot, index) => {
        botBoxs.push(
          <BotBox key={ index } bot={ bot } />
        )
      });
    } else {
      botBoxs.push( <Expect key="0"/> );
    }

    return(
      <main>
        <Banner fields={ this.state.fields } defaultKey={ this.props.match.params.id }/>
        <section className="market-bots-content">
          { botBoxs }
        </section>
        <FooterQR/>
      </main>
    )
  }
}
export default MarketPlace;
