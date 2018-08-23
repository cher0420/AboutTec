/*
* 登录页面
 */

import React, { Component } from 'react';
import CreatedLoginForm from '../../components/LoginForm';
import './index.css';
import think from '../../img/667.png';

class Login extends Component {
  render() {
    return(
      <main className="login-content">
        <img className="think-img" src={ think } alt=""/>
        <CreatedLoginForm previous={ this.props.match.params.previous }/>
      </main>
    )
  }
}
export default Login;