import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "../features/TodolistsList/todolists-reducer";
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    let todolistId1 = v1()//"gjjj-k22-nmk''
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: "What to learn?",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        },
        {
            id: todolistId2,
            title: "What to buy?",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        },
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todolistId1]: [

                {
                    id: v1(),
                    title: "HTML & CSS",
                    status: TaskStatuses.New,
                    todoListId: todolistId1,
                    startDate: "",
                    deadline: "",
                    addedDate: "",
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ""
                },
                {
                    id: v1(),
                    title: "JS & TS",
                    status: TaskStatuses.New,
                    todoListId: todolistId1,
                    startDate: "",
                    deadline: "",
                    addedDate: "",
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ""
                },

            ],
            [todolistId2]: [
                {
                    id: v1(),
                    title: "Book",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    startDate: "",
                    deadline: "",
                    addedDate: "",
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ""
                },
                {
                    id: v1(),
                    title: "Milk",
                    status: TaskStatuses.New,
                    todoListId: todolistId2,
                    startDate: "",
                    deadline: "",
                    addedDate: "",
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ""
                },
            ],
        }
    )


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC({taskId: id, todolistId: todolistId})
        dispatchToTasksReducer(action)
    }


    function addTask(title: string, todolistId: string) {
        const action = addTaskAC({
            task: {
                todoListId: todolistId,
                title: title,
                status: TaskStatuses.New,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: 0,
                startDate: "",
                id: "id exsists"
            }
        })
        dispatchToTasksReducer(action)
    }


    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskAC({taskId:taskId,model: {status: status},todolistId: todolistId})
        dispatchToTasksReducer(action)
    }


    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = updateTaskAC({taskId:taskId, model:{title: newTitle}, todolistId:todolistId})
        dispatchToTasksReducer(action)
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatchToTodolistsReducer(action)
    }


    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC({id: todolistId})
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }


    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC({id: id, title: newTitle})
        dispatchToTodolistsReducer(action)
    }


    function addTodolist(title: string) {

        const newTodolist = {
            id: v1(),
            addedDate: "",
            order: 0,
            title: title,
        }
        const action = addTodolistAC({todolist: newTodolist})

        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
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
                        if (todolist.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)

                        }
                        if (todolist.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)

                        }
                        return (<Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={todolist.id}
                                              todolist={todolist}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
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
