import React from "react";
import {action} from "@storybook/addon-actions"
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

// const callback=action("button add was pressed inside the form ")

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
}

export const AppWithReduxBaseExample=()=>{

    return <Provider store={store}><AppWithRedux/></Provider>
}