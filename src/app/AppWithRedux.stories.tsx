import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: ReduxStoreProviderDecorator,
}

export const AppWithReduxBaseExample = () => {

    // return <Provider store={store}><AppWithRedux/></Provider>

    return <AppWithRedux demo={true}/>
}

