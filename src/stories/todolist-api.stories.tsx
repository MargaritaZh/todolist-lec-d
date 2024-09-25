import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API',
    headers: {
        "API-KEY": "5a87c1c3-beed-460d-b44d-58b57594e4b7"
    }
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "Dimach"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        axios.get("https://social-network.samuraijs.com/api/1.1//todo-lists", settings).then(((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
            setState(res.data)
        }))

    }, [])


    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .post(
                'https://social-network.samuraijs.com/api/1.1//todo-lists',
                { title: 'newTodolist' },
                settings
            )
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'c750e0b8-a103-431c-9873-f86ecaa03fd3'

    useEffect(() => {
        axios
            .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '5a6e4e35-f5d0-4587-a8e5-52d6f24d0d17'

    useEffect(() => {
        axios
            .put(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                { title: 'React' },
                settings
            )
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}