/**
 * 租户管理员注册
 */
import React, { Component } from 'react';
import { Form, Input, Button, Col, Icon,message } from 'antd';
import emitter from '../../../services/events';
import Statement from '../../Statement';

const FormItem = Form.Item;

class AdminUserInfo extends Component {

  componentDidMount() {
    emitter.emit("setStatus", 'process');
  }
  //创建账户
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.Photo = null;
      values.FullName = values.FirstName + values.LastName;
      values.Account = values.LoginName + '@' +
      values.TenantDomainName + '.hightalk.ai';
      const regFilter = this.filter(values.Account)
        if(regFilter&&values.Account.indexOf(' ') < 0){
            if (err) {
                emitter.emit("setUserInfo", values, false);
                emitter.emit("setStatus", 'error');
            } else {
                emitter.emit("setUserInfo", values, true);
            }
        }else{
          message.error('用户名及公司域名请勿输入特殊字符及空格！')
        }
    });
  };

  previous = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      emitter.emit("setUserInfo", values, false);
      // 上一步
      emitter.emit("setCurrent", 0);
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('Password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  };
  filter=(v)=>{
      var regEn = /[`#%*"\/;']/im

      if(regEn.test(v)){
          return false;
      }else{
        return true
      }
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const tenantUserProfiles = this.props.values;
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <Col span={12} style={{marginBottom: '20px'}}>
            <FormItem>
              {getFieldDecorator('FirstName', {
                initialValue: tenantUserProfiles ? tenantUserProfiles.FirstName : "",
                rules: [
                    { required: true, message: '请输入管理员的姓氏!' },
                    { max: 50, message:'字符不能超过50个！' }
                ],
              })(
                <Input size="large" addonBefore={<Icon type="user"/>} placeholder="姓氏"/>
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              -
            </span>
          </Col>
          <Col span={10}  style={{marginBottom: '20px'}}>
            <FormItem>
              {getFieldDecorator('LastName', {
                initialValue: tenantUserProfiles ? tenantUserProfiles.LastName : "",
                rules: [
                    { required: true, message: '请输入管理员的名!' },
                    { max: 50, message:'字符不能超过50个！' }
                ],
              })(
                <Input size="large" placeholder="名称" />
              )}
            </FormItem>
          </Col>
        </FormItem>
        <FormItem
          help={<div>例如:username@yourcompany.hightalk.ai</div>}
        >
          <Col span={12} style={{marginBottom: '20px'}}>
            <FormItem>
              {getFieldDecorator('LoginName', {
                initialValue: tenantUserProfiles ? tenantUserProfiles.LoginName : "",
                rules: [
                    { required: true, message: '请输入管理员的用户名!'},
                    { max: 50, message:'字符不能超过50个！' },
                    {whitespace:true, message:'请勿输入空格符号！'},
                    {
                        pattern:"^[0-9a-zA-Z_]{1,}$",
                        message:'只能输入数字、字母、下划线'
                    }
                ],
              })(
                <Input addonBefore={<Icon type="mail"/>} size="large" placeholder="用户名"/>
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              @
            </span>
          </Col>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator('TenantDomainName', {
                initialValue: tenantUserProfiles ? tenantUserProfiles.TenantDomainName : "",
                rules: [
                    { required: true, message: '请输入租户域名!' },
                    { max: 50, message:'字符不能超过50个！' },
                    {whitespace:true, message:'请勿输入空格符号！'},
                    {
                        pattern:"^[0-9a-zA-Z_]{1,}$",
                        message:'只能输入数字、字母、下划线'
                    }
                ],
              })(
                <Input size="large" placeholder="租户域名"
                />
              )}
            </FormItem>
          </Col>
            <Col span={3}>
                .hightalk.ai
            </Col>
        </FormItem>
        <FormItem help={<div>长度6~21位, 包括至少1个大写字母, 1个小写字母, 1个数字, 1个特殊字符</div>}>
            <FormItem>
              {getFieldDecorator('Password', {
                initialValue: tenantUserProfiles ? tenantUserProfiles.Password : "",
                rules: [{ required: true, message: '请输入登录密码!' },
                    {
                    pattern:"^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{6,}$",
                    message:'当前密码强度过低！'
                },
                    { max: 50, message:'字符不能超过50个！' }
                    ],
              })(
                <Input size="large" addonBefore={<Icon type="lock"/>} placeholder="请输入您的密码" type="password" />
              )}
            </FormItem>
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            initialValue: tenantUserProfiles ? tenantUserProfiles.confirm : "",
            rules: [{required: true, message: '请输入确认密码!'}, {
              validator: this.compareToFirstPassword,
            }
            ],
          })(
            <Input size="large" addonBefore={<Icon type="lock"/>} type="password" placeholder="请再次输入您的密码"/>
          )}
        </FormItem>
        <Statement/>
        <FormItem style={{ marginTop: "30px" }}>
          <button type="button" className="register-previous-button" onClick={ this.previous }>上一步</button>
          <Button type="primary" htmlType="submit" className="register-submit-button"
                  style={{ marginLeft: '60px' }}>创建我的租户</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(AdminUserInfo);
