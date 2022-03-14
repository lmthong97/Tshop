import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, createTheme, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { T_SHOP_IMG } from 'constants/index';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ContactForm from './components/ContactForm';

const theme= createTheme()
const useStyles = makeStyles({
    root: {}, 
    img:{
        width: '100%',
    },
    rightPaper:{
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading:{
        display: 'flex',
    }
})



function Contact(props) {
    const classes = useStyles()

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const history = useHistory()

    const {enqueueSnackbar} = useSnackbar();



    const handleSubmit= (value)=> {
        
        setLoading(true);
        setTimeout(() => {
           console.log(value)
           setSubmitting(true);
           setLoading(false);
           enqueueSnackbar(`Gửi thành công`, {variant: 'success'})
        }, 3000);
    }
    const handleDone = ()=> {
        history.push('/')
    }
    return (
        <Box>
            <Container>

                <Typography variant="h5" sx={{margin: theme.spacing(1)}}>Contact Us</Typography>
                <Grid container marginTop={theme.spacing(2)} spacing={1}>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <Box>
                             <Paper elevation={0}>

                                <img src={T_SHOP_IMG}alt='Tshop' 
                                className={classes.img}
                                ></img>
                             </Paper>
                        </Box>
                    </Grid>
               
                    <Grid item xs={12} md={12} sm={6} lg={6} >
                        <Box height='100%'>
                            <Paper elevation={0} className={classes.rightPaper}> 
                            
                            {submitting 
                                ? <>
                                <CheckCircleIcon color="primary" sx={{ fontSize: 100, margin: theme.spacing(2, 0) }} />
                                <Typography variant="h5"> Thank you! </Typography>
                                <Typography> Tin nhắn của bạn đã gửi. Chúng tôi sẽ phản hồi bạn trong 24 giờ. </Typography>
                                <Button onClick={handleDone} variant='contained' sx={{ marginTop: theme.spacing(2)}}>
                                    Xong
                                </Button>
                            
                                </>

                                :<>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',

                                        paddingTop: theme.spacing(2)
                                    }}>

                                        <Typography variant="h5" >Liên hệ chúng tôi</Typography>
                                    </Box>
                                        <ContactForm handleSubmitForm={handleSubmit}/>
                                </>
                            }    

                            </Paper>
                            {loading && <LinearProgress color="success" />}
                        </Box>
                    </Grid>
                </Grid>
                
            </Container>
        </Box>
    );
}

export default Contact;