import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: InitialStateType = {
    isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions

export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)

//thunks




// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и ответ заdispatch в Redux,изменим state

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    //крутилку покажи
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                //залогинились удачно
                dispatch(setIsLoggedInAC(true))

                //крутилку убери:
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    //крутилку покажи
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                //залогинились удачно
                dispatch(setIsLoggedInAC(false))

                //крутилку убери:
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types

type ActionsType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType = {
    isLoggedIn: boolean
}
