import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type  FilterValuesType = "all" | "active" | "complited"

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export function Counter() {
    debugger
    console.log("counter rendered")
    let arr = useState(5)
    let data = arr[0]
    let setData = arr[1]

    return <div onClick={() => {
        setData(data + 1)
    }}>{data}</div>

}


function App() {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & TS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])
    console.log(tasks)


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId
        )
        if (task) {
            task.isDone = isDone
        }
        let copy = [...tasks]
        setTasks(copy)
    }


    //======================================


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: v1(),
            title: "What to learn?",
            filter: "active",
        },
        {
            id: v1(),
            title: "What to buy?",
            filter: "complited",
        },
    ])


    function changeFilter(value: FilterValuesType, todolistId: string) {

        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
//передадим копию [], чтобы произошла перерисовка компаненты
            setTodolists([...todolists])
        }

    }

    return (
        <div className="App">

            {todolists.map(todolist => {

                let tasksForTodolist = tasks

                if (todolist.filter === "complited") {
                    tasksForTodolist = tasks.filter(t => t.isDone === true)

                }
                if (todolist.filter === "active") {
                    tasksForTodolist = tasks.filter(t => t.isDone === false)

                }


                return (
                    <Todolist key={todolist.id}
                              id={todolist.id}
                              title={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={todolist.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
