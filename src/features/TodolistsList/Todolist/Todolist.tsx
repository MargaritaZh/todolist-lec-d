import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";
import {AppDispatch} from "../../../middleware/store";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export const Todolist = React.memo(function (props: TodolistPropsType) {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])


    const onComplitedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
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
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
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
                    tasksForTodolist.map(t => <Task key={t.id}
                                                    todolistId={props.id}
                                                    task={t}
                                                    changeTaskStatus={props.changeTaskStatus}
                                                    removeTask={props.removeTask}
                                                    changeTaskTitle={props.changeTaskTitle}

                    />)
                }
            </div>
            <div>
                <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})
