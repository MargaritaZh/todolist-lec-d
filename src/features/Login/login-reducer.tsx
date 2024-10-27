import {SetAppErrorActionType, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";


const initialState: TaskStateType = {}


export const loginReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {


        default:
            return state
    }
}

//actions

// export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", todolistId, taskId} as const)


//thunks

// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и ответ заdispatch в Redux,изменим state

export const fetchTasksTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    alert()
}


//types

type ActionsType = any


type  ThunkDispatchType = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>