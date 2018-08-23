/**
 * 注册完成
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import successImg from '../../../img/success_bot.png';
import {locationChange} from '../../../services/UserManage'

class Completed extends Component {
  render() {
    return(
      <main className="register-success-content">
        <img style={{ width: '200px' }} src={ successImg } alt=""/>
        <p style={{ paddingTop: '20px', fontSize: '20px' }}>恭喜您，注册成功</p>
        <div className="colorful-button" onClick={()=>{
            locationChange('/zh-cn/login/index')
        }}>立即登录</div>
      </main>
    )
  }
}

export default Completed;