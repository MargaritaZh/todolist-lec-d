import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer"


test("correct todolist should be removed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    // const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistID1})
//заменили создание объекта action вручную на вызов функции Action Creater
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})


test("correct todolist should be added", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    // const endState = todolistsReducer(startState, {type: "ADD-TODOLIST", title: newTodolistTitle})

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test("correct todolist should change its name", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    // const action: ChangeTodolistTitleActionType = {
    //     type: "CHANGE-TODOLIST-TITLE",
    //     id: todolistID2,
    //     title: newTodolistTitle,
    // }
    //
    // const endState = todolistsReducer(startState, action)

    const action=changeTodolistTitleAC(todolistID2,newTodolistTitle)
    const endState = todolistsReducer(startState,action )


    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test("correct filter of todolist should be changed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: FilterValuesType = "complited"

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    // const action: ChangeTodolistFilterActionType = {
    //     type: "CHANGE-TODOLIST-FITER",
    //     id: todolistID2,
    //     filter: newFilter,
    // }

    //второй вариант как протипизировать action
    // const action = {
    //     type: "CHANGE-TODOLIST-FITER" as const,
    //     id: todolistID2,
    //     filter: newFilter,
    // }


    const action=changeTodolistFilterAC(todolistID2,newFilter)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})





