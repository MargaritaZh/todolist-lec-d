import React from 'react';
import './App.css';

import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";


function AppWithRedux() {

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

                {/*<LinearProgress/>*/}

            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}




export default AppWithRedux;
