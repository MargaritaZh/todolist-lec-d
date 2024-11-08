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
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {

    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)


    //мы должны один раз проинициализировать приложение,когда компанента вмонтировалась
    // вызовется один раз раз []
    useEffect(() => {
        if(!demo){
            dispatch(initializeAppTC())
        }
    }, [])



    const logoutHandler = useCallback(() => {
        dispatch(logoutTC()).then(() => {
            navigate('/login');
        });
    }, [dispatch, navigate])

    // если пользователь не проинициализирован,то покажем красивую анимированную крутилку
    if (!isInitialized) {
        return (<div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>)

    }


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
                        {isLoggedIn && <Button
                            color="inherit"
                            onClick={logoutHandler}
                        >Log out</Button>}
                    </Toolbar>

                    {status === "loading" && <LinearProgress/>}

                </AppBar>

                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Container>
            </div>

    )
}


export default AppWithRedux;
