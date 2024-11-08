import {TaskStateType} from "../../trash/App";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TodolistType} from "../../api/todolists-api";


test(" ids should be equals", () => {

    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    let todolist:TodolistType = {title:"new todolist",addedDate:"",order:0,id:"uuouo222"}


    const action = addTodolistAC({todolist:todolist})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)



    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
