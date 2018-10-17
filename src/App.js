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
            <div style={{width:'300px',margin:'0 auto'}}>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402004967" style={{display:'inline-block',textDecoration:'none',height:'20px',lineHeight:'20px'}}><img src={require('./img/copy.png')} style={{float:'left'}}/><p style={{float:'left',height:'20px',lineHeight:'20px',margin: '0px 0px 0px 5px',color:'#939393'}}>沪公网安备 31010402004967号</p></a>
            </div>
        </div>
      </main>
    );
  }
}

export default App;
