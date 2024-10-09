import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
     addTodolistTC,
    changeTodolistFilterAC,
     changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistTC, TodolistDomainType,
} from "./state/todolists-reducer";
import {

    addTaskTC,

    deleteTaskTC, updateTaskTC,

} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./middleware/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    // let todolistId1 = v1()//"gjjj-k22-nmk''
    // let todolistId2 = v1()

    const dispatch = useDispatch<AppDispatch>()

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolist)

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)


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


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = deleteTaskTC(id, todolistId)
        dispatch(thunk)

    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])


    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(taskId, {status:status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(taskId, {title:newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        // dispatchToTodolistsReducer(action)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback(function (todolistId: string) {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [dispatch])


    const changeTodolistTitle = useCallback(function (id: string, newTitle: string) {
        const thunk = changeTodolistTitleTC(id, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])


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
