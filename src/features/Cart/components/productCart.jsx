import { Box, Button, createTheme, Typography } from '@mui/material';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import { removeFromCart } from '../cartSlice';

const theme = createTheme()
ProductCart.propTypes = {
    productCart: PropTypes.object,
};

function ProductCart({productCart}) {
    const dispatch = useDispatch()


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
            <Button variant="text" size="small"  onClick={handleRemoveCart}>Delete</Button>

        </Box>
    );
}

export default ProductCart;