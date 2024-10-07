import {TaskStateType} from "../App";
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, SetTasksAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test("correct task should be deleted from correct array", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
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
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
    }
//дйствия
    const action = addTaskAC({
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate:"",
        deadline:"",
        description:"",
        order:0,
        priority:0,
        startDate:"",
        id:"id exsists",
    })
    const endState = tasksReducer(startState, action)

//проверяем соответствие

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)

})

test("status of cpecified task should be changed", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
    }
//дйствия
    const action = updateTaskAC("2", TaskStatuses.New, "todolistId2")
    const endState = tasksReducer(startState, action)

//проверяем соответствие

    expect(endState["todolistId2"][1].status).toBe(false)
    // expect(endState["todolistId2"][1].isDone).toBeFalsy()

    expect(endState["todolistId1"][1].status).toBe(true)
    // expect(endState["todolistId1"][1].isDone).toBeTruthy()

})


test("title of cpecified task should be changed", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
    }
//дйствия
    const action = changeTaskTitleAC("2", "Milkyway", "todolistId2")
    const endState = tasksReducer(startState, action)

//проверяем соответствие

    expect(endState["todolistId2"][1].title).toBe("Milkyway")
    expect(endState["todolistId1"][1].title).toBe("JS & TS")

})


test("new property with new array shoild be added when new todolist is added", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
    }
//дйствия
    const action = addTodolistAC("new todolist")
    const endState = tasksReducer(startState, action)

//проверяем соответствие
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})


test("property with todolists should be deleted", () => {
//стартовые данные
    const startState: TaskStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
    }
//дйствия
    const action = removeTodolistAC("todolistId2")
    const endState = tasksReducer(startState, action)


//проверяем соответствие
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).toBeUndefined()
})


test("empty array should be added when we set todolists", () => {


//дйствия
    const action = setTodolistsAC([{
        id: "1",
        title: "title1",
        addedDate: "",
        order: 0,
    }, {
        id: "2",
        title: "title1",
        addedDate: "",
        order: 0,
    }])
    const endState = tasksReducer({}, action)


//проверяем соответствие
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})


test("tasks should be added for todolists", () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS & TS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
        ],
    }

//дйствия
    const action = SetTasksAC(startState["todolistId1"], "todolistId1")
    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": [],
    }, action)


//проверяем соответствие

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)

})