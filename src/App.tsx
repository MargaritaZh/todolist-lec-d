import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";



export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    //======================================
    let todolistId1 = v1()//"gjjj-k22-nmk''
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
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

    let [tasksObj, setTasksObj] = useState<TaskStateType>(
        {
            [todolistId1]: [
                {id: v1(), title: "HTML & CSS", status: TaskStatuses.Completed, todoListId:todolistId1, startDate:"", deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},
                {id: v1(), title: "JS & TS", status:  TaskStatuses.Completed,todoListId:todolistId1,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},
            ],
            [todolistId2]: [
                {id: v1(), title: "Book", status:  TaskStatuses.New,todoListId:todolistId2,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},

                {id: v1(), title: "Milk", status:  TaskStatuses.Completed,todoListId:todolistId2,startDate:"",deadline:"", addedDate:"", order:0,priority:TaskPriorities.Low,description:""},
            ],
        }
    )


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks

        setTasksObj({...tasksObj})
    }


    function addTask(title: string, todolistId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        //нахожу нужный массив по ключу в объекте объектов
        let tasks = tasksObj[todolistId]
        //добавляю в массив новую таску
        let newTasks = [newTask, ...tasks]
        //перезаписываю свойство в объекте по КЛЮЧУ
        // НЕЛЬЗЯ ТАК tasksObj."rrre-3jj-gfhgf" = newTasks
        tasksObj[todolistId] = newTasks
        //set копию измененного объекта,чтобы произошла отрисовка
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        //достаем массив тасок из конкретного тодолиста из объекта объектов
        let tasks = tasksObj[todolistId]

        let task = tasks.find(t => t.id === taskId
        )
        if (task) {
            task.isDone = isDone
            //одна таска изменилась в массиве
            setTasksObj({...tasksObj})
        }

    }

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
                <Grid container style={{padding:"20px"}} >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} >
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

export default App;
