import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolists-api";


type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

        //Так как у нас boolean значение, чтобы увязать с TaskStatuses используем тернарный оператор

        let newIsDoneValue=e.currentTarget.checked
        props.changeTaskStatus(props.task.id,newIsDoneValue? TaskStatuses.Completed:TaskStatuses.New, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.status===TaskStatuses.Completed ? "is-done" : ""}>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    onChange={onChangeStatusHandler}*/}
            {/*    checked={t.isDone}/>*/}
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.status===TaskStatuses.Completed} defaultChecked/>

            {/*<span>{t.title}-----</span>*/}
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>

    )

})