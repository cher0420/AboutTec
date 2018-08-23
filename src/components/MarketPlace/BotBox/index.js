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
    data.botId = this.props.bot.id;
    data.userId = user.user.UserId;
    data.tenantId = user.user.TenantId;
    return data;
  };

  getDetail = (bot, orderId) => {
    const user = this.getUser();
    const detail = {};
    detail.TenantId = user.user.TenantId;
    detail.OrderNo = orderId;
    detail.BotNo = bot.botNo;
    detail.BotTemplateCode = bot.templateCode;
    detail.BotTemplateName = bot.botName;
    detail.BotType = bot.botType;
    detail.DeployModel = bot.deployModel;
    detail.BotTemplateDomain = bot.domainName;
    detail.BotTemplateDescription = bot.description;
    detail.IsAutoCreate = bot.isAutoCreate;
    detail.ServicePlan = "";
    return detail;
  };

  experience = (e) => {
    Modal.warning({
      title: '请打开微信扫描二维码进入公众号体验！',
      okText: '关闭',
      content: (
        <div className="experience-content">
          <img src={ this.props.bot.botQRCode } alt="" />
        </div>
      ),
    });
  };
  // fetchLogin = (v) =>{
  //     window.location.replace('/login');
  // }
  buy = (e) => {
    if (!this.getUser()) {
      return;
    }
    this.setState({loading: true});
    fetch(URL.getManageBaseUrl + "order/bot", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(this.getResData())
    }).then(response => response.json())
      .then((res) => {
        this.submitBill(res);
      });
  };

  submitBill = (cartInfo) => {
    const user = this.getUser();
    const data = {};
    const OrderInfo = {};
    data.Account = user.user.Email;
    OrderInfo.TenantId = user.user.TenantId;
    OrderInfo.OrderNo = cartInfo.orderId;
    data.OrderInfo = OrderInfo;
    data.Details = [];
    cartInfo.bot.botNo = cartInfo.botNo;
    data.Details.push(this.getDetail(cartInfo.bot, cartInfo.orderId));
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
              <Col span = {8} md={8} xs={ 24 } className='bot-image-container' style={{background:`url(${this.props.bot.botImage}) left top no-repeat`,backgroundSize:'cover'}}>
                {/*<img className="bot-image" src={ this.props.bot.botImage } alt="" />*/}
              </Col>
              <Col span={1}/>
              <Col span = {12} xl={12} md={ 14 } xs={ 24 } className="bot-content">
                <div className="top">
                  <h2>{ this.props.bot.botName }</h2>
                  <p>{ this.props.bot.description }</p>
                </div>
                <div className="bottom">
                  <button className="bot-options-button" onClick={ this.experience }>立即体验</button>
                  <Link to={ "/botdetail/" + this.props.bot.id } className="bot-detail-link">查看详情</Link>
                  <Button style={{display:'none'}} className="bot-options-button" onClick={ this.buy } loading={this.state.loading}>免费试用</Button>
                </div>
              </Col>
            </Row>
        )
  }
}
export default BotBox;
