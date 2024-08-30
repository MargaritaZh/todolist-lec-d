import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(props.task.id + e.currentTarget.checked)
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    onChange={onChangeStatusHandler}*/}
            {/*    checked={t.isDone}/>*/}
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone} defaultChecked/>

            {/*<span>{t.title}-----</span>*/}
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>

    )

})