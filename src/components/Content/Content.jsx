import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Row, Col, Button, message} from 'antd';

import "./Content.scss";

const Content = ({curKey, valFromSearch, setCurKeyFromSearch}) => {
    const [curItem, setCurItem] = useState(null);
    const [data, setData] = useState(null);
    const [dataImg, setDataImg] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(
            "https://app.highattendance.com/app-contents/jVV3Q?appId=2731&eventId=2570"
        )
            .then((results) => results.json())
            .then((gotData) => {
                setData(gotData.contents);
            })
            .catch((error) => message.error("It seems like", error.message));
    }, []);

    useEffect(() => {
        fetch(
            "https://app.highattendance.com/content-thumbnail-url/2731"
        )
            .then((results) => results.json())
            .then((gotData) => {
                setDataImg(gotData);
            })
            .catch((error) => message.error("It seems like", error.message));
    }, []);

    useEffect(() => {
        let item = data?.find(e => e.catName === curKey);
        setCurItem(item);
        setNotFound(false)
    }, [curKey, data]);

    useEffect(() => {
        const found = data?.some(el => el.description?.replace(/  +/g, ' ').split(/\s+/).includes(valFromSearch));
        if (valFromSearch && found) {
            let item = data?.find(e => e.description?.includes(valFromSearch));
            setNotFound(false)
            setCurItem(item);
            setCurKeyFromSearch(item?.catName);
        } else {
            setNotFound(true)
        }
    }, [valFromSearch, data, setCurKeyFromSearch]);

    return (
        <div className="contentBlock">
            {
                (!notFound || !valFromSearch) ? <>
                    <h2 className="contentTitle">{curItem && curItem.catName}</h2>
                    <h4 className="contentDesc">{curItem && curItem.description}</h4>
                    <Row gutter={[24, 8]}>
                        {
                            curItem && curItem.contentInf.map((elem, index) => {
                                return (
                                    <Col key={index} className="gutterRow" span={6}>
                                        <img src={dataImg.find(img => img.id === elem.id).url} alt="thumb"/>
                                        <div>
                                            <span>{elem.name}</span>
                                            <Button type="primary">Add</Button>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </> : <h2 className="contentTitle">Sorry, didn't found anything :(</h2>
            }

        </div>
    );
};


Content.propTypes = {
    curKey: PropTypes.string,
    valFromSearch: PropTypes.string,
    setCurKeyFromSearch: PropTypes.func
};


export default Content;
