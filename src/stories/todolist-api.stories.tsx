import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "5a87c1c3-beed-460d-b44d-58b57594e4b7"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "Dimach"})

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists().then((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
            setState(res.data)
        })
    }, [])


    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.createTodolist("New Title").then(res => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'dd24bab7-e58c-4ce7-8df7-4bc71de208f8'

    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId).then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '82eb6a05-5f9f-412e-bae0-04db105423cf'

    useEffect(() => {
        todolistsAPI.updateTodolistTitle(todolistId,'UpdateTitle').then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}