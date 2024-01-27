import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChooseType from './listingNewComponents/ChooseType';
import SetAddress from './listingNewComponents/SetAddress';
import SetDetails from './listingNewComponents/SetDetails';
import SetAmenities from './listingNewComponents/SetAmenities';
import UploadPhoto from './listingNewComponents/UploadPhoto';
import { initData } from '../services/config'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';

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

// const theme = createTheme();
const NextButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#DC0F62', // 自定义颜色
  borderRadius: 90,
  color: 'white',
  '&:hover': {
    backgroundColor: '#BB0A50', // 鼠标悬停时颜色略暗
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: 'white', // 自定义颜色
  borderRadius: 90,
  color: '#DC0F62',
  '&:hover': {
    color: '#BB0A50',
  },
}));

const CustomStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepIcon-root.Mui-completed': {
    color: '#DC0F62', // 完成的步骤颜色
  },
  '& .MuiStepIcon-root.Mui-active': {
    color: '#DC0F62', // 激活的步骤颜色
  },
  '& .MuiStepIcon-text': {
    fill: 'white', // 步骤内部文字颜色
  },
}));

export default function Checkout () {
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory()
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
  // go back to listing
  const GoBackToMyListing = () => {
    history.push('/MyListing')
  };
  // check first page
  const checkFirstFormValidation = () => {
    if (!initData.metadata.entirePlace &&
        !initData.metadata.privateRoom &&
        !initData.metadata.shareRoom
    ) {
      const errorMessageInput = 'You must choose one type!';
      errorPop(errorMessageInput);
      // window.showError('发生错误：' + 'You must choose one type!')
      return false
    }
    return true
  }
  // check second page
  const checkSecondValidation = () => {
    if (initData.address.street.replace(' ', '').length === 0 ||
        initData.address.city.replace(' ', '').length === 0 ||
        initData.address.state.replace(' ', '').length === 0 ||
        initData.address.postcode.replace(' ', '').length === 0 ||
        initData.address.country.replace(' ', '').length === 0
    ) {
      const errorMessageInput = 'You must fill all information!';
      errorPop(errorMessageInput);
      // window.showError('发生错误：' + 'You must fill all information!')
      return false
    }
    if (!/^\d+$/.test(initData.address.postcode)) {
      const errorMessageInput = 'You must enter positive number in postcode!';
      errorPop(errorMessageInput);
      // window.showError('发生错误：' + 'You must enter positive number in postcode!')

      return false
    }
    return true
  }
  // check third page
  const checkThirdValidation = () => {
    if (initData.title.replace(' ', '').length === 0 ||
        initData.price.replace(' ', '').length === 0 ||
        initData.metadata.bathRoomNumber.replace(' ', '').length === 0 ||
        initData.metadata.bedsNumber.replace(' ', '').length === 0 ||
        initData.metadata.bedRoomNumber.replace(' ', '').length === 0
    ) {
      const errorMessageInput = 'You must fill all information!';
      errorPop(errorMessageInput);
      // window.showError('发生错误：' + 'You must fill all information!')

      return false
    }
    return true
  }
  // check four page
  const checkFourValidation = () => {
    if (initData.metadata.pool === false &&
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
      // window.showError('发生错误：' + 'You need to selet one!')
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

  return (
      <React.Fragment>
        {/* <Error></Error> */}
        <ErrorPopup></ErrorPopup>
        <Container component="main" maxWidth="sm"
                   sx={{ mb: 4, mt: 10 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Listing new
            </Typography>
            <CustomStepper activeStep={activeStep}
                           sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
              ))}
            </CustomStepper>
            {activeStep !== steps.length && (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                        <BackButton
                            onClick={handleBack}
                            sx={{ mt: 3, ml: 1 }}>
                          Back
                        </BackButton>
                    )}
                    {activeStep !== steps.length - 1 && (
                        <NextButton
                            // variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                        >Next</NextButton>)}
                    {activeStep === steps.length - 1 && (
                        <Button
                            sx= {{ mt: 3, ml: 1 }}
                            color='primary'
                            variant="contained"
                            onClick={GoBackToMyListing}
                        >
                          Go Back to My Listing
                        </Button>)}
                  </Box>
                </React.Fragment>
            )}
          </Paper>
        </Container>
      </React.Fragment>
  );
}
