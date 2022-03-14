import { Box } from '@mui/material';
import Product from 'features/Product';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Payment from './pages/Payment';

CartFeature.propTypes = {
    
};

function CartFeature(props) {
     const {url} = useRouteMatch()
    return (
        <Box >
            <Switch>
                <Route path="/" component={Product} exact />

                <Route path={url} exact component={CartPage}/>
                <Route path={`${url}/payment`} component={Payment}/>
            </Switch>
        </Box>
    );
}

export default CartFeature;