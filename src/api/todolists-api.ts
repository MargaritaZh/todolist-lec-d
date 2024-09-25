import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "5a87c1c3-beed-460d-b44d-58b57594e4b7"
    }
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get("https://social-network.samuraijs.com/api/1.1//todo-lists", settings)
        return promise
    },
    createTodolist(newTitle: string) {
        const promise = axios.post(
            'https://social-network.samuraijs.com/api/1.1//todo-lists',
            {title: newTitle}, settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolistTitle(id: string,title:string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title: title},
            settings
        )
        return promise

    }
}

