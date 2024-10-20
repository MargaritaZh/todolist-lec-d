import React from 'react'
import {Provider} from "react-redux";

import {applyMiddleware, combineReducers, legacy_createStore} from "redux";

import {v1} from "uuid";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {AppRootStateType} from "../middleware/store";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolist: [
        {
            id: "todolistId1", title: "What to learn", filter: "all", addedDate: "",
            order: 0, entityStatus: "idle"
        },
        {
            id: "todolistId2", title: "What to buy", filter: "all", addedDate: "",
            order: 0, entityStatus: "loading"
        }
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }
        ]
    },
    app: {
        error: null,
        status: "idle"
    }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

