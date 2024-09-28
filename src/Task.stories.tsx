import React from "react";

import {action} from "@storybook/addon-actions"
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

//const callback=action("button add was pressed inside the form ")

const changeTaskStatusCallback = action("Status changed")
const removeTaskCallback = action("task removed")
const changeTaskTitleCallback = action("title changed")

export default {
    title: 'Task Component',
    component: Task,
}

export const TaskBaseExample = () => {

    return <>
        <Task
            todolistId={"todolistId1"}
            task={{
                id: "1",
                status: TaskStatuses.Completed,
                title: "CSS", todoListId: "todolistId1", startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
        <Task
            todolistId={"todolistId2"}
            task={{
                id: "2",
                status: TaskStatuses.New,
                title:"JS",
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>
}