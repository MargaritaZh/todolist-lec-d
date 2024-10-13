import {TaskStateType} from "../App";

import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../middleware/store";




const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
          return {
              ...state,
              [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]
          }

        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el, ...action.model} : el)}

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]:[]
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
        ////////////////////
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId] :action.tasks
            }
        default:
            return state
    }
}

//actions

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", todolistId, taskId}) as const

export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task: task}) as const

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({type: "UPDATE-TASK", taskId, model, todolistId}) as const

/////////////////
export const SetTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: "SET-TASKS", tasks, todolistId}) as const

//thunks

// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и ответ заdispatch в Redux,изменим state

export const fetchTasksTC = (todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(SetTasksAC(res.data.items, todolistId))
            })
    }
}

export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId).then(res => {
            const action = removeTaskAC(taskId, todolistId)
            // dispatchToTasksReducer(action)
            dispatch(action)
        })
    }

export const addTaskTC = (taskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitle).then(res => {
                //dispatch action
                //получили ответ с сервера сразу созданны объект новой таски{}
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            }
        )
    }


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string,domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
//сначало обновим на сервере
        //1 при помощи функции getState мы находим наш state
        const state = getState()
//находим нужную таску
        const task = state.tasks[todolistId].find(t => t.id === taskId)
//если ее нет сообщение ошибки
        if (!task) {
            console.warn("task not found in the state")
            return
        }
//ЧТОБЫ НЕ ПЕРЕЗАТЕРЕТЬ ДАННЫЕ В model, возьмем для объекта model из найденной таски .КРОМЕ STATUS-ЕГО НУЖНО ОБНОВИТЬ
        const apiModel: UpdateTaskModelType = {
            status: task.status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel).then(res => {

           //когда пришел твет с сервера, то уже обновляем в BLL и т.д.
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
    }

//types

type ActionsType =

    |ReturnType<typeof removeTaskAC>
    |ReturnType<typeof addTaskAC>
    |ReturnType<typeof updateTaskAC>
    |ReturnType<typeof SetTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType