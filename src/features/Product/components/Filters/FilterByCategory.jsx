import { Box, createTheme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CategorySkeletonList from '../CategorySkeletonList';
const theme = createTheme();

const useStyles = makeStyles({
    root: {
        padding: theme.spacing(2)
    },
    menu:{
        padding:0,
        margin:0,
        listStyleType:'none',

        '& >li':{
            marginTop: theme.spacing(1),
            transition: 'all .25s',

            '&:hover': {
                cursor:'pointer',
                color: theme.palette.primary.dark,
            }
        }
    },
})
FilterByCategory.propTypes = {
    onChange: PropTypes.func,
    listCategory: PropTypes.array,
};

function FilterByCategory({onChange}) {
    const [categoryLoading, setCategoryLoading] = useState(true);

    const classes = useStyles()
    const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
       (async () => {
           try {
               const list = await categoryApi.getAll()
               setCategoryList(list.map(x=>({
                   id: x.id,
                   name: x.name,
               })))
            } catch (error) {
                console.log('Failed to fetch category list')
            }
            setCategoryLoading(false);
       })()
    }, []);



    const handleCategoryClick = (category) =>{
        if(onChange) onChange(category.id)
    }
    return (
        <Box className={classes.root} theme={theme}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
                {categoryLoading 
                    ? <CategorySkeletonList /> 
                    : <ul className={classes.menu}>
                        {categoryList.map(category => 
                    <li key={category.id} onClick={()=>handleCategoryClick(category)}>
                        <Typography variant="body2">
                            {category.name}
                        </Typography>
                     </li>
                )}
                    </ul>
                }
        </Box>
    );
}

export default FilterByCategory;