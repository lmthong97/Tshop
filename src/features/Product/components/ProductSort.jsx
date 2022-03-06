import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({currentSort, onChange}) {
    const handleSortChange = (event, newValue) => {
        if(onChange) onChange(newValue)
    }

    return (
        <Box>
            <Tabs 
            value={currentSort} 
            indicatorColor='primary' 
            textColor='primary' 
            onChange={handleSortChange}
            >
                <Tab label="Hàng mới về" value= "updated_at:DESC"></Tab>
                <Tab label="Giá thấp" value= "salePrice:ASC"></Tab>
                <Tab label="Giá cao" value = "salePrice:DESC"></Tab>

            </Tabs>
        </Box>
    );
}

export default ProductSort;