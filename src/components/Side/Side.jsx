import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu} from "antd";

import './Side.scss';

const {Sider} = Layout;

const Side = ({collapsed, handleMenuClick, curKey, category}) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth="0"
            className="siderBlock"
            width="250"
        >
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["Amazon Web Services"]}
                onClick={handleMenuClick}
                selectedKeys={curKey}
            >
                {category?.map((e) => {
                    return <Menu.Item key={e.name}>{e.name}</Menu.Item>;
                })}
            </Menu>
        </Sider>
    );
};

Side.propTypes = {
    collapsed: PropTypes.bool,
    handleMenuClick: PropTypes.func,
    curKey: PropTypes.string,
    category: PropTypes.array,
};


export default Side;
