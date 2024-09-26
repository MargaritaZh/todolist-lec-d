import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

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

        todolistsAPI.createTodolist("New Title").then((res) => {

            // debugger
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'd6ca966a-8195-4685-94b3-d406b396870b'

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

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        const todolistId="f0fb99a0-142f-4a21-9ce7-a7bee52e8952"
        todolistsAPI.getTasks(todolistId).then((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)

            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId="f0fb99a0-142f-4a21-9ce7-a7bee52e8952"

        todolistsAPI.createTask(todolistId,"newTASK").then((res) => {
            // debugger
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    // useEffect(() => {
    //     // здесь мы будем делать запрос и ответ закидывать в стейт.
    //     // который в виде строки будем отображать в div-ке
    //
    //     const todolistId="30911290-00d6-4dd0-a890-4ff17862e725"
    //   //???????????????
    //     const taskId=""
    //
    //     todolistsAPI.deleteTask(todolistId,taskId).then((res) => {
    //         // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
    //         debugger
    //         setState(res.data)
    //     })
    // }, [])

    const deleteTask=()=>{
        // const todolistId="30911290-00d6-4dd0-a890-4ff17862e725"
        // //???????????????
        // const taskId=""

        todolistsAPI.deleteTask(todolistId,taskId).then((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
            debugger
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>

}