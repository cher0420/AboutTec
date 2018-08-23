/*
*   个人信息菜单
 */
import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { logout } from "../../services/UserManage";
import Cookies from 'universal-cookie';
import {HighTalk_Market_Token} from '../../constants/constants';

const cookies = new Cookies()
class ProfileMenu extends Component {
  handleClick = (e) => {
     if (e.key === "logout") {
         const token = cookies.get(HighTalk_Market_Token,{path:'/'})
         logout(token);
     }
  };
  render(){
    const {user} = this.props
    const menu = (
      <Menu
        selectedKeys={[]}
        onClick={this.handleClick}
      >
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    );

    return(
      <Dropdown overlay={menu}>
        <div className="navbar-register navbar-box">{ user&&user.FullName||'' }<Icon type="caret-down" /></div>
      </Dropdown>
    )
  }
}
export default ProfileMenu;
