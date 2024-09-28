import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";



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
            addedDate:"",
            order:0,
        },
        {
            id: todolistId2,
            title: "What to buy?",
            filter: "all",
            addedDate:"",
            order:0,
        },
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todolistId1]: [

                {id: v1(), title: "HTML & CSS", status:  TaskStatuses.New,todoListId:todolistId1,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},
                {id: v1(), title: "JS & TS", status:  TaskStatuses.New,todoListId:todolistId1,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},

            ],
            [todolistId2]: [
                {id: v1(), title: "Book", status:  TaskStatuses.Completed,todoListId:todolistId2,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},
                {id: v1(), title: "Milk", status:  TaskStatuses.New,todoListId:todolistId2,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},
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


    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const action = changeStatusAC(taskId, status, todolistId)
        dispatchToTasksReducer(action)
    }


    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolistsReducer(action)
    }


    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }


    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
    }


    function addTodolist(title: string) {
        const action = addTodolistAC(title)
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
