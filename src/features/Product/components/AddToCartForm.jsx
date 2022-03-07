import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";


AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit= null}) {
    const schema = yup.object().shape({
        quantity: yup
        .number()
        .required('Please enter quantity')
        .min(1, 'Please enter at least 1')
        .typeError('Please enter a number')

    });


    const form = useForm({
        defaultValues: {
            quantity:1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    }
    return (
         <form onSubmit={form.handleSubmit(handleSubmit)}>
                <QuantityField name="quantity" label="Số lượng" form={form} />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{width:'250px'}}
                    size="large"
                >
                    Add to cart
                </Button>
            </form>
    );
}

export default AddToCartForm;