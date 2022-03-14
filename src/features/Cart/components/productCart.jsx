import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import { removeFromCart } from '../cartSlice';

const theme = createTheme()
ProductCart.propTypes = {
    productCart: PropTypes.object,
    url: PropTypes.string,
};

function ProductCart({productCart, url=''}) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') return;
        
        // otherwise close current dialog
        setOpen(false);
     };

    const handleRemoveCart = ()=>{
        //  console.log('Form value: ', productCart)
        const action = removeFromCart(
            productCart.id,
        )
        dispatch(action)
    }
    return (
        <Box sx={{
            display:"flex",
            flexFlow:"row nowrap",
            justifyContent: "space-between",
            alignItems: "center",

            padding: theme.spacing(0,2)
        }} >
            <Box width="100px">
                <ProductThumbnail product={productCart.product}/>
            </Box>
            <Typography variant="body2" minWidth='160px'>{productCart.product.name}</Typography>
            <Typography variant="body2"minWidth='90px'>{formatPrice(productCart.product.salePrice)}</Typography>
            <Typography variant="body2">{productCart.quantity}</Typography>
            { !url
            ? <>
                <Button variant="text" size="small"  onClick={handleClickOpen}>Delete</Button>
                <Dialog
                    disableEscapeKeyDown 
                    open={open}
                    onClose={handleClose}
                
                >
                    <DialogTitle >
                    {"Xóa Sản Phẩm"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText >
                        Bạn có muốn xóa sản phẩm đang chọn?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{marginBottom: theme.spacing(1)}} >
                    <Button variant="outlined" onClick={handleRemoveCart} autoFocus>
                        Xác Nhận
                    </Button>
                    <Button variant='contained' onClick={handleClose}>Hủy</Button>
                    </DialogActions>
                </Dialog>
            </>
            : <></>
            }
        </Box>
    );
}

export default ProductCart;