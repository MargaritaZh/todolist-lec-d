
import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: InitialStateType = {
    themeMode: "light",
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALISED":
            return {...state, isInitialized: action.value}

        case "CHANGE_THEME":
            return {...state, themeMode: action.payload.themeMode}

        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//type


export type ThemeMode = "dark" | "light"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
    themeMode: ThemeMode,
    //происходит ли сейчас взаимодействие с сервером
    //еще запроса не было|запрос идет ждем ответа|ответ пришел все хорошо|ошибка была,ответ зафейлился плохим результатом, мы в этом случае должны засэтать ошибку или null если ошибки нет
    status: RequestStatusType,
    //если ошибка какая-то глобальнпя произойдет -мы запишем текст ошибки сюда
    error: string | null
    //true когда приложение проинициализировалось (проверили юзера,настройки получили и т.д.)
    isInitialized: boolean
}

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof changeThemeAC>
    | ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof setAppInitializedAC>

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

//thunk

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//
//     //санка должна отправить запрос на сервер и спросить залогинены мы или нет
//     authAPI.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 //мы залогинены
//                 dispatch(setAppInitializedAC(true))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//
//
//             //задиспатчим значение для auth -редьюсера что мы залогинены/
//             // который решает показывать формочку либо нет взависимости от значения setIsLoggedIn
//             dispatch(setIsLoggedInAC(true))
//         })
//
// }


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    //санка должна отправить запрос на сервер и спросить залогинены мы или нет
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                // Мы залогинены
                dispatch(setIsLoggedInAC({value:true}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch);
        })
        .finally(() => {
            // Убрать моргание, покажем крутилку пока идет запрос me, изначально isInitialized - false
            // Когда мы уже узнали ответ от сервера был ли пользователь ранее проинициализирован, неважно да или нет,
            // Мы уже изменим значение isInitialized на true и уберем крутилку
            dispatch(setAppInitializedAC(true));
            dispatch(setAppStatusAC('succeeded'));
        });
};




//action
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)

export const setAppInitializedAC = (value: boolean) => ({type: "APP/SET-IS-INITIALISED", value} as const)


export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: "CHANGE_THEME",
        payload: {themeMode},
    } as const
}