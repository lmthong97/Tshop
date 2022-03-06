import { Box, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

ProductSkeletonList.propTypes = {
    length: PropTypes.number,

};
ProductSkeletonList.defaultProps = {
    length: 9   
}

function ProductSkeletonList({ length }) {
    
    const listSkeleton = Array.from(new Array(length))
    return (
        <Box>
            <Grid container>
                {listSkeleton.map((x,index) =>(

                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box padding={1}>
                            <Skeleton variant="rectangular" width="100%"height={200} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductSkeletonList;