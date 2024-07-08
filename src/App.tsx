import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type  FilterValuesType = "all" | "active" | "complited"

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export function Counter() {
    debugger
    console.log("counter rendered")
    let arr = useState(5)
    let data = arr[0]
    let setData = arr[1]

    return <div onClick={() => {
        setData(data + 1)
    }}>{data}</div>

}


function App() {


    //======================================
    let todolistId1 = v1()//"gjjj-k22-nmk''
    let todolistId2 = v1()


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: "What to learn?",
            filter: "active",
        },
        {
            id: todolistId2,
            title: "What to buy?",
            filter: "complited",
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

    //=====================================

    let [tasksObj, setTasksObj] = useState(
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


    return (
        <div className="App">
            <input/><button>+</button>

            {todolists.map(todolist => {

                let tasksForTodolist = tasksObj[todolist.id]

                if (todolist.filter === "complited") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)

                }
                if (todolist.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)

                }


                return (
                    <Todolist key={todolist.id}
                              id={todolist.id}
                              title={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={todolist.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
