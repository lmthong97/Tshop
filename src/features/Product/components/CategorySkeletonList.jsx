import { Box, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

CategorySkeletonList.propTypes = {
    length: PropTypes.number,

};
CategorySkeletonList.defaultProps = {
    length: 6   
}

function CategorySkeletonList({ length }) {
    
    const listSkeleton = Array.from(new Array(length))
    return (
        <Box>
            <Grid container>
                {listSkeleton.map((x,index) =>(

                    <Grid item key={index} xs={12}>
                        <Box padding={1}>
                            <Skeleton  />
                            
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CategorySkeletonList;