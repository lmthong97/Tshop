import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
    closeDialog: PropTypes.func,
};



function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();


    const handleSubmit = async (value) => {
        try {
            // auto set username = email
            value.username = value.email;

            const action = register(value);
            // const user = await dispatch(action).unwrap();
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            // close dialog
            const {closeDialog} = props;
            if (closeDialog){
                closeDialog();
            }

            // do something here on register successfully
            // console.log('New user: ', resultAction)
            enqueueSnackbar('Register successfully!!! ', {variant: 'success'})
        } catch (error) {
            // console.log('Failed to register user: ', error)
            enqueueSnackbar(error.message, {variant: 'error'})

        }
        
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;