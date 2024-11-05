import {setAppStatusAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../TodolistsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// const initialState: InitialStateType = {
//     isLoggedIn: false
// }

//без типизаци
const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        //как маленький редьюсер
        setIsLoggedInAC(state, action: PayloadAction<{value:boolean}>) {
            //меняем мутабельно
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
//переприсвоим чтобы в ТС не ругалось, что у нас нет такого AC
// const setIsLoggedInAC = slice.actions.setIsLoggedInAC
//можно деструктуризацией получить AC

export const {setIsLoggedInAC} = slice.actions



// export const authReducer =(state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }

//actions

// export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)

//thunks


// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и ответ заdispatch в Redux,изменим state

//закинем в санку собранные с формочки данные в объект data
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    //крутилку покажи
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                //залогинились удачно передаем true
                dispatch(setIsLoggedInAC({value:true}))

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


export const logoutTC = () => (dispatch: Dispatch) => {
    //крутилку покажи
    dispatch(setAppStatusAC("loading"))
    return authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                //выйти из приложения false
                dispatch(setIsLoggedInAC({value:false}))

                //крутилку убери:
                dispatch(setAppStatusAC("succeeded"))

                //зачисти данные после вылогинивания
                dispatch(clearTodosDataAC())

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types

// type ActionsType = ReturnType<typeof setIsLoggedInAC>

// type InitialStateType = {
//     isLoggedIn: boolean
// }
