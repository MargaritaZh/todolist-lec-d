import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../middleware/store";
import {setErrorAC} from "../../app/app-reducer";

export function ErrorSnackbars() {
    //мы убираем локальный стэйт
    // const [open, setOpen] = React.useState(true);


    //теперь подписались на глобальное изменение state, появление ошибки
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch()


    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        //теперь диспатчим null вместо ошибки
        dispatch (setErrorAC(null))
        // setOpen(false);
    };


    const isOpen = error !== null


    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}
            >
                {/*This is a success Alert inside a Snackbar!*/}
                {error}
            </Alert>
        </Snackbar>
    );
}