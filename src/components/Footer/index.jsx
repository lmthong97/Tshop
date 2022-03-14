import React from 'react';
import PropTypes from 'prop-types';
import { Box, createTheme, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const theme = createTheme()
const useStyles = makeStyles({
    root: {
        marginTop: theme.spacing(4),
        height: theme.spacing(8)
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
    }
})
Footer.propTypes = {
    
};

function Footer(props) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Paper elevation={0} sx={{
                
                width:'100%',
                height:'100%'
            }}>
                <Box className={classes.title}>
                    <Typography variant="h6">Create By MT with ❤️ </Typography>
                </Box>
               
            </Paper>
        </Box>
    );
}

export default Footer;