/**
 * 公司信息注册
 */
import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';
import emitter from '../../../services/events';
import Statement from '../../Statement';
import './index.css';

const FormItem = Form.Item;

class CompanyInfo extends Component {
    state={
        mailStateFocus:false,
        phoneStateFocus:false,
        companyStateFocus:false,
        nameStateFocus:false,
    }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        emitter.emit("setCompanyInfo", values);
      } else {
        emitter.emit("setStatus", 'error');
      }
    });
  };
    changeState = (k,v) =>{
        this.setState({
            [k]:v
        })
    }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      label: " ",
      colon: false,
      labelCol: {
        xs: 1
      },
      wrapperCol: {
        xs: 23
      },
    };

    const tenantInfo = this.props.values;

    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem{...formItemLayout} className="company-info-email">
          {getFieldDecorator('Email', {
            initialValue: tenantInfo ? tenantInfo.Email : "",
            rules: [
                {
              type: 'email', message: '请输入正确的邮箱地址!',
          },
                {
              required: true, message: '请输入您的邮箱!',
            },
            ],
          })(
              <Input addonBefore={<img src={this.state.mailStateFocus?require('../../../img/mailFocusIcon.png'):require('../../../img/mailBlurIcon.png')}/>} size="large" placeholder="请输入您的邮箱" onFocus={()=>{this.changeState('mailStateFocus',true)}} onBlur={()=>{this.changeState('mailStateFocus',false)}}/>
          )}
        </FormItem>
        <FormItem{...formItemLayout}>
          {getFieldDecorator('Tel', {
            initialValue: tenantInfo ? tenantInfo.Tel : ""
          })(
            <Input addonBefore={<img src={this.state.phoneStateFocus?require('../../../img/phoneFocusIcon.png'):require('../../../img/phoneBlurIcon.png')}/>} type="number" size="large" placeholder="请输入您的电话" onFocus={()=>{this.changeState('phoneStateFocus',true)}} onBlur={()=>{this.changeState('phoneStateFocus',false)}}/>
          )}
        </FormItem>
        <FormItem{...formItemLayout}>
          {getFieldDecorator('TenantName', {
            initialValue: tenantInfo ? tenantInfo.TenantName : ""
          })(
            <Input addonBefore={<img src={this.state.companyStateFocus?require('../../../img/companyFocusIcon.png'):require('../../../img/companyBlurIcon.png')}/>} size="large" placeholder="公司名称" onFocus={()=>{this.changeState('companyStateFocus',true)}} onBlur={()=>{this.changeState('companyStateFocus',false)}}/>
          )}
        </FormItem>
        <FormItem{...formItemLayout}>
          {getFieldDecorator('Trade', {
            initialValue: tenantInfo ? tenantInfo.Trade : ""
          })(
            <Input addonBefore={<img src={this.state.nameStateFocus?require('../../../img/nameFocusIcon.png'):require('../../../img/nameBlurIcon.png')}/>} size="large" placeholder="所属行业" onFocus={()=>{this.changeState('nameStateFocus',true)}} onBlur={()=>{this.changeState('nameStateFocus',false)}}/>
          )}
        </FormItem>
        <FormItem{...formItemLayout}>
          <Statement/>
        </FormItem>
        <FormItem {...formItemLayout} style={{ marginTop: "30px" }}>
          <button type="submit" className="register-submit-button">下一步</button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(CompanyInfo);
