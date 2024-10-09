import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
        todolist: todolistsReducer,
        tasks: tasksReducer,
    }
)


export const store = legacy_createStore(rootReducer,{},applyMiddleware(thunk))


//это СТАРОЕ,НЕ ЗАКОМЕНТИЛА ЧТОБЫ Е ПЕРЕДЕЛЫВАТЬ ТИПИЗАЦИЮ
export type AppRootStateType=ReturnType<typeof rootReducer >

// @ts-ignore
// window.store = store




export type RootReducerType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>