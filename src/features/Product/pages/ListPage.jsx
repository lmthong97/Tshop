import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
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
    const queryParams = queryString.parse(location.search)

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    })
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        ...queryParams,
        _page: Number.parseInt(queryParams._page) || 1, 
        _limit: Number.parseInt(queryParams._limit) || 9,
        _sort: queryParams._sort ||'updated_at:DESC'

    });
    


    useEffect(() => {
        
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }, [history ,filters]);

    useEffect(() => {
        (async () => {
            try {
                const {data, pagination} = await productApi.getAll(filters)
                setProductList(data);
                console.log({data, pagination});

                setPagination(pagination);
                
            } catch (error) {
                console.log('Failed  to fetch products list', error)
            }
            setLoading(false);
        })()
    }, [filters]);

    const handlePageChange = (e, page) => {
        setFilters(prevFilters=>({
            ...prevFilters,
            _page: page,

        }))
    }

    const handleSortChange = (newSortValue) => {
        setFilters(prevFilters=>({
            ...prevFilters,
            _sort: newSortValue,

        }))
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(prevFilters=>({
            ...prevFilters,
            ...newFilters,
        }))
    }

    const setNewFilters = (newFilters) => {
        setFilters(newFilters)
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left} xs={12} sm={4}  lg={2}>
                        <Paper elevation={0} >
                            <ProductFilters filters={filters} onChange={handleFiltersChange}/>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right} xs={12} sm={8} lg={10}>
                        <Paper elevation={0} >
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange}/>
                            <FilterViewer filters={filters} onChange={setNewFilters}/>

                            {loading ? <ProductSkeletonList/> : <ProductList data={productList}/>}
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