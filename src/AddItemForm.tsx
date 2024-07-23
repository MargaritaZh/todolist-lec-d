import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {


    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addTask} variant={"contained"} color={"primary"}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>

    )
}