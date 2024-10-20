import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({disabled = false, ...props}: AddItemFormPropsType) => {

    console.log("AddItemForm is called")

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

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
            {/*<input value={newTaskTitle}*/}
            {/*       onChange={onNewTitleChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField
                disabled={disabled}
                variant="outlined"
                label="type value"
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                // className={error ? "error" : ""}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color={"primary"} disabled={disabled}>
                <ControlPoint/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>

    )
})