import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "5a87c1c3-beed-460d-b44d-58b57594e4b7"
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     data: {}
// }

// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }
//
// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodolistType
//     }
// }


type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}


export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<Array<TodolistType>>("https://social-network.samuraijs.com/api/1.1//todo-lists", settings)
        return promise
    },
    createTodolist(newTitle: string) {
        const promise = axios.post<ResponseType<{
            item: TodolistType
        }>>(
            'https://social-network.samuraijs.com/api/1.1//todo-lists',
            {title: newTitle}, settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title: title},
            settings
        )
        return promise
    }
}

