import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions"

const callback=action("button add was pressed inside the form ")

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

export const AddItemFormBaseExample=(props:any)=>{

    return <AddItemForm addItem={callback}/>
}

export const AddItemFormDisaibledExample=(props:any)=>{

    return <AddItemForm disabled={true} addItem={callback}/>
}