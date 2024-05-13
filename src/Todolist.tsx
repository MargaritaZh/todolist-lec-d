import React, {useState} from "react";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string)=>void
    changeFilter: (value: FilterValuesType) => void
    addTask:(title:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle,setNewTaskTitle] = useState("")
    
    
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(e)=>{
                    setNewTaskTitle(e.currentTarget.value)}}

                       onKeyPress={(e)=>{if(e.ctrlKey && e.charCode=== 13){
                           props.addTask(newTaskTitle)
                           setNewTaskTitle("")
                       }}}


                />
                <button onClick={(e)=>{
                    props.addTask(newTaskTitle)
                    setNewTaskTitle("")
                }}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {props.removeTask(t.id)}}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active
                </button>
                <button onClick={() => {props.changeFilter("complited")}}>Completed</button>
            </div>
        </div>
    )
}