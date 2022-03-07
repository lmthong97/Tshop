import { Box, createTheme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from 'utils';


const theme = createTheme()
const useStyles =makeStyles({
root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`
},

priceBox:{
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
},
salePrice:{
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif'
},
originalPrice: {
    marginRight: theme.spacing(3),
    textDecoration: 'line-through',
    color: theme.palette.grey[500],
},
promotionPercent:{
    border: "1px solid #ff424e",
    borderRadius:'4px',
    color: '#ff424e',
    backgroundColor: "#fef1f0"
}

});
ProductInfo.propTypes = {
    product: PropTypes.object
};

function ProductInfo({product={}}) {
    const classes = useStyles()
    const {name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h4" >{name}</Typography>
            <Typography variant="body2" sx={{
                margin: theme.spacing(2, 0)
            }}>{shortDescription}</Typography>

            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice} color={promotionPercent ? "#ff424e" :"#303030"}>{formatPrice(salePrice)}</Box>

                {promotionPercent > 0 &&(
                    <>
                        <Box component="span" className={classes.originalPrice}>{originalPrice}</Box>
                        <Box component="span" className={classes.promotionPercent}>{` -${promotionPercent}% `}</Box>
                    </>
                )}

            </Box>
            
        </Box>
    );
}

export default ProductInfo;