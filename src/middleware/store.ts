import {AnyAction, combineReducers} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
        todolist: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer,
        auth: authReducer,
    }
)


// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
//заменили на :

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        //thunkMiddleware всиавим сюда по синтаксису: import {thunk} from "redux-thunk"
        getDefaultMiddleware().prepend(thunk),


})


//это СТАРОЕ,НЕ ЗАКОМЕНТИЛА ЧТОБЫ Е ПЕРЕДЕЛЫВАТЬ ТИПИЗАЦИЮ
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store


export type RootReducerType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>