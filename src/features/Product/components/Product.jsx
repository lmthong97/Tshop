import { Box, Typography } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';

Product.propTypes = {
    product: PropTypes.object
};

function Product({product}) {
    const history = useHistory()
    const thumbnailUrl = product.thumbnail
        ?`${process.env.REACT_APP_API_URL}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER


    const handleClick = () =>{
        history.push(`/products/${product.id}`)
    }
    return (
        <Box padding={1} onClick={handleClick}>
            <Box padding={1} >
                <Box  display="flex" position="relative" sx={{  minHeight: '170px'}}>

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
                    {formatPrice(product.salePrice)}
                </Box>
                {product.promotionPercent>0 ? ` -${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
        
    );
}

export default Product;