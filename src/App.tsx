import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";



export type  FilterValuesType = "all" | "active" | "complited"


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

  const todolistTitle_1 = "What to learn?"

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML & CSS", isDone: true},
    {id: 2, title: "JS & TS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Redux", isDone: false},
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: number) {

    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)

  }


  let tasksForTodolist = tasks
  if (filter === "complited") {
    tasksForTodolist = tasks.filter(t => t.isDone === true)

  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false)

  }


  return (
      <div className="App">
        <Todolist title={todolistTitle_1}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />
      </div>
  );
}

export default App;
