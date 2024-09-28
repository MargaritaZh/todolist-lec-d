import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FIlTER"
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType



export type  FilterValuesType = "all" | "active" | "completed"

//склеиваем два типа TodolistType и недостающий элемент FILTER в типизацииTodolistType в API(с сервера)

export type TodolistDomainType=TodolistType & {filter:FilterValuesType}

//заменим тип на новый
const initialState: Array<TodolistDomainType> =  []
//заменим тип на новый
export const todolistsReducer = (state: Array<TodolistDomainType>=initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(todolist => todolist.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: "all",
                    addedDate:"",
                    order:0,

                }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {

            const todolist = state.find(tl => tl.id === action.id)

            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case "CHANGE-TODOLIST-FIlTER": {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
           return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FIlTER", filter: filter, id: id}
}


