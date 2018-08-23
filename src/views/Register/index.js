/**
 * 注册页面
 */
import React, { Component } from 'react';
import { Steps, message, Spin } from 'antd';
import CompanyInfo from '../../components/RegisterSteps/CompanyInfo';
import AdminUserInfo from '../../components/RegisterSteps/AdminUserInfo';
import Completed from '../../components/RegisterSteps/Completed';
import emitter from '../../services/events';
import URL from "../../components/BaseUrl";
import './index.css';

const Step = Steps.Step;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerInfo: {},
      current: 0,
      status: 'process',
      loading: false
    }
  }

  componentDidMount() {
    emitter.emit("setNarBackground", '#0e2052');
    this.setStatus = emitter.addListener('setStatus', (status) => {
      this.setState({ status: status })
    });

    this.setCurrent = emitter.addListener('setCurrent', (current) => {
      this.setState({
        current: current
      });
    });

    //接受公司信息
    this.setCompanyInfo = emitter.addListener('setCompanyInfo', (TenantInfo) => {
      const registerInfo = this.state.registerInfo;
      registerInfo.TenantInfo = TenantInfo;
      this.setState({
        registerInfo: registerInfo,
        current: 1
      });
      return TenantInfo;
    });

    //接受管理员信息
    this.setUserInfo = emitter.addListener('setUserInfo', (TenantUserProfiles, isCreate) => {
      const registerInfo = this.state.registerInfo;
      registerInfo.TenantUserProfiles = TenantUserProfiles;
      this.setState({
        TenantUserProfiles: TenantUserProfiles
      });
      if (isCreate){
        this.setState({ status: 'wait', loading: true });
        // 调用注册接口
        setTimeout(this.askForRegister(this.state.registerInfo), 1000);
      }
    });
  }

  // 组件销毁前移除事件监听
  componentWillUnmount(){
    emitter.emit("setNarBackground", 'none');
    emitter.removeAllListeners('setStatus');
    emitter.removeAllListeners('setCurrent');
    emitter.removeAllListeners('setCompanyInfo');
    emitter.removeAllListeners('setUserInfo');
  }


  //调Admin portal接口注册
  askForRegister = (data) => {
    fetch(URL.SSOServerApi + "/api/Tenant/Register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((res) => {
      if(res.Status===1){
        this.setState({ current: 2,status: 'finish' });
      }else{
        this.setState({ status: 'error' });
        message.error('注册失败:' + res.ErrorCodes[0].ErrorMessage);
        console.log('失败信息', res);
      }
      this.setState({ loading: false });
    }).catch((error) => {
      this.setState({ loading: false });
      message.error("网络或者服务器发生错误！");
    });
  };

  render() {
    const steps = [{
      title: '',
      description: '填写公司信息',
      content: <CompanyInfo values={this.state.registerInfo.TenantInfo}/>,
      newClassName:'firstStep',
    }, {
      title: '',
      description: ' 创建管理员信息 ',
      content: <AdminUserInfo values={this.state.registerInfo.TenantUserProfiles}/>,
      newClassName:"centerStep",
    }, {
      title: '',
      description: '完成',
      content: <Completed/>,
    }];

    return(
      <div className="register-main">
        <div className="title">注册</div>
        <div className="content">
          <Steps current={ this.state.current } status={ this.state.status } className="register-main-steps">
            {steps.map(item => <Step className={item.newClassName} key={item.title} title={item.title} description={ item.description }/>)}
          </Steps>
          <Spin size="large" tip="注册中，请稍候..." spinning={this.state.loading}>
            <div className="steps-content">{steps[this.state.current].content}</div>
          </Spin>
        </div>
      </div>
    )
  }
}

export default Register;