import { Box, Button, Container, createTheme, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StorageKeys from 'constants/storage-keys';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { formatPrice } from 'utils';
import { setOrderList } from '../cartSlice';
import AddressComponent from '../components/AddressComponent';
import AddressForm from '../components/AddressForm';
import EmptyCart from '../components/EmptyCart';
import ProductCart from '../components/productCart';
import { cartTotalSelector } from '../selectors';



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

product: {
    display:"flex",
    flexFlow:"row nowrap",
    justifyContent: "space-between",
    alignItems: "center",

    padding: theme.spacing(0,2)
}

});




function CartPage() {
    const classes = useStyles()
    const cartTotal= useSelector(cartTotalSelector)
    const dispatch = useDispatch()


    const procductsCart= useSelector(state => state.cart.cartItems)
    const [address, setAddress] = useState(() => {
        const storageAddress = JSON.parse(localStorage.getItem(StorageKeys.ADDRESS))
        // console.log(storageAddress)
        return storageAddress
    });

    const {url} = useRouteMatch()

    const history = useHistory()


    const [open, setOpen] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') return;
        
        // otherwise close current dialog
        setOpen(false);
     };


    const handleSubmitForm = (value) => {
        

        enqueueSnackbar('Thêm địa chỉ thành công ', {variant: 'success'})
        setAddress(()=>{
            localStorage.setItem(StorageKeys.ADDRESS, JSON.stringify(value) )
            return value
        });
        setOpen(false);
        
    }
    

    // check address in localStorage
    
    
    
    
    const handleRemoveAddress = () => {
        localStorage.removeItem(StorageKeys.ADDRESS)
        enqueueSnackbar('Địa chỉ đã xóa ', {variant: 'warning'})
        setAddress(()=>{
            const storageAddress = JSON.parse(localStorage.getItem(StorageKeys.ADDRESS))
            return storageAddress
        });

    }
    const handleBuy = () => {
        const cartOrder = {
            address,
            listProduct: procductsCart,
            totalPrice: cartTotal,
        }
        // console.log(cartOrder)
        history.push(`${url}/payment`)

        const action = setOrderList(cartOrder)

        dispatch(action)
    }
    return (
        <Box className={classes.root}>
            <Container>
                    <Typography variant="h2"sx={{fontWeight:'500'}}>
                        Shopping Cart
                    </Typography>
                    {!procductsCart.length 
                        ? <EmptyCart/>
                    
                        :<Grid container marginTop={theme.spacing(2)} spacing={1}>
                            <Grid item className={classes.left} xs={12} md={8} sm={8} lg={8}>
                                <Paper elevation={0} >
                                    {procductsCart.map(item=>(
                                        <ProductCart key={item.id} productCart={item}/>
                                    ))}
                                </Paper>
                            </Grid>

                            <Grid item className={classes.right}  xs={12} md={4} sm={4}  lg={4} >
                                <Box marginBottom={theme.spacing(1)}>
                                   <AddressComponent data={address} handleClick={handleClickOpen} handleRemoveAddress={handleRemoveAddress}/>
                                </Box>

                                <Box>

                                    <Paper elevation={0} >


                                    <Typography variant="h4" sx={{padding:theme.spacing(2,1)}}>Thành tiền</Typography>
                                    
                                    <Box className={classes.product} sx={{
                                         marginTop: theme.spacing(5),   
                                    }}>

                                    <Typography >Tạm tính: </Typography>
                                    <Typography >{formatPrice(cartTotal)}</Typography>
                                    </Box>

                                    <Box className={classes.product} sx={{
                                       
                                        paddingBottom: theme.spacing(2)
                                    }}>

                                    <Typography variant="h5">Tổng cộng: </Typography>
                                    <Typography variant="h6">{formatPrice(cartTotal)}</Typography>
                                    </Box>

                                    
                                    </Paper>
                                    <Button 
                                        variant="contained" 
                                        fullWidth sx={{margin: theme.spacing(2,0)}} 
                                        disabled={!Boolean(address)}
                                        onClick={handleBuy}
                                     >Mua Hàng ({procductsCart.length})</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    }

                
            </Container>
             <Dialog
                
                open={open}
                onClose={handleClose}
              
            >
                <DialogTitle >
                {"Địa chỉ mới"}
                </DialogTitle>
                <DialogContent>
                    <AddressForm data={address} handleSubmitForm={handleSubmitForm} handleClose={handleClose}/>
                </DialogContent>
               
            </Dialog>
            

        </Box>

        
        
    );
}

export default CartPage;