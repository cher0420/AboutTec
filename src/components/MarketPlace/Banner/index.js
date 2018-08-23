/**
 * 机器人市场Banner
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import FieldBox from './FieldBox';
import './index.css';
import URL from "../../BaseUrl";
import emitter from '../../../services/events';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      select: this.props.defaultKey
    };
  }

  componentDidMount() {
    this.getFields();
  }

  getSelectIndex = (fields) => {
    if (!this.props.defaultKey) {
      this.setState({ select: fields[0].id });
      emitter.emit('setField', fields[0]);
      return 0;
    }
    fields.forEach((field, index) => {
      if (field.id === this.props.defaultKey) {
        emitter.emit('setField', fields[index]);
      }
    });
  };

    getFields = () => {
        const options = {
            headers: {'Content-Type': 'application/json; charset=utf-8'},
        };
        fetch(URL.getManageBaseUrl + "bots", options)
            .then(response => response.json())
            .then((res) => {
                this.getSelectIndex(res);
                this.setState({ fields: res });
            });
    };

    fieldClick = (index, e) => {
        this.setState({ select: this.state.fields[index].id });
        emitter.emit('setField', this.state.fields[index]);
    };

  render() {
    const fieldBoxs = [];
    this.state.fields.forEach((field, index) => {
      fieldBoxs.push(
        <Col key={ index } md={6} xs={12} className={ this.state.select === field.id ? "active" : ""}
             onClick={ this.fieldClick.bind(this, index) }>
          <FieldBox field={ field }/>
        </Col>
      )
    });
    return(
      <main className="market-banner">
        <div className="content">
          <h1>Hightalk 语音机器人</h1>
          <p>您的7*24h 专属智能助理</p>
        </div>
        <div id="fields" className="bottom">
          <Row className="market-banner-fields">
            { fieldBoxs }
          </Row>
        </div>
      </main>
    )
  }
}
export default Banner;
