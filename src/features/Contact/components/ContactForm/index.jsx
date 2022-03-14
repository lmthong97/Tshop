import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputField from 'components/form-controls/InputField';
import { REX_VN_PHONE_NUMBER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";

const theme = createTheme()
const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: theme.spacing(2,2,4)
  },
  btnGroup:{
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    
    marginTop: theme.spacing(2)
  },
  submit: {
    
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: theme.spacing(1)
  },
  

  
});

ContactForm.propTypes = {
    handleSubmitForm: PropTypes.func,
    handleClose: PropTypes.func,
    data: PropTypes.object,
};


function ContactForm({handleSubmitForm}) {
    const classes = useStyles();
    
    const schema = yup.object().shape({
        fullName: yup
        .string()
        .required('Nhập họ và tên.'),
        phone: yup
        .string()
        .required('Nhập số điện thoại.')
        .matches(REX_VN_PHONE_NUMBER, 'Số điện thoại không hợp lệ.'),
        email: yup
        .string()
        .required('Vui lòng nhập email.')
        .email('Địa chỉ không đúng.'),
        message: yup
        .string()
        .required('Nhập lời nhắn.')

    });


    const form = useForm({
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            message: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
    const  onSubmit  = handleSubmitForm ;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

    const {isSubmitting} = form.formState;
    
    return (
        <Box className={classes.root}>
            
            
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Họ và tên" form={form} />
                <InputField name="phone" label="Số điện thoại" form={form} />
                <InputField name="email" label="Email" form={form} />
                <InputField name="message" label="Tin nhắn" form={form} />
                <Box className={classes.btnGroup}>

                  <Button
                      disabled={isSubmitting}
                      type="submit"
                      className={classes.submit}
                      sx={{
                        marginRight: theme.spacing(2  )
                      }}
                      variant="contained"
                      color="primary"
                      size="large"
                  >
                    Gửi ngay
                      
                  </Button>
                
                </Box>
            </form>
            {isSubmitting 
              && <Box className={classes.loading}>

              <CircularProgress sx={{
              }} />
              </Box>
              
            }
        </Box>
    );
}

export default ContactForm;