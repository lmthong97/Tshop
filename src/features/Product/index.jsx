import { Box } from '@mui/material';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';



function Product() {
    const match = useRouteMatch();
    
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage}/>
            </Switch>
        </Box>
    );
}

export default Product;