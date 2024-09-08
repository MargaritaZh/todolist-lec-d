import React from "react";

import {action} from "@storybook/addon-actions"
import {Task} from "./Task";

//const callback=action("button add was pressed inside the form ")

const changeTaskStatusCallback=action("Status changed")
const removeTaskCallback=action("task removed")
const changeTaskTitleCallback=action("title changed")


export default {
    title: 'Task Component',
    component: Task,
}

export const TaskBaseExample=()=>{

    return <>
        <Task
              todolistId={"todolistId1"}
              task={{id:"1", isDone:true, title:"Css"}}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              changeTaskTitle={changeTaskTitleCallback}
        />
        <Task
            todolistId={"todolistId2"}
            task={{id:"2", isDone:false, title:"HTML"}}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>
}