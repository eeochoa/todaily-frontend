import React, {useState, useEffect, useReducer, useRef, useCallback } from 'react';
import './Todo.css'
import { Timeline, List, Button  } from 'antd';
import 'antd/dist/antd.css'
import TimeLineItem from "../../components/TimeLineItem/TimeLineItem";
import moment from 'moment';
import TodoCard from "../../components/Todos/TodoCard";
import ModalInput from "../../components/Input/ModalInput"
import axios from '../../Utils/axios'

export default function Todo(){
    const [rawData, setRawData] = useState([]);
    const [tasks, setTask] = useState([]);
    const [tasksCount, NumberCount] = useState(tasks.length+1);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentTime, setCurrentTime] = useState();
    const [currentDate, setCurrentDate] = useState(moment().format('DDMMYYYY'));
    const [modalInputVisible, setModalInputVisible] = useState(false);
    const [taskId, setTaskId] = useState();
    const [modalTitle, setModalTitle] = useState("");


    const addTaskButtonClick = () => {
        setTaskId("")
        setCurrentTime(moment().format('LT'));
        setModalTitle("Create a new Task")
        setModalInputVisible(true)
    }
    const handleModalSubmit = (modalData) => {
        NumberCount(tasksCount + 1);
        setCurrentDate(moment().format('DDMMYYYY'))
        const taskIndex = tasks.findIndex((task => task.id === taskId))
        //if Task is already present on the task list, we modify it
        if(taskIndex !== -1) {
            let taskCopy = [...tasks];
            let taskToMod = taskCopy[taskIndex];
            taskToMod.title = modalData.title;
            taskToMod.description = modalData.description;
            taskCopy[taskIndex] = taskToMod;
            setTask(taskCopy);
            setModalInputVisible(false)

            axios.put("/tasks/"+taskToMod.id, taskToMod)
                .then((response) =>(
                    console.log(response)
                    )
                ).catch((error) => {
                    console.log(error)
            })
        }else { //else, we create a new one
            if (modalData.description === undefined || modalData.description === "") {
                modalData.description = "No notes provided"
            }
            //Create new task
            const newTask = {
                id: tasksCount+currentDate,
                title: modalData.title,
                description: modalData.description,
                status: 'active',
                time: currentTime,
                date: currentDate
            }

            console.log("TASK: "+newTask.Id)
            console.log("TASK TITLE: "+newTask.title)
            console.log("TC+CD: "+tasksCount+currentDate)
            //Post new task to server
            axios.post("/tasks/"+newTask.id, newTask)
                .then((response) =>(
                        console.log(response)
                    )
                ).catch(error =>{
                    console.log(error)
            })
            //setTask([...tasks, newTask]);
            setModalInputVisible(false)
        }
    }

    function handleCardAction (callback)  {

        if(callback.value !== undefined){
            setCurrentTime(moment().format('LT'));
            setCurrentDate(moment().format('DDMMYYYY'))


            if (callback.value === "edit") {
                setModalTitle("Edit Task")
                setModalInputVisible(true)
                setTaskId(callback.id);
            } else{
                //find task in tasks array to mark as done or deleted
            const idToDel = callback.id
            const tasksCopy = [...tasks]
            for (let i = 0; i < tasks.length; i++) {
                if (tasksCopy[i].id === idToDel) {
                    tasksCopy.splice(i, 1)
                    break;
                }
            }

            setTask(tasksCopy);

            const completedTask = {
                id: callback.id,
                title: callback.title,
                status: "done",
                time: currentTime,
                date: currentDate,
                action: callback.value,
            }
            setCompletedTasks([...completedTasks, completedTask])
            }
        }else{
            alert("An error has occurred. Please try again");
        }
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('/tasks')
            setRawData(request.data)

            console.log(request);
            return request;
        }
        fetchData();
        /**Assign corresponding task items to arrays based on if they are active or done**/
        const activeTasks = [];//Active tasks
        const compTasks = []; //Completed tasks
        for(let i = 0; i < rawData.length; i++) {
            if (rawData[i].status === "active") {
                activeTasks.push(rawData[i]);
            } else {
                compTasks.push(rawData[i]);
            }
        }
            setTask(activeTasks);
            setCompletedTasks(compTasks);
    }, []);

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
                        <ModalInput title={modalTitle} visible={modalInputVisible} onCreate={handleModalSubmit} onCancel={() => {
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
                                    title = {item.title}
                                    description = {item.description}
                                    //action is passed as color to simplify color-coding timeline task. Except the "edit" value which is handled differently
                                    color = {item.action}
                                    time = {item.time}
                                >
                                </TimeLineItem>
                            ))}
                        </Timeline>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
