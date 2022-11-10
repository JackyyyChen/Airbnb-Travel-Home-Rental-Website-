import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@material-ui/core/InputAdornment'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { initData } from '../../services/config'
// import errorPop from '../../components/errorPopup';
// import Button from '@material-ui/core/Button'

export default function PaymentForm () {
  const [dataState, setdataState] = React.useState(initData)
  const handleChangeRooms = (e) => {
    const newData = { ...dataState }
    console.log(initData.metadata.bathRoomNumber)
    if (e.target.name === 'title') {
      initData.title = e.target.value
      // console.log(initData.title)
    } else if (e.target.name === 'price') {
      initData.price = e.target.value
      // console.log(initData.price)
    } else if (e.target.name === 'bedNumber') {
      newData.metadata.bedsNumber = e.target.value
    } else if (e.target.name === 'bedroom') {
      newData.metadata.bedRoomNumber = e.target.value
    } else if (e.target.name === 'bathroom') {
      newData.metadata.bathRoomNumber = e.target.value
    }
    setdataState(newData)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        House Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <Typography variant='h6'>House title:</Typography>
          <TextField
            fullWidth
            name='title'
            id='title'
            type='text'
            placeholder='Input title'
            // value={dataState.title}
            // value='good'
            onChange={handleChangeRooms}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6'>Price per night:</Typography>
          <TextField
            fullWidth
            name='price'
            id='price'
            type='number'
            placeholder='Input price per night'
            // value='200'
            // value={dataState.price}
            onChange={handleChangeRooms}
            variant="standard"
            InputProps={{
              inputProps: {
                min: 0,
              },
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant='h6'>Bathrooms:</Typography>
          <TextField
            required
            id="bathroom"
            name="bathroom"
            fullWidth
            placeholder='Number of bathroom/ bathrooms'
            value={dataState.metadata.bathRoomNumber}
            type='number'
            variant="standard"
            onChange={handleChangeRooms}
            InputProps={{
              inputProps: {
                max: 10,
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant='h6'>Bed Room Number:</Typography>
          <TextField
            required
            id="bedroom"
            name="bedroom"
            fullWidth
            placeholder='Number of bedroom'
            value={dataState.metadata.bedRoomNumber}
            type='number'
            variant="standard"
            onChange={handleChangeRooms}
            InputProps={{
              inputProps: {
                max: 10,
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant='h6'>Bed Numbers:</Typography>
          <TextField
            required
            id="bedNumber"
            name="bedNumber"
            fullWidth
            placeholder='Number of bed/ beds'
            value={dataState.metadata.bedsNumber}
            type='number'
            variant="standard"
            onChange={handleChangeRooms}
            InputProps={{
              inputProps: {
                max: 10,
                min: 0,
              },
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
