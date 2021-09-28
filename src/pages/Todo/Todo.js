import React, {useState} from 'react';
import './Todo.css'
import { Timeline, List, Button  } from 'antd';
import 'antd/dist/antd.css'
import TimeLineItem from "../../components/TimeLineItem/TimeLineItem";
import moment from 'moment';
import TodoCard from "../../components/Todos/TodoCard";
import ModalInput from "../../components/Input/ModalInput"

export default function Todo(){
    const [tasks, setTask] = useState([]);
    const [tasksCount, NumberCount] = useState(tasks.length+1);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentTime, setCurrentTime] = useState();
    const [currentDate, setCurrentDate] = useState(moment().format('DDMMYYYY'));
    const [modalInputVisible, setModalInputVisible] = useState(false);
    const [taskId, setTaskId] = useState();
    const [modalTitle, setModalTitle] = useState("")

    const addTaskButtonClick = () => {
        setTaskId("")
        setModalTitle("Create a new Task")
        setModalInputVisible(true)
    }
    const handleButtonClick = (modalData) => {
        NumberCount(tasksCount + 1);
        setCurrentTime(moment().format('LT'));
        setCurrentDate(moment().format('DDMMYYYY'))
        console.log(modalData)

        let taskIndex = tasks.findIndex((task => task.id === taskId))
        console.log("TASK INDEX = "+taskIndex)
        if(taskIndex !== -1) {
            let taskCopy = [...tasks];
            let taskToMod = taskCopy[taskIndex];
            taskToMod.title = modalData.title;
            taskToMod.description = modalData.description;
            taskCopy[taskIndex] = taskToMod;
            setTask(taskCopy);
            setModalInputVisible(false)
        }else {
            if (modalData.description === undefined || modalData.description === "") {
                modalData.description = "No description provided"
            }
            const newTask = {
                title: modalData.title,
                description: modalData.description,
                id: "" + tasksCount + "" + currentDate,
                date: currentDate
            }
            setTask([...tasks, newTask]);
            console.log(tasksCount);
            console.log(newTask.id)
            setModalInputVisible(false)
        }
    }

    const handleCardAction = (e) => {
        setCurrentTime(moment().format('LT'));
        setCurrentDate(moment().format('DDMMYYYY'))
        console.log("Card Id: " + e.target.id)
        console.log("Card Action: " + e.target.value)
        console.log("Title: " + e.target.title)

        if (e.target.value === "edit") {
            setModalTitle("Edit Task")
            setModalInputVisible(true)
            console.log("Editing card with ID: "+e.target.id)
            setTaskId(e.target.id);
        } else{
            //find task in tasks array to eliminate
        const idToDel = e.target.id
        const tasksCopy = [...tasks]
        console.log("Deleting ID: " + idToDel)
        for (let i = 0; i < tasks.length; i++) {
            if (tasksCopy[i].id === idToDel) {
                tasksCopy.splice(i, 1)
                break;
            }
        }

        setTask(tasksCopy);

        const completedTask = {
            title: e.target.title,
            id: e.target.id,
            time: currentTime,
            date: currentDate,
            action: e.target.value
        }
        setCompletedTasks([...completedTasks, completedTask])
    }
    }

 /*   useEffect(() => {

    }, [tasks])*/

    return(
        <>
            <div className="root">
            <div className='top-container'>
                <div className='left-top-container'>
                    <h1>Hello! Your ToDaily's are: </h1>
                </div>

            </div>
            <div className='activity-container'>
                <div className='grid-root'>
                    <div className="to-do-list-container">
                        <Button className="add-task-button" onClick={addTaskButtonClick} type="primary" ghost>
                           + Add Task
                        </Button>
                        <ModalInput title={modalTitle} visible={modalInputVisible} onCreate={handleButtonClick} onCancel={() => {
                            setModalInputVisible(false);
                        }}/>
                        <List
                            itemLayout="vertical"
                            dataSource={tasks}
                            renderItem={ (item) => (
                                   <TodoCard
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
                            {completedTasks.map( (item) => (
                                <TimeLineItem
                                    key = {item.id}
                                    text = {item.title}
                                    color = {item.action}
                                    time = {item.time}
                                />
                            ))}
                        </Timeline>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

