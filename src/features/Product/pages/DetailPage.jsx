import { Box, Container, createTheme, Grid, LinearProgress, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { addToCart } from 'features/Cart/cartSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import useProductDetail from '../components/hook/useProductDetail';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';

const theme = createTheme()
const useStyles =makeStyles({
root: {
    
},

left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: '1px solid #f4f4f4'
},

right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),

},

});

DetailPage.propTypes = {
    
};

function DetailPage() {
    const classes = useStyles()
    const {
        params: {productId},
        url,
    } = useRouteMatch()

    const {product, loading} = useProductDetail(productId)

    const dispatch = useDispatch()

    const {enqueueSnackbar} = useSnackbar();


    if(loading) {
        return (<Box sx={{
            position:'fixed',
            top:0,
            left:0,
            width:'100%',
        }}>
            <LinearProgress/>
        </Box>)
    }

    const handleAddToCartSubmit = ({quantity}) => {
        // console.log('Form value: ', formValue)
        const action = addToCart({
            id: product.id,
            product,
            quantity,
        })
        dispatch(action)
        enqueueSnackbar(`Sản phẩm đã được thêm vào giỏ hàng`, {variant: 'success'})
    }
    return (
        <Box sx={{paddingBottom: theme.spacing(4)}}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product}/>

                            <AddToCartForm onSubmit={handleAddToCartSubmit}/>
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu/>
                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product}/>
                    </Route>
                    <Route path={`${url}/additional`} component={ProductAdditional}/>
                    <Route path={`${url}/reviews`} component={ProductReviews}/>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;