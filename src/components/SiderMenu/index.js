import React from 'react';
import { Menu, Icon } from 'antd';
import URL from "../BaseUrl";
import { Link } from 'react-router-dom';
import {Ajax} from "../../util/request";

const MenuItemGroup = Menu.ItemGroup;

class SiderMenu extends React.Component {
  state = {
    menus: []
  };

  componentDidMount() {
    //获取菜单数据

    const that = this
      const url = URL.getManageBaseUrl + "api/market/GetMenus"
      Ajax({
          url:url,
          type:'get',
          headers:{'Content-Type': 'application/json; charset=utf-8'},
          success: function (response) {
              const res = JSON.parse(response)
                  that.setState({
                    menus: res.Menus
                  });

          }
      })
      // const options = {
      //     headers: {'Content-Type': 'application/json; charset=utf-8'},
      // };
    // fetch(URL.getManageBaseUrl + "api/market/GetMenus", options)
    //   .then((response) => {
    //     return response.json()
    // })
    //   .then((res) => {
    //     this.setState({
    //       menus: res.Menus
    //     });
    //   });
  };

  renderMenuItem =
    (item) =>{
      return <Menu.Item
          key={ item.Title }
      >
          <Link to={item.Link || item.Key}>
              {item.Icon && <Icon type={item.Icon}
              />
              }
              <span className="nav-text">{item.Title}</span>
          </Link>
      </Menu.Item>;
    }


  renderSubMenu =
    (item) =>
      <Menu.SubMenu
        key={ item.Title }
        title={
          <span>
                    {item['Icon'] && <Icon type={item['Icon']} />
                    }
            <span className="nav-text">{item.Title}</span>
          </span>
        }
      >
        {item.Sub && item.Sub.map(item => item.Sub && item.Sub.length ?
          this.renderMenuItemGroup(item)  : this.renderMenuItem(item))}
      </Menu.SubMenu>;

  renderMenuItemGroup =
    (item) =>
      <MenuItemGroup
        key= { item.Title }
        title={item.Title}
      >
        {item.Sub && item.Sub.map(item => this.renderMenuItem(item))}
      </MenuItemGroup>;

  render() {
    return(
      <Menu
        className="App-header-menu"
        mode="horizontal"
        selectedKeys={[]}
      >
        {
          this.state.menus && this.state.menus.map(item =>
            item.Sub && item.Sub.length ?
            this.renderSubMenu(item) : this.renderMenuItem(item))
        }
      </Menu>
    )
  }
}

export default SiderMenu;
