import {Card, Avatar, Radio, Button} from 'antd';
import {CheckSquareTwoTone, DeleteTwoTone, EditTwoTone, FileTextTwoTone } from "@ant-design/icons";
import React from 'react';

const { Meta } = Card;

export default function TodoCard(props){

    function handleClick(e) {

        const buttonAction = {
            title: e.target.title,
            id: e.target.id,
            value: e.target.value
        }
        props.onClick(buttonAction)
    }

    return (
        <div>
            <Card style={{ width: 300, marginTop: 16 }} >
                <Meta
                    avatar={
                        <Avatar shape="square" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/50/000000/external-clipboard-advertising-kiranshastry-gradient-kiranshastry.png" />
                    }
                    title={props.title}
                    description={props.description}
                />
            </Card>
            <div>
                <Radio.Group onChange={handleClick}>
                    <Radio.Button title={props.title} id = {props.id} value = "green">{<CheckSquareTwoTone/>}</Radio.Button>
                    <Radio.Button title={props.title} id = {props.id} value = "red">{<DeleteTwoTone/>}</Radio.Button>
                    <Button title={props.title} id = {props.id} onClick={handleClick} value = "edit">{<EditTwoTone/>}</Button>
                </Radio.Group>
            </div>
            </div>
    )
}
