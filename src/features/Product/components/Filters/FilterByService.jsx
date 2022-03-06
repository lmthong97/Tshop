
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid #f4f4f4`

    },
    list: {
        padding:0,
        margin: 0,
        listStyleType:'none',

        '& > li':{
            margin:0,
        }
    }
})
FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterByService({filters={},onChange}) {
    const classes = useStyles()
    

    const handleChange = (e) => {
        if (!onChange) return;
        const {name, checked} = e.target
        
        onChange({[name]: checked})
    }
  
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dịch vụ</Typography>
            <ul className={classes.list}>
                {[
                    {value:'isPromotion', label:'Khuyến mãi'}, 
                    {value:'isFreeShip', label:'Miễn phí vận chuyển'}
                ].map(service=>(
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color='primary'
                                />
                             }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;