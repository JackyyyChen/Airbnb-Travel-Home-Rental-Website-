import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChooseType from './listingNewComponents/ChooseType';
import SetAddress from './listingNewComponents/SetAddress';
import SetDetails from './listingNewComponents/SetDetails';
import SetAmenities from './listingNewComponents/SetAmenities';
import UploadPhoto from './listingNewComponents/UploadPhoto';
import { initData } from '../services/config'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
// import fetchFunc from '../services/fetchRequest'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/login" variant="body2">myWebsite</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Choose type', 'House address', 'House details', 'House amentities', 'Upload photo'];

function getStepContent (step) {
  switch (step) {
    case 0:
      return <ChooseType />;
    case 1:
      return <SetAddress />;
    case 2:
      return <SetDetails />;
    case 3:
      return <SetAmenities />;
    case 4:
      return <UploadPhoto />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout () {
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(activeStep);
  console.log(initData);
  // const [dataState, setdataState] = React.useState(initData)
  // const dataState = initData;
  const checkValidation = () => {
    if (activeStep === 0) {
      return checkFirstFormValidation()
    } else if (activeStep === 1) {
      return checkSecondValidation()
    } else if (activeStep === 2) {
      return checkThirdValidation()
    } else if (activeStep === 3) {
      return checkFourValidation()
    } else if (activeStep === 4) {
      return true
    }
  }
  // check first page
  const checkFirstFormValidation = () => {
    if (
      !initData.metadata.entirePlace &&
      !initData.metadata.privateRoom &&
      !initData.metadata.shareRoom
    ) {
      const errorMessageInput = 'You must choose one type!';
      errorPop(errorMessageInput);
      return false
    }
    return true
  }
  // check second page
  const checkSecondValidation = () => {
    if (
      initData.address.street.replace(' ', '').length === 0 ||
      initData.address.city.replace(' ', '').length === 0 ||
      initData.address.state.replace(' ', '').length === 0 ||
      initData.address.postcode.replace(' ', '').length === 0 ||
      initData.address.country.replace(' ', '').length === 0
    ) {
      const errorMessageInput = 'You must fill all information!';
      errorPop(errorMessageInput);
      return false
    }
    if (!/^\d+$/.test(initData.address.postcode)) {
      const errorMessageInput = 'You must enter positive number in postcode!';
      errorPop(errorMessageInput);
      return false
    }
    return true
  }
  // check third page
  const checkThirdValidation = () => {
    if (
      initData.title.replace(' ', '').length === 0 ||
      initData.price.replace(' ', '').length === 0 ||
      initData.metadata.bathRoomNumber.replace(' ', '').length === 0 ||
      initData.metadata.bedsNumber.replace(' ', '').length === 0 ||
      initData.metadata.bedRoomNumber.replace(' ', '').length === 0
    ) {
      const errorMessageInput = 'You must fill all information!';
      errorPop(errorMessageInput);
      return false
    }
    return true
  }
  // check four page
  const checkFourValidation = () => {
    if (
      initData.metadata.pool === false &&
      initData.metadata.BBQ === false &&
      initData.metadata.parking === false &&
      initData.metadata.airCondition === false &&
      initData.metadata.wifi === false &&
      initData.metadata.TV === false &&
      initData.metadata.kitchen === false &&
      initData.metadata.pet === false
    ) {
      const errorMessageInput = 'You need to selet one!';
      errorPop(errorMessageInput);
      return false
    }
    return true
  }
  const handleNext = () => {
    if (checkValidation()) {
      setActiveStep(activeStep + 1);
    }
    // setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // const handleSubmit = () => {
  //   // if (activeStep === steps.length) {
  //   console.log('I am here')
  //   console.log('+++', initData.thumbnail)
  //   fetchFunc('/listings/new', 'POST', initData)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         // alert('not succeed');
  //         const errorMessageInput = 'invalid submit!';
  //         errorPop(errorMessageInput);
  //       }
  //       const errorMessageInput = 'create new list succeded!';
  //       errorPop(errorMessageInput);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       const errorMessageInput = 'error exist';
  //       errorPop(errorMessageInput);
  //     })
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <ErrorPopup></ErrorPopup>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Listing new
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* {activeStep === steps.length && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                You have list your house
              </Typography>
              <Typography variant="subtitle1">
                Conguadulation! You have complete listing!
              </Typography>
              {activeStep !== 0 && (
                  <Button sx={{ mt: 3, ml: 1 }}>
                    <Link to="/Dashboard" variant="body2">Go to Dashboard</Link>
                  </Button>
              ) }
            </React.Fragment>
          )} */}
          {activeStep !== steps.length && (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep !== steps.length - 1 && (<Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >Next</Button>)}

                {activeStep === steps.length - 1 && (<Link to="/Dashboard" variant="body2">Go to Dashboard</Link>)}

              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
