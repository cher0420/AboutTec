import React from 'react';
import { Menu, Icon } from 'antd';
import URL from "../BaseUrl";
import { Link } from 'react-router-dom';
const MenuItemGroup = Menu.ItemGroup;

class SiderMenu extends React.Component {
    state = {
        menus: []
    };

    componentDidMount() {
        //获取菜单数据
        const options = {
            headers: {'Content-Type': 'application/json; charset=utf-8'},
        };
        fetch(URL.getManageBaseUrl + "menus", options)
            .then((response) => {
                return response.json()
            })
            .then((res) => {
                this.setState({
                    menus: res
                });
            });
    };

    renderMenuItem =
        ({ key, title, icon, link, ...props }) =>
            <Menu.Item
                key={ title }
                {...props}
            >
                <Link to={link || key}>
                    {icon && <Icon type={icon} />}
                    <span className="nav-text">{title}</span>
                </Link>
            </Menu.Item>;

    renderSubMenu =
        ({ key, title, icon, link, sub, ...props }) =>
            <Menu.SubMenu
                key={ title }
                title={
                    <span>
                    {icon && <Icon type={icon} />}
                        <span className="nav-text">{title}</span>
          </span>
                }
                {...props}
            >
                {sub && sub.map(item => item.sub && item.sub.length ?
                    this.renderMenuItemGroup(item)  : this.renderMenuItem(item))}
            </Menu.SubMenu>;

    renderMenuItemGroup =
        ({ key, title, icon, link, sub, ...props }) =>
            <MenuItemGroup
                key= { title }
                title={title}
                {...props}
            >
                {sub && sub.map(item => this.renderMenuItem(item))}
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
                        item.sub && item.sub.length ?
                            this.renderSubMenu(item) : this.renderMenuItem(item))
                }
            </Menu>
        )
    }
}

export default SiderMenu;
