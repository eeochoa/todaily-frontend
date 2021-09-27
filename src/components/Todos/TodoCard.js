import { Card, Avatar, Radio} from 'antd';
import {CheckSquareTwoTone, DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
import React from 'react';

const { Meta } = Card;

export default function TodoCard(props){

    return (
        <div>
            <Card style={{ width: 300, marginTop: 16 }} >
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={props.title}
                    description={props.description}
                />
            </Card>
            <div>
                <Radio.Group onChange={props.onClick}>
                    <Radio.Button title={props.title} id = {props.id} value = "green">{<CheckSquareTwoTone/>}</Radio.Button>
                    <Radio.Button title={props.title} id = {props.id} value = "red">{<DeleteTwoTone/>}</Radio.Button>
                    <Radio.Button title={props.title} id = {props.id} value = "edit">{<EditTwoTone/>}</Radio.Button>
                </Radio.Group>
            </div>
            </div>
    )
}
