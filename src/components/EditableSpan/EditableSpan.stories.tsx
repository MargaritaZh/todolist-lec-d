import React from "react";
import {action} from "@storybook/addon-actions"
import {EditableSpan} from "./EditableSpan";

const OnChangeCallback=action("value changed")

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

export const EditableSpanBaseExample=()=>{
    return <EditableSpan title={"start value"} onChange={OnChangeCallback}/>
}