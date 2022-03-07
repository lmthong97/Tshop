import { Box, createTheme, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const theme = createTheme()
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',

        padding:0,
        listStyleType:'none',

        '& > li': {
            padding: theme.spacing(2, 4),
        },

        '& > li > a': {
            color: theme.palette.grey[700],
            textDecoration: 'none',
        },

        '& > li > a.active': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        }
    },
})
ProductMenu.propTypes = {
    
};

function ProductMenu(props) {
    const classes = useStyles()
    const {url} = useRouteMatch()
    return (
        <Box className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>Description</Link>
            </li>

            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>Additional Information</Link>
            </li>

            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>Reviews</Link>
            </li>
        </Box>
    );
}

export default ProductMenu;