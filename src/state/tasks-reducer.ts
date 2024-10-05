import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


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
    status: TaskStatuses
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTaskTitle: string
    todolistId: string
}

// export type SetTaskActionType = {
//     type: "CHANGE-TASK-TITLE"
//     taskId: string
//     newTaskTitle: string
//     todolistId: string
// }


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType


const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            //из APP
            // let tasks = tasksObj[todolistId]
            // let filteredTasks = tasks.filter(t => t.id !== id)
            // tasksObj[todolistId] = filteredTasks
            // setTasksObj({...tasksObj})

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



            //я написала
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(), title: action.taskTitle, status: TaskStatuses.New,
                    todoListId: action.todolistId,
                    startDate: "",
                    deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
                }, ...state[action.todolistId]]
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



            //я написала
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    status: action.status
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

        //////////////////
        case "SET-TODOLISTS": {
            const copyState = {...state}

            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", taskTitle: taskTitle, todolistId: todolistId}
}

export const changeStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {

    return {type: "CHANGE-TASK-STATUS", taskId: taskId, status: status, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, newTaskTitle: string, todolistId: string): ChangeTaskTitleActionType => {

    return {type: "CHANGE-TASK-TITLE", taskId: taskId, newTaskTitle: newTaskTitle, todolistId: todolistId}
}