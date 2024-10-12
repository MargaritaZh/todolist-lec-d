import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType


export type  FilterValuesType = "all" | "active" | "completed"

//склеиваем два типа TodolistType и недостающий элемент FILTER в типизацииTodolistType в API(с сервера)

export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

//заменим тип на новый
const initialState: Array<TodolistDomainType> = []

//заменим тип на новый
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        ///////////////////
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        /////////////////////
        case "REMOVE-TODOLIST": {
            return state.filter(todolist => todolist.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: "all"
            }
            return [newTodolist, ...state]
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

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const

export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist}) as const

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
}) as const

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FIlTER",
    filter,
    id
}) as const

//Создадим AC. Reducer,у нас откудо-то взялись тодолисты,зафиксируй их в state
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists}) as const

// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и передать в Redux

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            //сначала удалим тодолист на серере, и когда пришел ответ что удалился ,то и удалим из BLL
            dispatch(removeTodolistAC(todolistId))
        })
    }
}

export const addTodolistTC = (title: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title).then(res => {
            //сначала создадим на сервере нов тодолист, а когда придет ответ в BLL и т.д.
            const newTodo = res.data.data.item
            const action = addTodolistAC(newTodo)
            dispatch(action)
        })
    }
}

export const changeTodolistTitleTC = (id: string, newTitle: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolistTitle(id, newTitle).then(res => {
            //сначала обновим на сервере тодолист, а когда придет ответ тогда обновим и в BLL и т.д.
            const action = changeTodolistTitleAC(id, newTitle)
            dispatch(action)
        })
    }
}
