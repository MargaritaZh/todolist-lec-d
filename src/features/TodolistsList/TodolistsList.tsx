import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../middleware/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolist)

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch<AppDispatch>()


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
        const thunk = updateTaskTC(taskId, {status: status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch])
///////////////////////


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
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(todolist => {

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
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>)
}
