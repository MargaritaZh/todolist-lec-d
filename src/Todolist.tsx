import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle:string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist:(todolistId:string)=>void
    changeTodolistTitle:(id:string,newTitle:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {

         const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onComplitedClickHandler = () => {
        props.changeFilter("complited", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask=(title:string)=>{

             props.addTask(title,props.id)
    }

    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id,newTitle)
    }


    return (
        <div className="todolist">
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            console.log(t.id + e.currentTarget.checked)
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue,props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeStatusHandler}
                                    checked={t.isDone}/>

                                {/*<span>{t.title}-----</span>*/}
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "complited" ? "active-filter" : ""}
                        onClick={onComplitedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

