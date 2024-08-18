import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
        todolist: todolistsReducer,
        tasks: tasksReducer,
    }
)

// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TaskStateType
// }


type AppRootState=ReturnType<typeof rootReducer >

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store


