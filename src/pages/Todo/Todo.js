import React, {useState} from 'react';
import './Todo.css'
import { Timeline, List, Button  } from 'antd';
import 'antd/dist/antd.css'
import TimeLineItem from "./TimeLineItem";
import moment from 'moment';
import ToDoCard from "./ToDoCard";

export default function Todo(){
    const [tasks, setTask] = useState([]);
    const [tasksCount, setTasksCount] = useState(tasks.length+1);
    const [cardButtonAction, setCardButtonAction] = useState("");
    const [cardTitle, setCardTitle] = useState("");
    const [cardDesc, setCardDesc] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentTime, setCurrentTime] = useState(moment().format('LT'));
    const [currentDate, setCurrentDate] = useState(moment().format('DDMMYYYY'));

    const handleButtonClick = () => {
        setTasksCount(tasksCount + 1);
        const newTask = {
            title: 'Task #'+tasksCount,
            description: "Insert description here",
            id: ""+tasksCount+""+currentDate
        }
        setTask([...tasks, newTask]);
        console.log(tasksCount);
        console.log(newTask.id)
    }

    const handleCardAction = (e) => {
        setCardButtonAction(e.target.value);
        setCardTitle(e.target.title)
        setCurrentTime(moment().format('LT'));
        console.log("Card Id: "+e.target.id)
        console.log("Card Action: "+e.target.value)
        console.log("Title: "+e.target.title)
        const completedTask = {
        }
    }

 /*   useEffect(() => {

    }, [tasks])*/

    return(
        <>
            <div className="root">
            <div className='top-container'>
                <div className='left-top-container'>
                    <h1>Hello, User. Your ToDaily's for today are: </h1>
                </div>

            </div>
            <div className='activity-container'>
                <div className='grid-root'>
                    <div className="to-do-list-container">
                        <Button className="add-task-button" onClick={handleButtonClick} type="primary" ghost>
                           + Add Task
                        </Button>
                        <List
                            itemLayout="vertical"
                            dataSource={tasks}
                            renderItem={ (item) => (
                                   <ToDoCard
                                       key = {item.id}
                                       id = {item.id}
                                       title={item.title}
                                       description={item.description}
                                       onClick={handleCardAction}
                                   />
                            )}
                        />

                    </div>

                    <div>
                        <Timeline>
                            <TimeLineItem color="green" text={tasks.indexOf(1)} time={currentTime}  />
                            <TimeLineItem color="gray" text={tasks.indexOf(1)} />
                            <TimeLineItem color="red" text={tasks.indexOf(1)} />
                        </Timeline>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

