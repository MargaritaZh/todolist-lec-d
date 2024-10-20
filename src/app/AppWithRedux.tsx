import React from 'react';
import './App.css';

import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";
import {AppRootStateType} from "../middleware/store";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";

type PropsType = {
    demo?: boolean
}


function AppWithRedux({demo=false, ...props}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbars/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

                {status === "loading" && <LinearProgress/>}


            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>

        </div>
    );
}


export default AppWithRedux;
