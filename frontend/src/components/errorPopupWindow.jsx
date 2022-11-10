import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function OutlinedCard (props) {
  return (
    <Box sx={{ mt: 6, ml: 6, mb: 6, width: 275, display: 'none' }} id='errorPopupWindow'>
      <Card variant="outlined">
      <React.Fragment>
    <CardContent>
      <div id='errorContent'></div>
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
