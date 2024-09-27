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

    const todolistId = '30911290-00d6-4dd0-a890-4ff17862e725'

    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'f0fb99a0-142f-4a21-9ce7-a7bee52e8952'

    useEffect(() => {
        todolistsAPI.updateTodolistTitle(todolistId, 'UpdateTitle').then(res => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTasks=()=>{

        todolistsAPI.getTasks(todolistId).then((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={getTasks}>get tasks</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle).then((res) => {
            // debugger
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"task title"} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}


export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
            debugger
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>

}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    const [title, setTitle] = useState<string>("title1")
    const [description, setDescription] = useState<string>("description1")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")

    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId ,{
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title:title}).then((res) => {
            // debugger (ЧТОБЫ ПОСМОТРЕТЬ ЧТО ПРИШЛО)
            debugger
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}

        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>

            <input placeholder={"title"} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>

            <input placeholder={"description"} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>

            <input placeholder={"status"} value={status} type="number"  onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={"priority"} value={priority} type="number" onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>


            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}