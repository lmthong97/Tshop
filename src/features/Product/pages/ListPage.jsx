import { Box, Container, Grid, LinearProgress, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string'

import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import { useLocation } from 'react-router-dom';

ListPage.propTypes = {
    
};


const useStyles =makeStyles({
root: {},

left: {
    width: '250px'
},

right: {
    flex: '1 1 0'
},
pagination: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',

    marginTop: '20px',
    paddingBottom: '20px',
}
});



function ListPage(props) {
    const classes = useStyles();

    const history = useHistory()
    const location = useLocation()
    const queryParams = useMemo(()=>{
        const params= queryString.parse(location.search)

        return {
        ...params,
        _page: Number.parseInt(params._page) || 1, 
        _limit: Number.parseInt(params._limit) || 9,
        _sort: params._sort ||'updated_at:DESC',
        isPromotion: params.isPromotion ==='true' ,
        isFreeShip: params.isFreeShip ==='true' ,
    }
    },[location.search]) 

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    })
    const [loading, setLoading] = useState(true);
    // const [filters, setFilters] = useState({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1, 
    //     _limit: Number.parseInt(queryParams._limit) || 9,
    //     _sort: queryParams._sort ||'updated_at:DESC'

    // });
    


    // useEffect(() => {
        
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters)
    //     })
    // }, [history ,filters]);
    

    useEffect(() => {
        (async () => {
            try {
                const {data, pagination} = await productApi.getAll(queryParams)
                setProductList(data);
                // console.log({data, pagination});

                setPagination(pagination);
                
            } catch (error) {
                console.log('Failed  to fetch products list', error)
            }
            setLoading(false);
        })()
    }, [queryParams]);

    const handlePageChange = (e, page) => {
        // setFilters(prevFilters=>({
        //     ...prevFilters,
        //     _page: page,

        // }))
        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }

    const handleSortChange = (newSortValue) => {
        // setFilters(prevFilters=>({
        //     ...prevFilters,
        //     _sort: newSortValue,

        // }))
        const filters = {
            ...queryParams,
            _sort: newSortValue,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }

    const handleFiltersChange = (newFilters) => {
        // setFilters(prevFilters=>({
        //     ...prevFilters,
        //     ...newFilters,
        // }))

        const filters = {
            ...queryParams,
            ...newFilters,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }
    

    const setNewFilters = (newFilters) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters)
        })
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left} xs={12} sm={4}  lg={2}>
                        <Paper elevation={0} >
                            <ProductFilters filters={queryParams} onChange={handleFiltersChange}/>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right} xs={12} sm={8} lg={10}>
                        <Paper elevation={0} >
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange}/>
                            <FilterViewer filters={queryParams} onChange={setNewFilters}/>

                            {loading 
                            ? 
                            <Fragment>
                                <Box sx={{
                                    position:'fixed',
                                    top:0,
                                    left:0,
                                    width:'100%',
                                }}>
                                    <LinearProgress/>
                                </Box>)
                                <ProductSkeletonList/>
                            </Fragment>
                            : 
                            <ProductList data={productList}/>
                            }

                            <Box className={classes.pagination}>
                                <Pagination 
                                    
                                    count={Math.ceil(pagination.total / pagination.limit)} 
                                    page = {pagination.page}
                                    color="primary" 
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;