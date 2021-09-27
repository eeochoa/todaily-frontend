import React from 'react'
import { Timeline } from "antd";

//Colors props options: green, gray, red
export default function TimeLineItem(props){

    return(
        <Timeline.Item color={props.color}>{props.text} at {props.time}</Timeline.Item>
    )
}
