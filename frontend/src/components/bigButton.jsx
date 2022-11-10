import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const BigButton = (props) => {
  return (
    <Button
        variant="contained"
        sx={{ fontSize: '10pt' }}
        onClick={props.onClick}>
        {props.children}
    </Button>
  );
};

export default BigButton;

BigButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};
