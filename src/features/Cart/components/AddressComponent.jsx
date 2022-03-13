import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, createTheme, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const theme = createTheme()
const useStyles =makeStyles({
root: {
   
},

});
AddressComponent.propTypes = {
    handleClick: PropTypes.func,
    handleRemoveAddress: PropTypes.func,
    data: PropTypes.object,
};

function AddressComponent({handleClick, data,handleRemoveAddress}) {
    const classes = useStyles()
   
    return (
        <Box className={classes.root}>
             <Paper elevation={0} sx={{padding:theme.spacing(1)}}>
                <Box sx={{
                    display: 'flex', 
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end',
                    
                }}>

                    <Typography variant="body1" paddingBottom={theme.spacing(1)}>Giao tới</Typography>
                    <Box>
                    <Button variant="text" size="small"  onClick={handleClick}>{Boolean(data)? 'Sửa địa chỉ' : 'Thêm địa chỉ'} </Button>
                    {Boolean(data)? <Button variant="text" size="small"  onClick={handleRemoveAddress}>Xóa </Button> : <></>}
                    
                    </Box>
                </Box>

            {Boolean(data)
                ?<>
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        marginBottom: theme.spacing(1),
                    }}
                >
                    <Typography variant="h6">{data.fullName}</Typography>
                    <Typography variant="h6">{data.phone}</Typography>
                </Box>
                <Typography variant="body1">{data.address}</Typography>
                </>
                : <Typography variant="h6">Bạn chưa nhập địa chỉ giao hàng!</Typography>
            }
            </Paper>
            
        </Box>
    );
}

export default AddressComponent;