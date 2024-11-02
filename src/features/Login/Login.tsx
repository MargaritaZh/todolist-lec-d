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

    const themeMode = useSelector<AppRootStateType, ThemeMode>(state => state.app.themeMode)

    const theme = getTheme(themeMode)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const formik = useFormik({

        //функция для валидации,
        //вернуть объекты, с теми же свойствами полей,которые у нас есть
        // настроим валидацию,что показать в случае ошибки
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
            // допишем нужные поля
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            //!!!задиспатчим здесь объект с собранными данными с формочки в TC
            dispatch(loginTC(values))
            /////////////
            // alert(JSON.stringify(values))

            //зачистить форму после отправки данных
            formik.resetForm()

        },
    })

//если ты залогинен true-вернись на главную страницу
    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                {/*когда форма сабмитется,выполняется callback --->onSubmit*/}
                {/*при нажатии на кнопку,забираются все данные из формочки пд капотом onSubmit={formik.handleSubmit}*/}
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
                                // сделаем контролируемыми эти поля
                                // мы говорим дай мне пропсы ,поле name должно совпадать с созданными в values
                                {...formik.getFieldProps("email")}
                            />
                            {/*отобрази ошибку валидации*/}
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {/*отобрази ошибку валидации*/}
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        //
                                        {...formik.getFieldProps("rememberMe")}
                                        checked={formik.values.rememberMe}
                                        // допишем что значение checked мы будем брать из ...
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