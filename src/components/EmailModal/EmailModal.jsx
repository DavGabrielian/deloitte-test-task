import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, Button, Checkbox, Radio, message, Row, Col} from 'antd';

import "./EmailModal.scss"

const EmailModal = ({isModalVisible, setIsModalVisible}) => {
    const [form] = Form.useForm();
    const [radioValue, setRadioValue] = useState(1);

    const onFinish = (values) => {
        console.log(values); // didn't delete console.log, so you can see values
        message.success('This is a success message');
    }

    const onReset = () => {
        form.resetFields();
    };

    const onChange = e => {
        setRadioValue(e.target.value);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal title="Contact Information" width={700} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
               footer={null}>
            <Form form={form} name="mail-form" onFinish={onFinish}>
                <Row gutter={[16, 24]}>
                    <Col span={12}>
                        <Form.Item
                            name="First Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="First Name *"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Last Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Last Name *"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 24]}>
                    <Col span={12}>
                        <Form.Item
                            name="Company"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Company *"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Job Title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Job Title *"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 48]}>
                    <Col span={24}>
                        <Form.Item
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Not a valid E-mail!"
                                }
                            ]}
                        >
                            <Input placeholder="Email *"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 48]}>
                    <Col span={24}>
                        <Form.Item
                            name="Agreement"
                            valuePropName="checked"
                        >
                            <p>I agree to receive emailed reports, articles, and event invitations. I understand I may
                                unsubscribe at any time by clicking the link included in emails.
                                <span style={{color: "#FF0000"}}>*</span>
                            </p>
                            <Radio.Group onChange={onChange} value={radioValue}>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={2}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 48]}>
                    <Col span={24}>
                        <Form.Item
                            name="Terms"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        >
                            <Checkbox>
                                The submission of personal information through this page is subject to Deloitte's
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>Privacy Statement </a> and <a>Legal Terms </a> <span
                                style={{color: "#FF0000"}}>*</span>
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="actionBtns">
                    <Button type="text" danger onClick={onReset}>
                        RESET
                    </Button>
                    <Button type="primary" htmlType="submit">
                        SUBMIT
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};


EmailModal.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func
};


export default EmailModal;
