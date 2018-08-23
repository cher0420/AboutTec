/**
 * 敬请期待
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import comming from '../../img/comingsoon.png';
import './index.css';

class Expect extends Component {
  render() {
    return(
      <Row className="expect" type="flex" justify="space-around" align="middle">
        <Col className="left" md={ 12 } xs={ 24 }>
          <img src={ comming } alt="" />
        </Col>
        <Col className="right" md={ 12 } xs={ 24 }>
          更多精彩，敬请期待
        </Col>
      </Row>
    )
  }
}
export default Expect;