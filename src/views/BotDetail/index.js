/**
 * 机器人详情展示模版
 */
import React, { Component } from 'react';
import URL from "../../components/BaseUrl";
import { getUserInfo } from "../../services/UserManage";
import { Button, Modal } from 'antd';
import FooterQR from '../../components/FooterQR';
import emitter from '../../services/events';
import './index.css';
import '../../style/quill.bubble.css'
import '../../style/quill.core.css'
import '../../style/quill.snow.css'

class BotDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bot: ""
    }
  };

  componentDidMount() {
    emitter.emit("setNarBackground", '#0e2052');
    const options = {
      headers: {'Content-Type': 'application/json; charset=utf-8'},
    };
    const contentId = this.props.match.params.id;
    fetch(URL.getManageBaseUrl + "api/BotInfo/GetBot?id=" + contentId, options)
      .then(response => response.json())
      .then((res) => {
        this.setState({
          bot: res.BotInfo
        });
      });
  }

  getUser = () => {
    let path = {
      path: 'botdetail',
      id: this.props.match.params.id
    };
    return getUserInfo(path);
  };

  getResData = () => {
    const user = this.getUser();
    const data = {};
    data.botId = this.props.match.params.id;
    data.userId = user.account;
    data.tenantId = user.TenantId;
    return data;
  };

  getDetail = (cart, orderId) => {
    const user = this.getUser();
    const detail = {};
    detail.TenantId = user.TenantId;
    detail.OrderNo = orderId;
    detail.BotNo = cart.id;
    detail.BotTemplateCode = cart.botId;
    detail.BotTemplateName = cart.botName;
    detail.BotTemplateDomain = cart.domainName;
    detail.BotTemplateDescription = cart.description;
    detail.ServicePlan = "";
    return detail;
  };

  addToCart = (e) => {
    if (!this.getUser()) {
      return;
    }
    fetch(URL.getManageBaseUrl + "/cart/add", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(this.getResData())
    }).then(response => {
      emitter.emit('addCart');
    });
  };

  buy = (e) => {
    if (!this.getUser()) {
      return;
    }
    this.setState({loading: true});
    fetch(URL.getManageBaseUrl + "/order/bot", {
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

  submitBill = (res) => {
    const user = this.getUser();
    const data = {};
    const OrderInfo = {};
    OrderInfo.TenantId = user.TenantId;
    OrderInfo.OrderNo = res.orderId;
    data.OrderInfo = OrderInfo;
    data.Details = [];
    data.Details.push(this.getDetail(res.cart, res.orderId));

    const options = {
      method: 'POST',
      headers: {
        'Access-Token': user.Token,
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
            title: '购买成功',
            content: '前往管理门户生成您的机器人？',
            okText: '前往',
            cancelText: '继续浏览',
            onOk() { window.open(URL.getAdminPortalWebUrl + "?user=" + user.account); }
          });
        } else {
          alert(res.ErrorCodes[0].ErrorMessage);
          console.log('失败信息', res);
        }
        emitter.emit('freshCount');
        this.setState({loading: false});
      });
  };

  experience = (e) => {
    Modal.warning({
      title: '请打开微信扫描二维码进入公众号体验！',
      okText: '关闭',
      content: (
        <div className="experience-content">
          <img src={ this.state.bot.otQRCode } alt=""/>
        </div>
      ),
    });
  };
    htmlDecodeByRegExp =  (str = null) => {
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/&amp;/g, '&')
        s = s.replace(/&lt;/g, '<')
        s = s.replace(/&gt;/g, '>')
        s = s.replace(/&nbsp;/g, ' ')
        s = s.replace(/&#39;/g, "\'")
        s = s.replace(/&quot;/g, '"')
        return s
    }
  componentWillUnmount() {
    emitter.emit("setNarBackground", 'none');
  }

  render() {
    const image = this.state.bot && <img src={ this.state.bot.BotImage } alt=""/>;

    return(
      <main>
        <div className="bot-detail ql-editor">
          <div className="bot-detail-title">
            { image }
            <h3>{ this.state.bot.BotName }</h3>
            {/*<Button className="cart-button" onClick={ this.addToCart } >加入购物车</Button>*/}
            <Button type="primary" className="buy-button" onClick={ this.experience }>立即体验</Button>
          </div>
          <div dangerouslySetInnerHTML={{__html:this.htmlDecodeByRegExp(this.state.bot.BotDetail||[])}} className="bot-detail-content"></div>
        </div>
        <FooterQR/>
      </main>
    )
  }
}

export default BotDetail;
