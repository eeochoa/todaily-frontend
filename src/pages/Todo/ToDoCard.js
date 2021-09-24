import { Card, Avatar, Radio} from 'antd';
import {CheckSquareTwoTone, DeleteTwoTone} from "@ant-design/icons";
import React from 'react';

const { Meta } = Card;

export default function ToDoCard(props){

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
                    <Radio.Button title={props.title} id = {props.id} value = "done">{<CheckSquareTwoTone/>}</Radio.Button>
                    <Radio.Button title={props.title} id = {props.id} value = "delete">{<DeleteTwoTone/>}</Radio.Button>
                </Radio.Group>
            </div>
            </div>
    )
}
