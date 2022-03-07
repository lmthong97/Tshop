import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper } from '@mui/material';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({product={}}) {
    const safeDescription = DOMPurify.sanitize(product.description)
    return (
        <Paper elevation={0} sx={{padding: '15px'}}>
            <div dangerouslySetInnerHTML={{__html: safeDescription}}/>
        </Paper>
    );
}

export default ProductDescription;