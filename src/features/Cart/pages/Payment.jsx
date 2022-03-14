import { Box, Button, Container, createTheme, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { checkVoucher, formatPrice, shippedPrice } from 'utils';
import { checkoutOrder } from '../cartSlice';
import AddressComponent from '../components/AddressComponent';
import ProductCart from '../components/productCart';
import Voucher from '../components/Voucher';


const theme= createTheme()
const useStyles = makeStyles({
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
})
Payment.propTypes = {
    
};

function Payment(props) {

    const classes = useStyles()
    const {address, listProduct, totalPrice}= useSelector(state => state.cart.orderList)

    const [value, setValue] = useState('normal');
    const [pricePromo, setPricePromo] = useState(0);

    const [checkout, setCheckout] = useState('cod');

    const dispatch = useDispatch()
    
    const {url} = useRouteMatch()
    const history = useHistory()

    const {enqueueSnackbar} = useSnackbar();

    if (!listProduct) history.push('/cart')

    const handleChange = (event) => {
    setValue(event.target.value);
    };
    const handleCheckout = (event) => {
    setCheckout(event.target.value);
    };

    const applyVoucher = (value) => {
        console.log(checkVoucher(value))
        if(!value) return

        if(checkVoucher(value)===-1) {enqueueSnackbar('Voucher không hợp lê', {variant: 'warning'})}
        else{
            setPricePromo(checkVoucher(value))
            enqueueSnackbar(`Giảm giá thành công`, {variant: 'success'})
        }
    }
    const handleEditOrder = (event) => {
        history.push('/cart')
    }

    const orderPrice = (totalPrice *(100 - Number.parseInt(pricePromo))/100) + shippedPrice(value)
    const Checkout = () => {
        const orderDetails = {
            address,
            paymentMethod: checkout,
            listProduct,
            orderPrice,
        }
        
        const action = checkoutOrder()
        dispatch(action)
        console.log(orderDetails)
        enqueueSnackbar(`Đặt hàng thành công. Đơn hàng đang được xử lí. Cảm ơn quý khách đã mua hàng tại Tshop `, {variant: 'success'})
        history.push('/')
    }

    
    return (
        <Box>
            <Paper elevation={0} sx={{
                padding: theme.spacing(3,0)
            }}> 
                <Container>
                    <Typography variant="h3"sx={{fontWeight:'500'}}>
                        Thanh toán
                    </Typography>
                </Container>
            </Paper>

            <Container>
               
               <Grid container marginTop={theme.spacing(2)} spacing={1}>
                            <Grid item className={classes.left} xs={12} md={8} sm={8} lg={8}>
                                <Paper elevation={0} >
                                    <Box sx={{
                                        display: 'flex',
                                        flexFlow: 'row',
                                        justifyContent:'space-between',
                                        padding: theme.spacing(2,2,0)
                                    }}>
                                        <Typography variant="h6">
                                            Sản phẩm
                                        </Typography>
                                        <Button onClick={handleEditOrder} variant='outlined'>Thay đổi đơn hàng</Button>
                                    </Box>
                                    <Box>
                                        {listProduct
                                            ? listProduct.map(item=>(
                                                 <ProductCart key={item.id} productCart={item} url={url}/>
                                            ))
                                            : <></>
                                        }
                                    </Box>
                                </Paper>

                                <Paper elevation={0} sx={{marginTop:theme.spacing(1)}}>
                                    <Box sx={{
                                        padding: theme.spacing(2,2,0)
                                    }}>
                                        <Typography variant="h6">Hình thức vận chuyển</Typography>
                                        <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="normal" control={<Radio />} label="Vận chuyển thường" />
                                            <FormControlLabel value="speed" control={<Radio />} label="Vận chuyển nhanh" />
                                        </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Paper>

                                <Paper elevation={0} sx={{marginTop:theme.spacing(1)}}>
                                    <Box sx={{
                                        padding: theme.spacing(2)
                                    }}>
                                        <Typography variant="h6">Phương thức thanh toán</Typography>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={checkout}
                                                onChange={handleCheckout}
                                            >
                                                <FormControlLabel value="cod" control={<Radio />} label="Thanh toán trực tiếp" />
                                                <FormControlLabel value="digitalWallet" control={<Radio />} label="Thanh toán bằng ví điện tử" />
                                                <FormControlLabel value="internetBanking" control={<Radio />} label="Thanh toán bằng Internet Banking" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>

                                </Paper>
                            </Grid>

                            <Grid item className={classes.right}  xs={12} md={4} sm={4}  lg={4} >
                                <Box marginBottom={theme.spacing(1)}>
                                    <Paper elevation={0} >
                                        <AddressComponent data={address} url={url}/>
                                    </Paper>    
                                </Box>
                                
                                <Box>
                                    <Paper elevation={0} >
                                        <Typography variant="h6" sx={{padding:theme.spacing(1,1,0)}}>Mã giảm giá</Typography>
                                        <Voucher applyVoucher={applyVoucher} voucher/>
                                    </Paper>

                                </Box>
                                    

                                <Box>

                                    <Paper elevation={0} >


                                    <Typography variant="h4" sx={{padding:theme.spacing(2,1)}}>Thành tiền</Typography>
                                    
                                    <Box className={classes.product} sx={{
                                         marginTop: theme.spacing(5),   
                                    }}>
                                        <Typography >Tạm tính:</Typography>
                                        <Typography >{formatPrice(totalPrice)}</Typography>
                                    </Box>

                                    <Box className={classes.product} sx={{
                                        marginTop: theme.spacing(1),   
                                        
  
                                    }}>
                                        <Typography >Phí vận chuyển:</Typography>
                                        <Typography >{formatPrice(shippedPrice(value))}</Typography>
                                    </Box>
                                    <Box className={classes.product} sx={{
                                        marginTop: theme.spacing(1),   
                                        paddingBottom: theme.spacing(1)
  
                                    }}>
                                        <Typography >Giảm giá</Typography>
                                        <Typography fontWeight='bold'>{pricePromo}%</Typography>
                                    </Box>
                                    <Box className={classes.product} sx={{
                                         
                                        paddingBottom: theme.spacing(2)
  
                                    }}>
                                        <Typography ></Typography>
                                        <Typography > -{formatPrice((totalPrice *Number.parseInt(pricePromo))/100)}</Typography>
                                    </Box>

                                    <Box className={classes.product} sx={{
                                        paddingBottom: theme.spacing(2)
                                    }}>

                                    <Typography variant="h6">Tổng cộng: </Typography>
                                    <Typography variant="h5" color="#ee2347">{formatPrice((totalPrice *(100 - Number.parseInt(pricePromo))/100) + shippedPrice(value))}</Typography>
                                    </Box>

                                    
                                    </Paper>
                                    <Button
                                        variant="contained" 
                                        fullWidth sx={{margin: theme.spacing(2,0)}} 
                                        onClick={Checkout}
                                    >Đặt Hàng</Button>
                                </Box>
                            </Grid>
                        </Grid>
            </Container>
        </Box>
    );
}

export default Payment;