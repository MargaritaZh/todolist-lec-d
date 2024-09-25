import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
        todolist: todolistsReducer,
        tasks: tasksReducer,
    }
)

// type AppRootStateType = {
//     todolists: Array<TodolistType>
//     tasks: TaskStateType
// }


export type AppRootStateType=ReturnType<typeof rootReducer >

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store



