import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import App from "./App";


export type  FilterValuesType = "all" | "active" | "complited"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    // let todolistId1 = v1()//"gjjj-k22-nmk''
    // let todolistId2 = v1()

    const dispatch=useDispatch()

    const todolists=useSelector<AppRootState,Array<TodolistType>>(state=>state.todolist)

    const tasks=useSelector<AppRootState,TaskStateType>(state=>state.tasks)



    // let [todolists] = useReducer(todolistsReducer, [
    //     {
    //         id: todolistId1,
    //         title: "What to learn?",
    //         filter: "all",
    //     },
    //     {
    //         id: todolistId2,
    //         title: "What to buy?",
    //         filter: "all",
    //     },
    // ])

    // let [tasks] = useReducer(tasksReducer,
    //     {
    //         [todolistId1]: [
    //
    //             {id: v1(), title: "HTML & CSS", isDone: true},
    //             {id: v1(), title: "JS & TS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false},
    //             {id: v1(), title: "Rest API", isDone: false},
    //             {id: v1(), title: "GraphQL", isDone: false}
    //         ],
    //         [todolistId2]: [
    //             {id: v1(), title: "Book", isDone: false},
    //             {id: v1(), title: "Milk", isDone: true},
    //         ],
    //     }
    // )


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        // dispatchToTasksReducer(action)
        dispatch(action)
    }


    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        // dispatchToTasksReducer(action)
        dispatch(action)
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeStatusAC(taskId, isDone, todolistId)
        // dispatchToTasksReducer(action)
        dispatch(action)
    }


    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        // dispatchToTasksReducer(action)
        dispatch(action)
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        // dispatchToTodolistsReducer(action)
        dispatch(action)
    }


    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        // dispatchToTodolistsReducer(action)
        // dispatchToTasksReducer(action)
        dispatch(action)
    }


    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        // dispatchToTodolistsReducer(action)
        dispatch(action)
    }


    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        // dispatchToTodolistsReducer(action)
        // dispatchToTasksReducer(action)
        dispatch(action)
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

                        let tasksForTodolist = tasks[todolist.id]

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

export default AppWithRedux;
