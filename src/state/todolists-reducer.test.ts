import {TodolistType} from '../App'
import {v1} from 'uuid'
import {todolistsReducer} from "./todolists-reducer"


test("correct todolist should be removed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistID1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})









