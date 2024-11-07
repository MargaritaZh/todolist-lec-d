import {
    addTodolistAC, clearTodosDataAC, removeTodolistAC, setTodolistsAC,
} from "./todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../middleware/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {}

export const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        //как маленький подредьюсер
        SetTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            //МУТАБЕЛЬНО
            state[action.payload.todolistId] = action.payload.tasks
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {

            // return {
            //     ...state,
            //     [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            // }

            //МУТАБЕЛЬНО
            //находим нужный массив тасок
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }

        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            // return {
            //     ...state,
            //     [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            // }

            //МУТАБЕЛЬНО
            //находим массив тасок
            const tasks = state[action.payload.task.todoListId]
            //в начало массива добавить новую таску
            tasks.unshift(action.payload.task)

        },
        updateTaskAC(state, action: PayloadAction<{
            taskId: string,
            model: UpdateDomainTaskModelType,
            todolistId: string
        }>) {

            //     return {
            //         ...state,
            //         [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
            //             ...el, ...action.payload.model
            //         } : el)
            //     }
            // }

            //МУТАБЕЛЬНО
            //находим массив тасок
            const tasks = state[action.payload.todolistId]

            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
//обновим все части у объекта тасок на новые,которые лежат в model
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }

    },

    //НАМ НУЖНО ОБРАБОТАТЬ ACTION,созданные другими AC
    //нужно подписаться на их case, слушать
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {

            state[action.payload.todolist.id] = []
        });

        builder.addCase(removeTodolistAC, (state, action) => {

            delete state[action.payload.id]

        });
        builder.addCase(setTodolistsAC, (state, action) => {

            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })

        });
        builder.addCase(clearTodosDataAC, (state, action) => {
        //????????????
            state = {}
        });
    }

    // extraReducers: {
    //     [addTodolistAC.type]: (state, action: PayloadAction<>) => {},
    //     [removeTodolistAC.type]: (state, action: PayloadAction<>) => {},
    //     [setTodolistsAC.type]: (state, action: PayloadAction<>) => {}
    // }
})


export const tasksReducer = slice.reducer

export const {SetTasksAC, removeTaskAC, addTaskAC, updateTaskAC} = slice.actions


// export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
//     switch (action.type) {
// case "REMOVE-TASK":
//     return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
//     }
// case "ADD-TASK":
//     return {
//         ...state,
//         [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
//     }

// case "UPDATE-TASK":
//     return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
//             ...el, ...action.model
//         } : el)
//     }

// case "ADD-TODOLIST":
//     //1
//     return {
//         ...state,
//         [action.todolist.id]: []
//     }

// case "REMOVE-TODOLIST": {
//     //2
//     const stateCopy = {...state}
//     delete stateCopy[action.id]
//     return stateCopy
// }
//////////////////
// case "SET-TODOLISTS": {
//     //3
//     const copyState = {...state}
//     action.todolists.forEach((tl) => {
//         copyState[tl.id] = []
//     })
//     return copyState
// }
////////////////////
// case "SET-TASKS":
//     return {
//         ...state,
//         [action.todolistId]: action.tasks
//     }
//         case "CLEA-DATA":
//
//             //4
//             return {}
//         default:
//             return state
//     }
// }

//actions

// export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", todolistId, taskId} as const)

// export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task: task} as const)
//
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
//     type: "UPDATE-TASK",
//     taskId,
//     model,
//     todolistId
// } as const)

/////////////////
// export const SetTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
//     type: "SET-TASKS", tasks, todolistId
// } as const)

//thunks

// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и ответ заdispatch в Redux,изменим state

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    //перед запросом крутилку покажи:
    dispatch(setAppStatusAC({status: "loading"}))

    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(SetTasksAC({tasks:res.data.items,todolistId: todolistId}))
            //крутилку убираем:
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(res => {
        const action = removeTaskAC({taskId:taskId,todolistId: todolistId})
        // dispatchToTasksReducer(action)
        dispatch(action)
    })
}

export const addTaskTC = (taskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    //крутилку покажи
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTask(todolistId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                //dispatch action
                //получили ответ с сервера сразу созданный объект новой таски{}
                const task = res.data.data.item
                const action = addTaskAC({task:task})
                dispatch(action)
                //крутилку убери:
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {

                handleServerAppError(res.data, dispatch)

            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            // dispatch(setAppErrorAC(error.message))
            // dispatch(setAppStatusAC("failed"))
        })
}


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
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

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    //когда пришел твет с сервера, то уже обновляем в BLL и т.д.
                    dispatch(updateTaskAC({taskId:taskId,model: domainModel,todolistId: todolistId}))
                } else {

                    handleServerAppError(res.data, dispatch)

                    // if (res.data.messages.length) {
                    //     dispatch(setAppErrorAC(res.data.messages[0]))
                    // } else {
                    //     dispatch(setAppErrorAC("some error occurred"))
                    // }
                    // //если ошибка то:
                    // dispatch(setAppStatusAC("failed"))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                //
                // dispatch(setAppErrorAC(error.message))
                // dispatch(setAppStatusAC("failed"))
            })
    }

//types

// type ActionsType =
//
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof SetTasksAC>
//     | AddTodolistActionType
//     | RemoveTodolistActionType
//     | SetTodolistsActionType
//     | ClearDataActionType

// type  ThunkDispatchType = Dispatch<ActionsType>