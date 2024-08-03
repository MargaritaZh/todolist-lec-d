import {TaskStateType} from "../App";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type Action2Type = {
    type: "2"
    title: string
}
export type Action3Type = {
    type: "3"
    id: string
    title: string
}

type ActionsType = RemoveTaskActionType | Action2Type | Action3Type

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            //из APP
            // let tasks = tasksObj[todolistId]
            // let filteredTasks = tasks.filter(t => t.id !== id)
            // tasksObj[todolistId] = filteredTasks
            // setTasksObj({...tasksObj})

            //написал димыч
            // const stateCopy = {...state}
            // const tasks = state[action.todolistId]
            // const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            // stateCopy[action.todolistId] = filteredTasks
            // return stateCopy

            //написала я
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case "2": {
            return {...state}
        }
        case "3": {
            return {...state}
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId}
}

export const action2AC = (title: string): Action2Type => {
    return {type: "2", title: title}
}

export const action3AC = (id: string, title: string): Action3Type => {
    return {type: "3", id: id, title: title}
}

