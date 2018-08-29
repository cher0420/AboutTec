/**
 *   头部导航模块
 */

import React, { Component } from 'react';
import './index.css';
import { Row, Col } from 'antd';
import { setUserInfo, locationChange } from "../../services/UserManage";
import URL from '../../components/BaseUrl';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import emitter from '../../services/events';
import SiderMenu from '../../components/SiderMenu';
import ProfileMenu from '../../components/ProfileMenu';
import * as CONSTNTS from '../../constants/constants';

const cookies = new Cookies();

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'none',
    };
  }

  componentDidMount() {
    this.setNarBackground = emitter.addListener('setNarBackground', (background) => {
      this.setState({background: background})
    });
  }

  render() {
    const {testUser,isLogin,token} = this.props
    let navbarRight = null;
    if (!isLogin) {
      navbarRight =
<<<<<<< HEAD
<<<<<<< Updated upstream
        <div className="navbar-right" style={{display: 'none'}}>
=======
        <div className="navbar-right" style={{display:'none'}}>
>>>>>>> Stashed changes
=======
        <div className="navbar-right">
>>>>>>> develop
          <Link to="/register">
            <div className="navbar-blue-button navbar-box">注 册</div>
          </Link>
            <Link to="/" className="navbar-transparent-button navbar-box" onClick={()=>{
                locationChange('/zh-cn/login/index')
            }}>登 录</Link>
        </div>;
    } else {
      navbarRight =
        <div className="navbar-right">
          <a href={ URL.getAdminPortalWebUrl} target="_blank"
             className="navbar-blue-button navbar-box">管理门户</a>
          <ProfileMenu user={testUser} token = {token}/>
        </div>;
    }
    return(
      <Row className="navbar" style={{ background: this.state.background }}>
        <Col className="navbar-icon">
          <Link to="/">
            <strong>Hightalk</strong>
          </Link>
        </Col>

        { navbarRight }

        <div className="navbar-menu">
          <SiderMenu/>
        </div>
      </Row>
    )
  }
}
export default Navbar;