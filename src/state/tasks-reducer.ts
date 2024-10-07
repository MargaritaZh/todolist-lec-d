import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType

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

export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: Array<TaskType>
    todolistId: string

}


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType


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
            //копию текущего состояния
            const stateCopy = {...state}

            // извлекаем новое (task) из объекта action
            const newTask = action.task

            //получаем список задач (tasks) для конкретного todoListId из скопированного состояния (stateCopy). Предполагается, что состояние (state) представляет собой объект, где ключами являются идентификаторы списков задач (todoListId), а значениями — массивы задач.
            const tasks = stateCopy[newTask.todoListId]

            //создаем новый массив задач (newTasks), который включает в себя новую задачу (newTask) и все задачи из текущего списка (tasks).
            const newTasks = [newTask, ...tasks]

            //обновляем копию состояния (stateCopy), заменяя старый список задач (tasks) новым списком (newTasks) для конкретного todoListId.
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
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
            stateCopy[action.todolist.id] = []
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
        ////////////////////
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task: task}
}

export const changeStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {

    return {type: "CHANGE-TASK-STATUS", taskId: taskId, status: status, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, newTaskTitle: string, todolistId: string): ChangeTaskTitleActionType => {

    return {type: "CHANGE-TASK-TITLE", taskId: taskId, newTaskTitle: newTaskTitle, todolistId: todolistId}
}

/////////////////

export const SetTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks: tasks, todolistId: todolistId,}
}


// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и ответ заdispatch в Redux,изменим state

export const fetchTasksTC = (todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(SetTasksAC(res.data.items, todolistId))
            })
    }
}

export const deleteTaskTC = (taskId: string, todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId).then(res => {
            const action = removeTaskAC(taskId, todolistId)
            // dispatchToTasksReducer(action)
            dispatch(action)
        })
    }
}


export const addTaskTC = (taskTitle: string, todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitle).then(res => {
                //dispatch action
                //получили ответ с сервера сразу созданны объект новой таски{}
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            }
        )
    }
}

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        const model: UpdateTaskModelType = {
            status: status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }

        todolistsAPI.updateTask(todolistId, taskId, model).then(res => {

           //когда пришел твет с сервера, то уже обновляем в BLL и т.д.
            dispatch(changeStatusAC(taskId, status, todolistId))
        })
    }
}

