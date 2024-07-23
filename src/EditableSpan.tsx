import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState(false)

    let [title, setTitle]
        = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)

    }

    const activateVieMode = () => {
        setEditMode(false)
        props.onChange(title)

    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return (
        editMode ?
            <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateVieMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}-----</span>
    )

}

