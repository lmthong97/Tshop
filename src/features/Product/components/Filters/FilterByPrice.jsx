import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button,  TextField, Typography } from '@mui/material';
import { createTheme } from '@mui/system';
import { makeStyles } from '@mui/styles';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid #f4f4f4`

    },
    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > span':{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    }
})
FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice({onChange}) {
    const classes = useStyles()
    const [values, setValues] = useState({
        salePrice_gte:0,
        salePrice_lte:0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues(prevValues=>({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleSubmit = () => {
        if (onChange) onChange(values)
        setValues({
            salePrice_gte:0,
            salePrice_lte:0,
        })
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Chọn khoảng giá</Typography>
            <Box className={classes.range}>
                <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} variant="standard"/>
                    <span>-</span>
                <TextField name="salePrice_lte"value={values.salePrice_lte} onChange={handleChange} variant="standard"/>

            </Box>
            <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;