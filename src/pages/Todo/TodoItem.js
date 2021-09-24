import {CheckSquareTwoTone, DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
import {Avatar, Card, Skeleton} from "antd";
import React, {useState} from "react";
import {useEffect} from "react/cjs/react.production.min";

const { Meta } = Card;

export default function TodoItem(props){

    //State tracking if card is loading
    const [loading, isLoading] = useState(false);
    const {id, title, description, value, onClick} = props
    const [componentId, setComponentId] = useState(id)
    /*console.log("id: "+componentId)
    console.log("title: "+title)
    console.log("description: "+description)
    console.log("value: "+value)
    //console.log("onClick: "+onClick)
*/
    const handleClick = e => {
        console.log("ID: "+e.target.name)
    }

    return(
        <Card
            key={id}
            hoverable
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <CheckSquareTwoTone className="card-action-icons" name ="done" value="done" onClick={onClick} />,
                <DeleteTwoTone  className="card-action-icons" key="delete" value="delete" onClick={handleClick}/>,
                <EditTwoTone className="card-action-icons" key="edit" value="edit" onClick={handleClick}/>
            ]}
        >
            <Skeleton loading={loading} avatar active>
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }

                    title={title}
                    description={description}
                    value={value}
                />
            </Skeleton>
        </Card>
    )
}
