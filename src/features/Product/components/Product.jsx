import { Box, Typography } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
    product: PropTypes.object
};

function Product({product}) {
    const thumbnailUrl = product.thumbnail
        ?`${process.env.REACT_APP_API_URL}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER
    return (
        <Box padding={1}>
            <Box padding={1} >
                <Box display="flex" position="relative" width="100%" height="100%">

                <img 
                    src={thumbnailUrl} 
                    alt={product.name} 
                    width="100%"
                    position="absolute"
                />
                </Box>
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2"color={product.promotionPercent ? "#ff424e" :"#303030"}>
                <Box component="span" fontSize="16px" fontWeight="bold" mr={1} >
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
                </Box>
                {product.promotionPercent>0 ? ` -${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
        
    );
}

export default Product;