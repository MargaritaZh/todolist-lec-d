import {TaskStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    taskTitle: string
    todolistId: string

}
export type Action3Type = {
    type: "3"
    id: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | Action3Type

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
        case "ADD-TASK": {
            //из App
            // let newTask = {
            //     id: v1(),
            //     title: title,
            //     isDone: false
            // }
            //нахожу нужный массив по ключу в объекте объектов
            // let tasks = tasksObj[todolistId]
            //добавляю в массив новую таску
            // let newTasks = [newTask, ...tasks]
            //перезаписываю свойство в объекте по КЛЮЧУ
            // НЕЛЬЗЯ ТАК tasksObj."rrre-3jj-gfhgf" = newTasks
            // tasksObj[todolistId] = newTasks
            //set копию измененного объекта,чтобы произошла отрисовка
            // setTasksObj({...tasksObj})

            //как димыч
            // const stateCopy={...state}
            // let newTask = {
            //     id: v1(),
            //     title: action.taskTitle,
            //     isDone: false
            // }
            // let tasks = state[action.todolistId]
            // let newTasks = [newTask, ...tasks]
            // stateCopy[action.todolistId] = newTasks
            // return stateCopy

            //я написала
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.taskTitle, isDone: false}, ...state[action.todolistId]]
            }

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

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", taskTitle: taskTitle, todolistId: todolistId}
}

export const action3AC = (id: string, title: string): Action3Type => {
    return {type: "3", id: id, title: title}
}

