import {TaskStateType} from "../App";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test("correct task should be deleted from correct array", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Book", isDone: false},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "tea", isDone: false},
        ],
    }
//действие
    const action = removeTaskAC("2", "todolistId2")
    const endState = tasksReducer(startState, action)

//проверяем соответствие
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)

    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy()
    //или
    // expect(endState["todolistId2"][0].id).toBe("1")
    // expect(endState["todolistId2"][1].id).toBe("3")
})

test("correct task should be added to correct array", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Book", isDone: false},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "tea", isDone: false},
        ],
    }
//дйствия
    const action = addTaskAC("juce", "todolistId2")
    const endState = tasksReducer(startState, action)

//проверяем соответствие

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].isDone).toBe(false)



})