import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../middleware/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type  FilterValuesType = "all" | "active" | "completed"

//склеиваем два типа TodolistType и недостающий элемент FILTER в типизацииTodolistType в API(с сервера)

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//заменим тип на новый
const initialState: Array<TodolistDomainType> = []


const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        //как маленький подредьюсер
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            // action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))

            //МУТАБЕЛЬНО
            //!! обязательно return-ем /вернем как state новый созданный бизнес-массив
            return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        },

        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            // state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.status} : tl)

            //МУТАБЕЛЬНО
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state[index].entityStatus = action.payload.status;
            }
        },
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            // state.filter(todolist => todolist.id !== action.payload.id)

            //МУТАБЕЛЬНО
            //найти элемент по индексу
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            //проверка
            if (index > -1) {
                //по этому индексу удалим один элемент
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            //[{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]

            //МУТАБЕЛЬНО
            state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            // state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

            //МУТАБЕЛЬНО
            //найти элемент по индексу  и заменить
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state[index].title = action.payload.title;
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            // state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)

            //МУТАБЕЛЬНО
            //найти элемент по индексу и заменить
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state[index].filter = action.payload.filter;
            }
        },
        clearTodosDataAC(state) {

           //???уточнить
            return []
        }
    }
})


export const todolistsReducer = slice.reducer

export const {
    setTodolistsAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    clearTodosDataAC
} = slice.actions


export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ClearDataActionType = ReturnType<typeof clearTodosDataAC>




type ActionsType =
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStatusAC>

// Создадим функцию, САНКУ-задача сделать асинх. работу, запросить данные и передать в Redux

//ЗАДИСПАТЧИМ САНКУ В САНКЕ И уберем useEfffect и запрос за тасками в компаненте todolist
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch<RootState, unknown, ActionsType>) => {
    //перед запросом крутилку покажи:
    dispatch(setAppStatusAC({status: "loading"}))

    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}))
            //крутилку убираем:
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data
        })
        .then((todos) => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id))
            })
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    //покажи крутилку
    dispatch(setAppStatusAC({status: "loading"}))
    //измени статус сущности данного тодолиста на loading для дальнейшего управления disabled элементов
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))

    todolistsAPI.deleteTodolist(todolistId).then(res => {
        //сначала удалим тодолист на серере, и когда пришел ответ что удалился ,то и удалим из BLL
        dispatch(removeTodolistAC({id: todolistId}))

        //убрать крутилку
        dispatch(setAppStatusAC({status: "succeeded"}))
    })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    //перед запросом крутилку покажи:
    dispatch(setAppStatusAC({status: "loading"}))

    todolistsAPI.createTodolist(title).then(res => {
        //сначала создадим на сервере нов тодолист, а когда придет ответ в BLL и т.д.
        const newTodo = res.data.data.item
        const action = addTodolistAC({todolist: newTodo})
        dispatch(action)
        //крутилку убираем:
        dispatch(setAppStatusAC({status: "succeeded"}))
    })
}


export const changeTodolistTitleTC = (id: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle(id, newTitle).then(res => {
        //сначала обновим на сервере тодолист, а когда придет ответ тогда обновим и в BLL и т.д.
        const action = changeTodolistTitleAC({id: id, title: newTitle})
        dispatch(action)
    })
}


//заменим тип на новый
// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
///////////////////
// case "SET-TODOLISTS":
// return action.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
/////////////////////
// case "REMOVE-TODOLIST":
//     return state.filter(todolist => todolist.id !== action.id)
// case "ADD-TODOLIST":
//     return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
// case "CHANGE-TODOLIST-TITLE":
//     return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
// case "CHANGE-TODOLIST-FIlTER":
//     return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
// case "CHANGE-TODOLIST-ENTITY-STATUS":
//     return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         case "CLEA-DATA":
//             return []
//         default:
//             return state
//     }
// }

//action
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
//     type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status,
// } as const)

// export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)

// export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)

// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: "CHANGE-TODOLIST-TITLE", id, title
// } as const)

// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: "CHANGE-TODOLIST-FIlTER", filter, id
// } as const)

//Создадим AC. Reducer,у нас откудо-то взялись тодолисты,зафиксируй их в state
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

//зачистим state в store после вылогинивания,чтобы у нас был пустой инициализацинный state
// export const clearTodosDataAC = () => ({type: "CLEA-DATA"} as const)


//types
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
// export type ClearDataActionType = ReturnType<typeof clearTodosDataAC>

// type ActionsType =
// | RemoveTodolistActionType
// | AddTodolistActionType
// | ReturnType<typeof changeTodolistTitleAC>
// | ReturnType<typeof changeTodolistFilterAC>
// | SetTodolistsActionType
// | ReturnType<typeof changeTodolistEntityStatusAC>
// | ClearDataActionType
//добавили тип чтобы работами диспатчились две санки
// | ReturnType<typeof setAppStatusAC>




