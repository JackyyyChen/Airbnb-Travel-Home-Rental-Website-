import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

export default function OutlinedCard (props) {
  return (
        <Box sx={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, display: 'none' }} id='errorPopupWindow'>
        <Card variant="outlined" >
        <React.Fragment>
        <CardContent>
        <Typography color="error" variant="h5" component="div">
            Error
        </Typography>
        <Typography variant="body2" id='errorContent'>
            {/* <div id='errorContent'></div> */}
        </Typography>
        </CardContent>
        <CardActions>
          <Button id='closePopupWindow'>Close</Button>
        </CardActions>
      </React.Fragment>
      </Card>
    </Box>
  );
}

OutlinedCard.propTypes = {
  children: PropTypes.string,
};

<div id='errorContent'></div>
