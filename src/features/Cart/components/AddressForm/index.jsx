import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, createTheme } from '@mui/material';
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
    
  },
  btnGroup:{
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',

    marginTop: theme.spacing(2)
  },
  submit: {
    
  },

  
});

AddressForm.propTypes = {
    handleSubmitForm: PropTypes.func,
    handleClose: PropTypes.func,
    data: PropTypes.object,
};


function AddressForm({handleSubmitForm, handleClose, data}) {
    const classes = useStyles();
    
    const schema = yup.object().shape({
        fullName: yup
        .string()
        .required('Nhập họ và tên.'),
        phone: yup
        .string()
        .required('Nhập số điện thoại.')
        .matches(REX_VN_PHONE_NUMBER, 'Số điện thoại không hợp lệ.'),
        address: yup
        .string()
        .required('Nhập địa chỉ giao hàng.')

    });


    const form = useForm({
        defaultValues: Boolean(data)?data:{
            fullName: '',
            phone: '',
            address: '',
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
        <div className={classes.root}>
            {isSubmitting}

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Họ và tên" form={form} />
                <InputField name="phone" label="Số điện thoại" form={form} />
                <InputField name="address" label="Địa chỉ giao hàng" form={form} />
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
                      Thêm địa chỉ
                  </Button>
                  <Button
                      disabled={isSubmitting}                    
                      variant='text'
                      size="large"
                      onClick={handleClose}
                  >
                    Trở về
                  </Button>
                </Box>
            </form>
        </div>
    );
}

export default AddressForm;