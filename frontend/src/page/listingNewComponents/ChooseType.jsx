import * as React from 'react';
import Box from '@material-ui/core/Box'
import { initData } from '../../services/config'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import ErrorPopup from '../../components/errorPopupWindow';
import errorPop from '../../components/errorPopup';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100vh',
  },

  listTitle: { width: 'auto' },
  choosedButton: {
    borderRadius: 5,
    // border: '2px black solid',
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: '#3f51b5',
    border: '2px solid #3f51b5',
  },
  unChoosedButton: {
    borderRadius: 5,
    // border: '2px black solid',
    padding: theme.spacing(2),
    textAlign: 'center',
    border: '2px solid #b5b5b5',
  },

}))

export default function AddressForm () {
  const styles = useStyles()
  const [dataState, setdataState] = React.useState(initData)
  const handlePropertyType = (e) => {
    const newData = { ...dataState }
    if (e.currentTarget.name === 'entirePlace') {
      if (newData.metadata.privateRoom || newData.metadata.shareRoom) {
        const errorMessageInput = 'You can only choose one type';
        errorPop(errorMessageInput);
      }
      newData.metadata.entirePlace = !newData.metadata.entirePlace
    } else if (e.currentTarget.name === 'privateRoom') {
      if (newData.metadata.entirePlace || newData.metadata.shareRoom) {
        const errorMessageInput = 'You can only choose one type';
        errorPop(errorMessageInput);
      }
      newData.metadata.privateRoom = !newData.metadata.privateRoom
    } else if (e.currentTarget.name === 'shareRoom') {
      if (newData.metadata.entirePlace || newData.metadata.privateRoom) {
        const errorMessageInput = 'You can only choose one type';
        errorPop(errorMessageInput);
      }
      newData.metadata.shareRoom = !newData.metadata.shareRoom
    }
    setdataState(newData)
  }

  return (
    <React.Fragment>
    <ErrorPopup></ErrorPopup>
    <Typography variant="h6" gutterBottom>
        Choose Type (choose one only)
    </Typography>
    <Box name='firstForm' textAlign='center'>
    <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='entirePlace'
                id='entirePlace'
                className={
                  dataState.metadata.entirePlace
                    ? styles.choosedButton
                    : styles.unChoosedButton
                }
                onClick={handlePropertyType}
              >
                <Typography>An entire place</Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='privateRoom'
                className={
                  dataState.metadata.privateRoom
                    ? styles.choosedButton
                    : styles.unChoosedButton
                }
                onClick={handlePropertyType}
              >
                <Typography>A private room</Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='shareRoom'
                className={
                  dataState.metadata.shareRoom
                    ? styles.choosedButton
                    : styles.unChoosedButton
                }
                onClick={handlePropertyType}
              >
                <Typography>A shared room</Typography>
              </Button>
            </Grid>
          </Grid>
    </Box>
    </React.Fragment>
  );
}
