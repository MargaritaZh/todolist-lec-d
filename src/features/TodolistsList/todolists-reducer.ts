import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, setStatusActionType} from "../../app/app-reducer";


export type  FilterValuesType = "all" | "active" | "completed"

//склеиваем два типа TodolistType и недостающий элемент FILTER в типизацииTodolistType в API(с сервера)

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//заменим тип на новый
const initialState: Array<TodolistDomainType> = []

//заменим тип на новый
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        ///////////////////
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        /////////////////////
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FIlTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

//action
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status,
} as const)

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE", id, title
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FIlTER", filter, id
} as const)

//Создадим AC. Reducer,у нас откудо-то взялись тодолисты,зафиксируй их в state
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)


// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и передать в Redux

export const fetchTodolistsTC = () => (dispatch: ThunkDispatchType) => {
    //перед запросом крутилку покажи:
    dispatch(setStatusAC("loading"))

    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            //крутилку убираем:
            dispatch(setStatusAC("succeeded"))
        })
}


export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId).then(res => {
        //сначала удалим тодолист на серере, и когда пришел ответ что удалился ,то и удалим из BLL
        dispatch(removeTodolistAC(todolistId))
    })
}


export const addTodolistTC = (title: string) => (dispatch: ThunkDispatchType) => {
    //перед запросом крутилку покажи:
    dispatch(setStatusAC("loading"))

    todolistsAPI.createTodolist(title).then(res => {
        //сначала создадим на сервере нов тодолист, а когда придет ответ в BLL и т.д.
        const newTodo = res.data.data.item
        const action = addTodolistAC(newTodo)
        dispatch(action)
        //крутилку убираем:
        dispatch(setStatusAC("succeeded"))
    })
}


export const changeTodolistTitleTC = (id: string, newTitle: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolistTitle(id, newTitle).then(res => {
        //сначала обновим на сервере тодолист, а когда придет ответ тогда обновим и в BLL и т.д.
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

type  ThunkDispatchType = Dispatch<ActionsType | setStatusActionType>