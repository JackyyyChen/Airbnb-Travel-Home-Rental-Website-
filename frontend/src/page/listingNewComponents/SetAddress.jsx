import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { initData } from '../../services/config'

export default function AddressForm () {
  const [dataState, setdataState] = React.useState(initData)
  const handleChangeAddress = (e) => {
    const newData = { ...dataState }
    if (e.target.name === 'street') {
      newData.address.street = e.target.value
    } else if (e.target.name === 'city') {
      newData.address.city = e.target.value
    } else if (e.target.name === 'state') {
      newData.address.state = e.target.value
    } else if (e.target.name === 'postcode') {
      newData.address.postcode = e.target.value
    } else if (e.target.name === 'country') {
      newData.address.country = e.target.value
    }
    setdataState(newData)
  }
  return (
    <React.Fragment>
      <Typography variant="h6">
        House address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Street:</Typography>
          <TextField
            required
            id="street"
            name="street"
            // label="street"
            placeholder='Street Name'
            type='text'
            fullWidth
            variant="standard"
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant='h6'>City:</Typography>
          <TextField
            required
            id='city'
            name='city'
            placeholder='Input city'
            fullWidth
            variant="standard"
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>State:</Typography>
          <TextField
            required
            id="state"
            name="state"
            placeholder='State/Province/Region'
            fullWidth
            value={dataState.address.state}
            onChange={handleChangeAddress}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Postcode:</Typography>
          <TextField
            id="postcode"
            name="postcode"
            type='number'
            placeholder='Input postcode'
            helperText='Enter the postcode number'
            fullWidth
            variant="standard"
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Country:</Typography>
          <TextField
            required
            id="country"
            name="country"
            // label="City"
            placeholder='Country'
            helperText='Enter the country name'
            fullWidth
            variant="standard"
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
