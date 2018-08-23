/**
* 登录框
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Col, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import URL from "../BaseUrl";
import emitter from '../../services/events';
import './index.css';

const FormItem = Form.Item;
const cookies = new Cookies();

class LoginForm extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.setState({ loginInfo: JSON.parse(localStorage.getItem('Hightalk_Login_Info')) });
  }

  //登录
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const user = {};
        user.tokenSource = 'Market';
        user.account = values.Account + "@" + values.TenantDomainName + ".hightalk.ai";
        user.password = values.password;
        fetch(URL.getAdminProtalBaseUrl + "/api/tenant/validatelogin", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(user)
        }).then(response => response.json()).then((res) => {
          if(res.Status===1){
            const cookieArr = document.cookie.split(';')
            res.account = user.account;
            this.getProfile(res);
            localStorage.removeItem("Hightalk_Login_Info");
            if (values.remember) {
              this.rememberMe(values);
            }
          }else{
            this.props.form.setFields({
              password: {
                value: values.password,
                errors: [new Error(res.ErrorCodes[0].ErrorMessage)]
              }
            });
            console.log('失败信息', res);
            this.setState({ loading: false });
          }
        }).catch((error) => {
          this.setState({ loading: false });
          alert("网络或者服务器发生错误！");
        });
      }
    });
  };

  rememberMe = (loginInfo) => {
    localStorage.setItem("Hightalk_Login_Info", JSON.stringify(loginInfo));
  };

  //登录成功后获取个人信息
  getProfile = (data) => {
    const user = { account: data.account };
    fetch(URL.getAdminProtalBaseUrl + "/api/tenant/getuserinfo", {
      method: 'POST',
      headers: {
        'Access-Token': data.Token,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user)
    }).then(response => response.json()).then((res) => {
      user.TenantId = data.TenantId;
      user.Token = data.Token;
      user.FullName = res.UserInfo.FullName;
      user.Photo = res.UserInfo.Photo;
      cookies.set('HighTalk_Market_User', JSON.stringify(user), { path: '/', maxAge: 2 * 60 * 60 });
      emitter.emit('isLogin', true);
      this.setState({ loading: false });
      let path = "/";
      if ( this.props.previous ) {
        const params = JSON.parse(this.props.previous);
        if (params.path) {
          path += params.path;
          if (params.id){
            path = path + "/" + params.id;
          }
        }
      }
      window.location.replace(path);
    }).catch((error) => {
      this.setState({ loading: false });
      alert("网络或者服务器发生错误！");
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const loginInfo = this.state.loginInfo;
    return (
      <main className="login-form">
        <Form onSubmit={this.handleSubmit}>
          <h2 className="login-title">登 录</h2>
          <FormItem>
            <Col sm={ 12 } xs={ 8 }>
              <FormItem>
                {getFieldDecorator('Account', {
                  initialValue: loginInfo ? loginInfo.Account : '',
                  rules: [{ required: true, message: '请输入管理员的用户名!' }],
                }
                )(
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                         size="large" placeholder="用户名" />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              @
            </span>
            </Col>
            <Col sm={ 10 } xs={ 14 }>
              <FormItem>
                {getFieldDecorator('TenantDomainName', {
                  initialValue: loginInfo ? loginInfo.TenantDomainName : '',
                  rules: [{ required: true, message: '请输入租户域名!' }],
                })(
                  <Input size="large" placeholder="租户域名" suffix=".hightalk.ai" />
                )}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: loginInfo ? loginInfo.password : '',
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                     size="large"  type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              initialValue: loginInfo ? loginInfo.remember : false,
              valuePropName: 'checked',
            })(
              <Checkbox className="float-left">记住密码</Checkbox>
            )}
            <a className="float-right" href="">忘记密码</a>
          </FormItem>
          <FormItem>
            <Link to="/register" className="register-login-link-button float-left">注册</Link>
            <Button type="primary" htmlType="submit"
                    className="register-submit-button float-right"
                    loading={this.state.loading}>
              登录
            </Button>
          </FormItem>
        </Form>
      </main>
    );
  }
}


export default Form.create()(LoginForm);