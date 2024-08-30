import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = React.memo(function (props: TodolistPropsType) {

    console.log("TOdolist")

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])


    const onComplitedClickHandler = useCallback(() => {
        props.changeFilter("complited", props.id)
    }, [props.changeFilter, props.id])


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])


    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])


    let tasksForTodolist = props.tasks

    if (props.filter === "complited") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)

    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }


    return (
        <div className="todolist">
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            console.log(t.id + e.currentTarget.checked)
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                {/*<input*/}
                                {/*    type="checkbox"*/}
                                {/*    onChange={onChangeStatusHandler}*/}
                                {/*    checked={t.isDone}/>*/}
                                <Checkbox onChange={onChangeStatusHandler} checked={t.isDone} defaultChecked/>

                                {/*<span>{t.title}-----</span>*/}
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>

                                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "complited" ? "contained" : "text"}
                        onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

