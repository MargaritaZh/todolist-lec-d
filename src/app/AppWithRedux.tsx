import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";
import {AppDispatch, AppRootStateType} from "../middleware/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {

    const dispatch: AppDispatch = useDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())

    }, [])


    //если пользователь не проинициализирован,то покажем красивую анимированную крутилку
    if (!isInitialized) {
        return (<div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>)

    }


    return (
        <BrowserRouter>
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
                        {isLoggedIn && <Button
                            color="inherit"
                            onClick={logoutHandler}
                        >Log out</Button>}
                    </Toolbar>

                    {status === "loading" && <LinearProgress/>}

                </AppBar>
                <Container fixed>
                    {/*<Route exact path={"/"} render={()=><TodolistsList demo={demo}/>}/>*/}
                    {/*<Route path={"/login"} render={()=><Login/>}/>*/}
                    <Routes>
                        <Route path="/" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}


export default AppWithRedux;
