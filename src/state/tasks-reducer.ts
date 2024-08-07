import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


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
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTaskTitle: string
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

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
        case "CHANGE-TASK-STATUS": {
            //из App  //достаем массив тасок из конкретного тодолиста из объекта объектов
            //         let tasks = tasksObj[todolistId]
            //
            //         let task = tasks.find(t => t.id === taskId
            //         )
            //         if (task) {
            //             task.isDone = isDone
            //             //одна таска изменилась в массиве
            //             setTasksObj({...tasksObj})
            //         }

            //как димыч пишет
            // const copyState = {...state}
            // let tasks = copyState[action.todolistId]
            // let task = tasks.find(t => t.id === action.taskId
            // )
            // if (task) {
            //     task.isDone = action.isDone
            // }
            // return copyState

            //я написала
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {

            //из App
            // let tasks = tasksObj[todolistId]
            // let task = tasks.find(t => t.id === taskId
            // )
            // if (task) {
            //     task.title = newTitle
            //     //одна таска изменилась в массиве
            //     setTasksObj({...tasksObj})
            // }

            //как димыч пишет
            //     const copyState={...state}
            //     let tasks = copyState[action.todolistId]
            //     let task = tasks.find(t => t.id === action.taskId
            //     )
            //     if (task) {
            //         task.title = action.newTaskTitle
            //     }
            //     return copyState

//я написала
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTaskTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            // stateCopy[v1()]=[]
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
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

export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {

    return {type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, newTaskTitle: string, todolistId: string): ChangeTaskTitleActionType => {

    return {type: "CHANGE-TASK-TITLE", taskId: taskId, newTaskTitle: newTaskTitle, todolistId: todolistId}
}