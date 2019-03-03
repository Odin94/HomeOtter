import React, { Component } from 'react';
import '../App.css';
import 'antd/dist/antd.css';

import Menu from 'antd/lib/menu';
import Layout from 'antd/lib/layout';

const { Header, Content, Footer } = Layout;

class HeaderMenu extends Component {

    render() {
        return (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default HeaderMenu;