import React, {useEffect, useState} from "react";
import Head from "./Head/Head";
import Side from "./Side/Side";
import Content from "./Content/Content";
import EmailModal from "./EmailModal/EmailModal";
import {Layout} from "antd";

import "./App.scss";

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [category, setCategory] = useState(null);
    const [curKey, setCurKey] = useState("Amazon Web Services");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [valFromSearch, setValFromSearch] = useState(null);
    const [curKeyFromSearch, setCurKeyFromSearch] = useState(null);


    useEffect(() => {
        curKeyFromSearch && setCurKey(curKeyFromSearch);
    }, [curKeyFromSearch]);

    const toggleMenu = () => {
        setCollapsed((state) => !state);
    };

    const onSearch = (value) => {
        setValFromSearch(value);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleMenuClick = (e) => {
        setCurKey(e.key);
    };

    return (
        <Layout>
            <Head toggleMenu={toggleMenu}
                  onSearch={onSearch}
                  showModal={showModal}
                  collapsed={collapsed}
                  setCategory={setCategory}
            />
            <Layout>
                <Side
                    collapsed={collapsed}
                    handleMenuClick={handleMenuClick}
                    curKey={curKey}
                    category={category}
                />
                <Layout>
                    <Content
                        curKey={curKey}
                        valFromSearch={valFromSearch}
                        setCurKeyFromSearch={setCurKeyFromSearch}
                    />
                    <EmailModal
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                    />
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
