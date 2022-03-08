import { Box, Button, Container, createTheme, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { EMPTY_CART } from 'constants/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartTotalSelector } from './selectors';
import { formatPrice } from 'utils';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';


const theme = createTheme()
const useStyles =makeStyles({
root: {
    marginTop: theme.spacing(2),
},

left: {
    
},

right: {
    flex: '1 1 0',
},
link:{
    textDecoration: "none",
    
},
product: {
    display:"flex",
    flexFlow:"row nowrap",
    justifyContent: "space-between",
    alignItems: "center",

    padding: theme.spacing(0,2)
}

});



function CartFeature(props) {
    const classes = useStyles()
    const cartTotal= useSelector(cartTotalSelector)
    const procductsCart= useSelector(state => state.cart.cartItems)
    console.log(!procductsCart.length)



    const handleRemoveCart = ()=>{
        
    }
    return (
        <Box className={classes.root}>
            <Container>
                    <Typography variant="h2"sx={{fontWeight:'500'}}>
                        Shopping Cart
                    </Typography>
                    {!procductsCart.length 
                        ? <Box marginTop ={theme.spacing(2)}>
                            <Link to="/products" className={classes.link}>
                                    <Button variant="outlined" >Tiếp tục mua sản phẩm</Button>
                            </Link>
                            <Paper elevation={0} sx={{
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: theme.spacing(1),
                            }}>
                                <img src={EMPTY_CART} alt="empty-cart" width="60%"/>
                            </Paper>
                                
                        </Box>
                    
                        :<Grid container marginTop={theme.spacing(2)} spacing={1}>
                            <Grid item className={classes.left} xs={12} md={8} sm={8} lg={8}>
                                <Paper elevation={0} >
                                    {procductsCart.map(item=>(
                                        <Box key={item.id} className={classes.product}>
                                            <Box width="100px">
                                                <ProductThumbnail product={item.product}/>
                                            </Box>
                                            <Typography variant="body2" minWidth='160px'>{item.product.name}</Typography>
                                            <Typography variant="body2"minWidth='90px'>{formatPrice(item.product.salePrice)}</Typography>
                                            <Typography variant="body2">{item.quantity}</Typography>
                                            <Button variant="text" size="small" maxWidth='60px'>Delete</Button>

                                        </Box>
                                    ))}
                                </Paper>
                            </Grid>
                            <Grid item className={classes.right}  xs={12} md={4} sm={4}  lg={4} >
                                <Box>

                                    <Paper elevation={0} >
                                    <Typography variant="h4" sx={{padding:theme.spacing(2)}}>Thành tiền</Typography>
                                    <Box className={classes.product} sx={{
                                        marginTop: theme.spacing(5),
                                        paddingBottom: theme.spacing(2)
                                    }}>

                                    <Typography variant="h5">Tổng cộng: </Typography>
                                    <Typography variant="h6">{formatPrice(cartTotal)}</Typography>
                                    </Box>
                                    <Button variant="contained" fullWidth marginBottom={theme.spacing(2)}
                                    onClick={handleRemoveCart} >Thanh toán</Button>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    }
            </Container>
        </Box>
        
    );
}

export default CartFeature;