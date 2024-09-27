import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '66253064-f6b3-4f49-8240-cddabe300831'
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

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


type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}


export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists")
        return promise
    },
    createTodolist(newTitle: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: newTitle})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,model:UpdateTaskModelType){
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,model)
        return promise
    }
}



