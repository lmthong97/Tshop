import { Box, Button, createTheme, FormControl, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';


const theme = createTheme()
Voucher.propTypes = {
    applyVoucher: PropTypes.func,
};

function Voucher({applyVoucher}) {
   
    const [voucher, setVoucher] = React.useState('');
    

    const applyValue = () => {
        applyVoucher(voucher);
        setVoucher('')
    }
    
    return (
        <Box >
                <FormControl sx={{ 
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    margin: theme.spacing(1),
                }}>
                    

                        <TextField 
                            name="voucher"
                            placeholder="mã giảm giá"
                            fullWidth
                            value={voucher}
                            sx={{
                                    
                            }}
                            onChange={e => setVoucher(e.target.value)}
                        />
                        <Button
                            disabled={!Boolean(voucher)}
                            onClick={applyValue}
                            sx={{
                                marginLeft: theme.spacing(1),
                                width:'40%'
                            }}
                            variant="contained"
                            color="primary"
                            size='small'
                        >
                        Áp dụng
                        </Button>
                    
                </FormControl>
            
        </Box>
    );
    
}

export default Voucher;