import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Button, Input, Layout, Spin, message} from "antd";

import "./Head.scss"

const {Header} = Layout;
const {Search} = Input;

const Head = ({toggleMenu, onSearch, showModal, collapsed, setCategory}) => {
    const [logo, setLogo] = useState(null);
    const [eventName, setEventName] = useState(null);

    useEffect(() => {
        fetch(
            "https://app.highattendance.com/content-app-cats/jVV3Q?appId=2731&eventId=2570"
        )
            .then((results) => results.json())
            .then((data) => {
                setLogo(data.header_logo);
                setEventName(data.title);
                setCategory(data.cats);
            })
            .catch((error) => message.error("It seems like", error.message));
    }, [setCategory]);

    return (
        <Header>
            <div className="headerBlock">
                <div>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => toggleMenu(),
                        }
                    )}
                    {!logo ?
                        <div className="spinner"><Spin/></div> :
                        <img src={logo} width="190" height="auto" alt="deloitte-logo"/>
                    }
                    <h1>{eventName?.split("/")[0]}</h1>
                </div>
                <div>
                    <Search onSearch={onSearch}/>
                    <Button type="primary" onClick={showModal}>
                        <MailOutlined/>
                        EMAIL 0
                    </Button>
                </div>
            </div>
        </Header>
    );
};

Head.propTypes = {
    toggleMenu: PropTypes.func,
    onSearch: PropTypes.func,
    showModal: PropTypes.func,
    collapsed: PropTypes.bool,
    setCategory: PropTypes.func,
};


export default Head;
