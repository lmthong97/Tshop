import { FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles({
  root: {}, 
  box: {
    marginTop: '10px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  }
})
QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const classes = useStyles()
  const { form, name, label } = props;
  const { control, setValue } = form;
  //= const hasError = errors[name]; 


  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field: { onChange, onBlur, value, name }, 
        fieldState: { invalid, isTouched, error } 
      }) => (
        <>
          <FormControl error={isTouched && invalid} fullWidth margin="normal" variant="outlined" size='small'>
              <Typography>{label}</Typography>
            <Box className={classes.box}>
              <IconButton onClick={()=>setValue(name, Number.parseInt(value)? Number.parseInt(value ) -1: 1 )}>
                <RemoveCircleOutline/>
              </IconButton>
              <OutlinedInput 
                id={name}
                error={invalid}
                type="number"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
              <IconButton onClick={()=>setValue(name, Number.parseInt(value)? Number.parseInt(value )+1 : 1 )}>
                <AddCircleOutline/>
              </IconButton>
            </Box>
          </FormControl>
          <FormHelperText error={invalid}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
}

export default QuantityField;
