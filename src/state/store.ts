import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
        todolist: todolistsReducer,
        tasks: tasksReducer,
    }
)


export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType=ReturnType<typeof rootReducer >

// @ts-ignore
window.store = store



