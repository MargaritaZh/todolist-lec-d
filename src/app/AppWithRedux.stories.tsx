import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import {MemoryRouter} from "react-router-dom";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    // decorators: ReduxStoreProviderDecorator,
    decorators: [
        (Story:React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
        ReduxStoreProviderDecorator,
    ],
}

export const AppWithReduxBaseExample = () => {

    // return <Provider store={store}><AppWithRedux/></Provider>

    return <AppWithRedux demo={true}/>
}

