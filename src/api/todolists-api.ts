import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '32f2b4a6-0672-4ffa-9026-e2be7bac6297',
        'Authorization': 'Bearer 2b74339b-0a5a-4f3c-97c3-9318ffaa1d4e'
    }
}


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})


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
        const promise = instance.post<ResponseType<{
            item: TaskType
        }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
        return promise
    },
    logout(){
        const promise = instance.delete<ResponseType<{ userId?: number }>>('auth/login')
        return promise
    }
    ,
    me(){
        const promise = instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
        return promise
    }
}

//types

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

//скопировано в backEnd,  перечисление
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
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
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

