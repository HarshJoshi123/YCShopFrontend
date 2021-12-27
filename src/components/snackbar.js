import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = ({ err,setErr }) => (

    <Snackbar open={Boolean(err)}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        autoHideDuration={6000}  >
        <Alert severity={err.severity} onClose={()=>setErr(null)} sx={{ width: '100%' }}>
            {err.message}
        </Alert>
    </Snackbar>
)
export default Snack