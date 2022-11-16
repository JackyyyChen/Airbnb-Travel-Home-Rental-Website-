import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory, useLocation } from 'react-router'
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import fetchFunc from '../services/fetchRequest'
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Checkbox } from '@material-ui/core'
import Grid from '@mui/material/Grid';
// import Button from '@material-ui/core/Button'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import { purple } from '@material-ui/core/colors';
import InputAdornment from '@material-ui/core/InputAdornment'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { fileToDataUrl } from '../services/sendImage';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
  },
  listTitle: { width: 'auto' },
  radioStyle: {
    color: purple[800], '&.Mui-checked': { color: purple[600] }
  },
  boldFont: {
    fontWeight: 'bold',
  },
  redText: {
    color: 'red',
  }

}))

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Edit () {
  const styles = useStyles()
  const history = useHistory()
  const location = useLocation()
  const listID = location.pathname.split('/')[2]
  const [updateData, setUpdateData] = React.useState(null)
  const [propertyType, setPropertyType] = React.useState(null)
  const [thumbnailType, setThumbnailType] = React.useState('image')
  const [Inputimage, setInputImage] = React.useState([])

  console.log(propertyType, thumbnailType)
  console.log('currentData', updateData)
  React.useEffect(() => {
    fetchFunc(`/listings/${listID}`, 'GET').then((response) => {
      if (response.status !== 200) {
        const errorMessageInput = 'Can not get this data';
        errorPop(errorMessageInput);
      }
      response.json().then((data) => {
        const newData = { ...data.listing }
        delete newData.reviews
        delete newData.availability
        delete newData.published
        delete newData.postedOn
        if (newData.metadata.entirePlace === true) {
          setPropertyType('entirePlace')
        } else if (newData.metadata.privateRoom === true) {
          setPropertyType('privateRoom')
        } else if (newData.metadata.shareRoom === true) {
          setPropertyType('shareRoom')
        }
        if (newData.metadata.TV === true) {
          newData.metadata.TV = false
        }
        if (newData.metadata.BBQ === true) {
          newData.metadata.BBQ = false
        }
        if (newData.metadata.airCondition === true) {
          newData.metadata.airCondition = false
        }
        if (newData.metadata.kitchen === true) {
          newData.metadata.kitchen = false
        }
        if (newData.metadata.parking === true) {
          newData.metadata.parking = false
        }
        if (newData.metadata.pool === true) {
          newData.metadata.pool = false
        }
        if (newData.metadata.wifi === true) {
          newData.metadata.wifi = false
        }
        if (newData.metadata.pet === true) {
          newData.metadata.pet = false
        }
        setThumbnailType('image')
        setUpdateData(newData)
        // setInputImage(newData.thumbnail)
      })
    })
  }, [])
  const EditProperty = (e) => {
    const data = { ...updateData }
    if (e.target.value === 'entirePlace') {
      data.metadata.entirePlace = true
      data.metadata.privateRoom = false
      data.metadata.shareRoom = false
    } else if (e.target.value === 'privateRoom') {
      data.metadata.entirePlace = false
      data.metadata.privateRoom = true
      data.metadata.shareRoom = false
    } else if (e.target.value === 'shareRoom') {
      data.metadata.entirePlace = false
      data.metadata.privateRoom = false
      data.metadata.shareRoom = true
    }
    setUpdateData(data)
    setPropertyType(e.target.value)
  }
  // edit address
  const EditAddress = (e) => {
    const newData = { ...updateData }
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
    setUpdateData(newData)
  }
  // edit details
  const handleChangeRooms = (e) => {
    const newData = { ...updateData }
    if (e.target.name === 'title') {
      newData.title = e.target.value
      // console.log(initData.title)
    } else if (e.target.name === 'price') {
      newData.price = e.target.value
      // console.log(initData.price)
    } else if (e.target.name === 'bedNumber') {
      newData.metadata.bedsNumber = e.target.value
    } else if (e.target.name === 'bedroom') {
      newData.metadata.bedRoomNumber = e.target.value
    } else if (e.target.name === 'bathroom') {
      newData.metadata.bathRoomNumber = e.target.value
    }
    setUpdateData(newData)
  }

  const EditAmen = (e) => {
    const data = { ...updateData }
    if (e.target.name === 'pool') {
      data.metadata.pool = !data.metadata.pool
    } else if (e.target.name === 'BBQ') {
      data.metadata.BBQ = !data.metadata.BBQ
    } else if (e.target.name === 'parking') {
      data.metadata.parking = !data.metadata.parking
    } else if (e.target.name === 'airCondition') {
      data.metadata.airCondition = !data.metadata.airCondition
    } else if (e.target.name === 'wifi') {
      data.metadata.wifi = !data.metadata.wifi
    } else if (e.target.name === 'TV') {
      data.metadata.TV = !data.metadata.TV
    } else if (e.target.name === 'kitchen') {
      data.metadata.kitchen = !data.metadata.kitchen
    } else if (e.target.name === 'pet') {
      data.metadata.pet = !data.metadata.pet
    }
    setUpdateData(data)
  }
  const handleInputFile = (e) => {
    console.log('get')
    setInputImage(e.target.files)
  }
  // Upload the image
  const filesContent = (function () {
    if (Inputimage.length !== 0) {
      console.log('accept image');
      let UploadImage = ''
      for (let i = 0; i < Inputimage.length; i++) {
        UploadImage += ` ${Inputimage[i].name}`
      }
      return <Typography> Files are{UploadImage} </Typography>
    }
  })()
  // check all information correct
  const checkAllInformation = (info) => {
    if (info.metadata.BBQ === false &&
        info.metadata.TV === false &&
        info.metadata.airCondition === false &&
        info.metadata.kitchen === false &&
        info.metadata.parking === false &&
        info.metadata.pet === false &&
        info.metadata.pool === false &&
        info.metadata.wifi === false) {
      const errorMessageInput = 'Please choose one amentity';
      errorPop(errorMessageInput);
      return false
    }
    return true
  }
  // go back to listing
  const GoBackToListing = () => {
    history.push('/MyListing')
  };

  // make a submition
  const MakeSubmition = () => {
    const data = { ...updateData }
    if (checkAllInformation(data)) {
      let ExistThumbnail = ''
      for (let i = 0; i < Inputimage.length; i++) {
        console.log('###', Inputimage);
        fileToDataUrl(Inputimage[i]).then((res) => {
          ExistThumbnail += `${res} `
          if (i === Inputimage.length - 1) {
            data.thumbnail = ExistThumbnail
            console.log('accept image');
            fetchFunc(`/listings/${listID}`, 'PUT', data)
              .then((response) => {
                if (response.status !== 200) {
                // alert('not succeed');
                  const errorMessageInput = 'invalid submit!';
                  errorPop(errorMessageInput);
                }
                const errorMessageInput = 'Update Succeded!';
                errorPop(errorMessageInput);
                history.push('/MyListing')
              })
              .catch((err) => {
                console.log(err)
                const errorMessageInput = 'error exist';
                errorPop(errorMessageInput);
              })
          }
        })
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
        {/* Edit property */}
          <Typography variant="h6">
            Choose Type (choose one only)
          </Typography>
          <Grid container className={styles.gridContainer}>
            {/* Changing property */}
            <FormControl component='fieldset'>
            {/* Edit property */}
            <Typography variant="h6" align='center'>
                <span className={styles.boldFont}>Edit property type</span>
            </Typography>
            <RadioGroup row value={propertyType} onChange={EditProperty} >
            <FormControlLabel value="entirePlace" control={<Radio className={styles.radioStyle}/>} label="Entire place" />
            <FormControlLabel value="privateRoom" control={<Radio className={styles.radioStyle}/>} label="Private room" />
            <FormControlLabel value="shareRoom" control={<Radio className={styles.radioStyle}/>} label="Share room" />
            </RadioGroup>
            </FormControl>
          </Grid>
        {/* Edit address */}
        <Typography variant="h6" align='center'>
            <span className={styles.boldFont}>Edit address</span>
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
            onChange={EditAddress}
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
            onChange={EditAddress}
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
            onChange={EditAddress}
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
            onChange={EditAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Country:</Typography>
          <TextField
            required
            id="country"
            name="country"
            placeholder='Country'
            helperText='Enter the country name'
            fullWidth
            variant="standard"
            onChange={EditAddress}
          />
        </Grid>
        </Grid>
        {/* Edit detail */}
        <Typography variant="h6" align='center'>
            <span className={styles.boldFont}>Edit details</span>
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
        {/* Edit amemtities */}
            <Typography variant="h6" align='center'>
                <span className={styles.boldFont}>Edit amemtities</span>
            </Typography>
            <Typography variant="h8" >
                <div className={styles.boldFont}>You need to choice at least one</div>
            </Typography>
            <FormControl component='fieldset'>
                <FormControlLabel name="pool" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="Swimming pool" />
                <FormControlLabel name="BBQ" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="BBQ" />
                <FormControlLabel name="parking" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="Parking" />
                <FormControlLabel name="airCondition" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="Air Condition" />
                <FormControlLabel name="wifi" control={ <Checkbox className={styles.radioStyle} onChange={EditAmen}/> } label="WIFI" />
                <FormControlLabel name="TV" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="TV" />
                <FormControlLabel name="kitchen" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="Kitch" />
                <FormControlLabel name="pet" control={<Checkbox className={styles.radioStyle} onChange={EditAmen}/>} label="Pet allow" />
        </FormControl>
        {/* Edit image */}
        <Typography variant="h6" gutterBottom>
        Upload photos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} align='center'>
          <Typography>Thumbnail</Typography>
          <Box>
            <input
              accept='image/jpeg,image/png,image/jpg'
              className={styles.input}
              id='upload-file'
              multiple
              type='file'
              onChange={handleInputFile}
            />
            <Typography className={styles.uploadTitle}>
              Upload a image (jpeg, png, jpg)
            </Typography>
            {Inputimage.length === 0 && (<Typography> No file </Typography>)}
            {Inputimage.length !== 0 && filesContent }
            <Button variant='contained'
                    color='secondary'
                    component='span'
                    onClick={MakeSubmition}>Submit</Button>
          </Box>
          <Box component="form" onSubmit={GoBackToListing} noValidate sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back to listing
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ErrorPopup></ErrorPopup>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
