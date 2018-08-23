import React, { Component } from 'react';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';
import './App.css';
import emitter from './services/events';
import {detectPermissions} from './services/UserManage';

class App extends Component {
    state={
        testUser: null,
        isLogin:false,
    }
    //登录成功后获取个人信息
    componentDidMount(){
        emitter.addListener('setUser', (value) => {
            this.setState({ testUser: value });
        });
        emitter.addListener('isLogin', (value) => {
            this.setState({ isLogin: value });
        });
        detectPermissions()
    }
  render() {
    return (
      <main className="layout">
        <div className="app-header">
          <Navbar testUser={this.state.testUser} isLogin={this.state.isLogin}/>
        </div>
        <div className="app-content">
          <AppRouter />
        </div>
        <div className="app-footer">
          ©2018 Pactera. All rights reserved.
        </div>
      </main>
    );
  }
}

export default App;
