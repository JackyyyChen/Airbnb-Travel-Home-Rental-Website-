import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core'
import { initData } from '../../services/config'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PoolRoundedIcon from '@mui/icons-material/PoolRounded';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import LocalParkingSharpIcon from '@mui/icons-material/LocalParkingSharp';
import WifiSharpIcon from '@mui/icons-material/WifiSharp';
import LiveTvSharpIcon from '@mui/icons-material/LiveTvSharp';
import CountertopsSharpIcon from '@mui/icons-material/CountertopsSharp';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import OutdoorGrillRoundedIcon from '@mui/icons-material/OutdoorGrillRounded';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Grid from '@mui/material/Grid';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100vh',
  },
  choosedButton: {
    borderRadius: 5,
    // border: '2px black solid',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#3f51b5',
    border: '2px solid #3f51b5',
  },
  unChoosedButton: {
    borderRadius: 5,
    // border: '2px black solid',
    padding: theme.spacing(2),
    textAlign: 'center',
    border: '2px solid #b5b5b5',
  },
  amenitiesIcon: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },

}))

export default function SetAmenities () {
  const styles = useStyles()
  const [dataState, setdataState] = React.useState(initData)
  const handleAmenities = (e) => {
    const newData = { ...dataState }
    if (e.currentTarget.name === 'pool') {
      newData.metadata.pool = !newData.metadata.pool
    } else if (e.currentTarget.name === 'airCondition') {
      newData.metadata.airCondition = !newData.metadata.airCondition
    } else if (e.currentTarget.name === 'wifi') {
      newData.metadata.wifi = !newData.metadata.wifi
    } else if (e.currentTarget.name === 'TV') {
      newData.metadata.TV = !newData.metadata.TV
    } else if (e.currentTarget.name === 'parking') {
      newData.metadata.parking = !newData.metadata.parking
    } else if (e.currentTarget.name === 'kitchen') {
      newData.metadata.kitchen = !newData.metadata.kitchen
    } else if (e.currentTarget.name === 'BBQ') {
      newData.metadata.BBQ = !newData.metadata.BBQ
    } else if (e.currentTarget.name === 'pet') {
      newData.metadata.pet = !newData.metadata.pet
    }
    setdataState(newData)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose amentities
      </Typography>
      <Grid container spacing={2}>
        {/* swimmimg pool */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>Pool</Typography>
          <Button
            variant='outlined'
            name='pool'
            id='pool'
            className={
              dataState.metadata.pool
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <PoolRoundedIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* Air con */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>Air condition</Typography>
          <Button
            variant='outlined'
            name='airCondition'
            id='airCondition'
            className={
              dataState.metadata.airCondition
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <AcUnitSharpIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* WIFI */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>WIFI</Typography>
          <Button
            variant='outlined'
            name='wifi'
            id='wifi'
            className={
              dataState.metadata.wifi
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <WifiSharpIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* TV */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>TV</Typography>
          <Button
            variant='outlined'
            name='TV'
            id='TV'
            className={
              dataState.metadata.TV
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <LiveTvSharpIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* BBQ */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>BBQ</Typography>
          <Button
            variant='outlined'
            name='BBQ'
            id='BBQ'
            className={
              dataState.metadata.BBQ
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <OutdoorGrillRoundedIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* Kitch */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>Kitchen</Typography>
          <Button
            variant='outlined'
            name='kitchen'
            id='kitchen'
            className={
              dataState.metadata.kitchen
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <CountertopsSharpIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* parking */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>Parking</Typography>
          <Button
            variant='outlined'
            name='parking'
            id='parking'
            className={
              dataState.metadata.parking
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <LocalParkingSharpIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
        {/* Pet */}
        <Grid item xs={6} sm={3} align='center'>
          <Typography>Pet</Typography>
          <Button
            variant='outlined'
            name='pet'
            id='pet'
            className={
              dataState.metadata.pet
                ? styles.choosedButton
                : styles.unChoosedButton
            }
            onClick={handleAmenities}
          >
            <PetsRoundedIcon fontSize='large' className={styles.amenitiesIcon} />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
