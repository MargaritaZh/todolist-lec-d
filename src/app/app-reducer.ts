const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return {...state, status: action.status}
        case 'APP-SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    //еще запроса не было|запрос идет ждем ответа|ответ пришел все хорошо|ошибка была,ответ зафейлился плохим результатом, мы в этом случае должны засэтать ошибку или null если ошибки нет
    status: RequestStatusType,
    //если ошибка какая-то глобальнпя произойдет -мы запишем текст ошибки сюда
    error: string | null

}

type ActionsType =
    | setErrorActionType
    | ReturnType<typeof setStatusAC>


export type setErrorActionType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error: string | null) => ({type: "APP-SET-ERROR", error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: "APP-SET-STATUS", status} as const)