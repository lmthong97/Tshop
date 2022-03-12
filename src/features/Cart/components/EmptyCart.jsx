import { Box, Button, createTheme, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { EMPTY_CART } from 'constants/index';
import React from 'react';
import { Link } from 'react-router-dom';


const theme = createTheme()
const useStyles =makeStyles({
root: {
    marginTop :theme.spacing(2)
},

link:{
    textDecoration: "none",
    
},

});
EmptyCart.propTypes = {
    
};

function EmptyCart(props) {
    const classes= useStyles()


    return (
        <Box className={classes.root}>
            <Link to="/products" className={classes.link}>
                    <Button variant="outlined" >Tiếp tục mua sản phẩm</Button>
            </Link>
            <Paper elevation={0} sx={{
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: theme.spacing(1),
                paddingBottom: theme.spacing(3),
            }}>
                <img src={EMPTY_CART} alt="empty-cart" width="60%" />
            </Paper>
                
        </Box>
    );
}

export default EmptyCart;