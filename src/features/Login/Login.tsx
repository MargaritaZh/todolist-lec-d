import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {getTheme} from "../../common/theme/theme";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../middleware/store";
import {ThemeMode} from "../../app/app-reducer";
import {useFormik} from "formik"
import {loginTC} from "./auth-reducer";
import React from "react";
import {Navigate} from "react-router-dom"


export const Login = () => {

    const dispatch:AppDispatch  = useDispatch()

    // const themeMode = useAppSelector(selectThemeMode)
    const themeMode = useSelector<AppRootStateType, ThemeMode>(state => state.app.themeMode)
    const theme = getTheme(themeMode)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const formik = useFormik({

        //функция для валидации
        validate: (values) => {
            if (!values.email) {
                return {
                    email: "Email is required"
                }
            }
            if (!values.password) {
                return {
                    password: "Password is required"
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            //задиспатчтм здесь ТС,когда уже собрали данные с формы

            dispatch(loginTC(values))
            /////////////
            alert(JSON.stringify(values))
        },
    })

//если ты залогинен true-вернись на главную страницу
    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To login get registered
                                <a
                                    style={{color: theme.palette.primary.main, marginLeft: '5px'}}
                                    href={'https://social-network.samuraijs.com/'}
                                    target={'_blank'}
                                    rel="noreferrer"
                                >
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>
                                <b>Email:</b> free@samuraijs.com
                            </p>
                            <p>
                                <b>Password:</b> free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        //
                                        {...formik.getFieldProps("rememberMe")}
                                        checked={formik.values.rememberMe}
                                        //
                                    />
                                }
                            />
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}