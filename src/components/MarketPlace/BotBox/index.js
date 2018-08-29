/**
 * 机器人市场 机器人展示信息
 */
import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import URL from "../../BaseUrl";
import { getUserInfo, locationChange } from "../../../services/UserManage";
import emitter from '../../../services/events';
import './index.css';

class BotBox extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false,tokenStatus: false, }
  }

  getUser = () => {
    let path = {
      path: 'marketplace?',
      id: this.props.fieldId
    };
    return getUserInfo(path);
  };

  getResData = () => {
    const user = this.getUser();
    const data = {};
    data.BotId = this.props.bot.ID;
    data.UserId = user.user.UserId;
    data.TenantId = user.user.TenantId;
    data.DomainId = this.props.bot.DID
    return data;
  };

  getDetail = (bot, orderId) => {
    const user = this.getUser();
    const detail = {};
    detail.TenantId = user.user.TenantId;
    detail.OrderNo = orderId;
    detail.BotNo = bot.botNo;
      detail.BotTemplateCode = bot.TemplateCode;
      detail.BotTemplateName = bot.BotName;
      detail.BotType = bot.BotType;
      detail.DeployModel = bot.DeployModel;
      detail.BotTemplateDomain = bot.DomainName;
      detail.BotTemplateDescription = bot.Description;
      detail.IsAutoCreate = bot.IsAutoCreate;
    detail.ServicePlan = "";
    return detail;
  };

  experience = (e) => {
    Modal.warning({
      title: '请打开微信扫描二维码进入公众号体验！',
      okText: '关闭',
      content: (
        <div className="experience-content">
          <img src={ this.props.bot.BotQRCode } alt="" />
        </div>
      ),
    });
  };
  buy = (e) => {
    if (!this.getUser()) {
      return;
    }
    this.setState({loading: true});
    fetch(URL.getManageBaseUrl + "api/Order/GetOrderOneBot", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(this.getResData())
    }).then(response => response.json())
      .then((res) => {
        console.log(res)
        this.submitBill(res);
      });
  };

  submitBill = (cartInfo) => {
    const user = this.getUser();
    const data = {};
    const OrderInfo = {};
    data.Account = user.user.Email;
    OrderInfo.TenantId = user.user.TenantId;
    OrderInfo.OrderNo = cartInfo.OrderId;
    data.OrderInfo = OrderInfo;
    data.Details = [];
    cartInfo.Bot.botNo = cartInfo.BotNo;
    data.Details.push(this.getDetail(cartInfo.Bot, cartInfo.OrderId));
    const options = {
      method: 'POST',
      headers: {
        'Access-Token': decodeURIComponent(user.token),
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    const url = URL.getAdminProtalBaseUrl + "/api/tenant/storetenantorder";
    fetch(url, options)
      .then(response => response.json())
      .then((res) => {
        if (res.Status === 1) {
          Modal.confirm({
            title: '申请成功',
            content: '前往管理门户看看您的机器人吧？',
            okText: '前往',
            cancelText: '继续浏览',
            onOk() { window.open(URL.getAdminPortalWebUrl); }
          });
        } else {
            locationChange('/zh-cn/login/index',null,'marketplace?')
        }
        emitter.emit('freshCount');
        this.setState({loading: false});
      });
  };


  render() {
        return(
            <Row className="market-bot">
              <Col span = {8} md={8} xs={ 24 } className='bot-image-container' style={{background:`url(${this.props.bot.BotImage}) left top no-repeat`,backgroundSize:'cover'}}>
                {/*<img className="bot-image" src={ this.props.bot.botImage } alt="" />*/}
              </Col>
              <Col span={1}/>
              <Col span = {12} xl={12} md={ 14 } xs={ 24 } className="bot-content">
                <div className="top">
                  <h2>{ this.props.bot.BotName }</h2>
                  <p>{ this.props.bot.Description }</p>
                </div>
                <div className="bottom">
                  <button className="bot-options-button" onClick={ this.experience }>立即体验</button>
                  <Link to={ "/botdetail/" + this.props.bot.ID } className="bot-detail-link">查看详情</Link>
                  <Button  style={{display:'none'}} className="bot-options-button" onClick={ this.buy } loading={this.state.loading}>免费试用</Button>
                </div>
              </Col>
            </Row>
        )
  }
}
export default BotBox;
