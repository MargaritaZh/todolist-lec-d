import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {todolistsReducer} from "./state/todolists-reducer";
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type  FilterValuesType = "all" | "active" | "complited"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    //======================================
    let todolistId1 = v1()//"gjjj-k22-nmk''
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: "What to learn?",
            filter: "all",
        },
        {
            id: todolistId2,
            title: "What to buy?",
            filter: "all",
        },
    ])
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todolistId1]: [

                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS & TS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "Book", isDone: false},
                {id: v1(), title: "Milk", isDone: true},
            ],
        }
    )


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }


    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }








    function changeFilter(value: FilterValuesType, todolistId: string) {

        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
//передадим копию [], чтобы произошла перерисовка компаненты
            setTodolists([...todolists])
        }

    }

    //====================

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(filteredTodolist)
        //удалить лишнее свойство ненужное в данных задачи для тодолиста
        delete tasksObj[todolistId]
        //засетить копию,чтобы произошла перерисовка
        setTasksObj({...tasksObj})
    }


    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)

        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])

        }

    }

    //=====================================


    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        //достаем массив тасок из конкретного тодолиста из объекта объектов
        let tasks = tasksObj[todolistId]

        let task = tasks.find(t => t.id === taskId
        )
        if (task) {
            task.title = newTitle
            //одна таска изменилась в массиве
            setTasksObj({...tasksObj})
        }

    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title,
        }

        setTodolists([todolist, ...todolists])

        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {

                        let tasksForTodolist = tasksObj[todolist.id]

                        if (todolist.filter === "complited") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)

                        }
                        if (todolist.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)

                        }


                        return (<Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={todolist.id}
                                              id={todolist.id}
                                              title={todolist.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={todolist.filter}
                                              removeTodolist={removeTodolist} changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
