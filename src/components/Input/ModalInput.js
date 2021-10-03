import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

export default function ModalInput (props) {
    const { visible, onCreate, onCancel } = props
    const [form] = Form.useForm();
    const [visibility, setVisibility] = useState(visible)
    return (
        <Modal
            visible={visible}
            title={props.title}
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Task title missing',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
