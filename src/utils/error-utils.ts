import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api"
import {Dispatch} from "redux";
export const handleServerAppError= <D>(data: ResponseType<D>,dispatch:Dispatch<SetAppErrorActionType|SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("some error occurred"))
    }
    //если ошибка то:
    dispatch(setAppStatusAC("failed"))

}