
import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types'
import { makeStyles, ImageList, ImageListItem } from '@material-ui/core'
import HotelIcon from '@material-ui/icons/Hotel'
import BathtubIcon from '@material-ui/icons/Bathtub'
import PoolRoundedIcon from '@mui/icons-material/PoolRounded';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import LocalParkingSharpIcon from '@mui/icons-material/LocalParkingSharp';
import WifiSharpIcon from '@mui/icons-material/WifiSharp';
import LiveTvSharpIcon from '@mui/icons-material/LiveTvSharp';
import CountertopsSharpIcon from '@mui/icons-material/CountertopsSharp';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import OutdoorGrillRoundedIcon from '@mui/icons-material/OutdoorGrillRounded';
import { useHistory } from 'react-router'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icons: {
    paddingRight: theme.spacing(2),
  },
  gridContainer: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boldFont: {
    fontWeight: 'bold',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}))

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const getAllImage = (thumbnail) => {
  const allIMage = thumbnail.split(' ')
  allIMage.pop()
  return allIMage
}

// calculate bed number
const calculateBeds = (card) => {
  if (card.metadata.bedsNumber.length === 0) {
    return <span>0 bed</span>
  } else if (card.metadata.bedsNumber.length !== 0) {
    return <span>&nbsp;{card.metadata.bedsNumber} bed</span>
  }
}

const ChangeTimeToDate = (second) => {
  const date = new Date(second)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month;
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + date.getDate()
  }
  return `${day}/${month}/${year}`
}

const theme = createTheme();

export default function AvailableList (props) {
  const lists = props.lists
  // const setFetchData = props.setFetchData
  const styles = useStyles()
  const history = useHistory()

  // go to booking page
  const GoToBooking = (e) => {
    console.log('gotoedit');
    console.log(e.currentTarget.name);
    history.push(`/Booking/${e.currentTarget.name}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All publish lists
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {/* if no publish */}
          {lists.length === 0 && (
            <Grid container>
            <Grid item xs={12} align='center'>
                <Typography variant='h5'>Loading...</Typography>
                <Typography variant='body1'>
                (If loading time too long, maybe you do not have any hosted
                listing, go to create a new one)
                </Typography>
            </Grid>
            </Grid>
          )}
        {lists.length !== 0 && (
          <Grid container spacing={3}>
            {lists.map((card) => (
              <Grid item key={card.id} className={styles.item} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className={styles.root}>
                      <ImageList className={styles.imageList} cols={1}>
                        {getAllImage(card.thumbnail).map((imageBase64) => {
                          return (
                            <ImageListItem key={imageBase64}>
                              <img src={imageBase64} alt='Image of listings' />
                            </ImageListItem>
                          )
                        })}
                      </ImageList>
                  </div>
                  <CardContent sx={{ flexGrow: 1 }}>
                  <Grid container className={styles.gridContainer}>
                    {/* title */}
                      <Typography
                        gutterBottom
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Title:</span>
                        {` ${card.title}`}
                      </Typography>
                      {/* price */}
                      <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Price:</span>
                        {` $${card.price} per night`}
                      </Typography>
                      {/* property */}
                      <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                        gutterBottom
                      >
                        <span className={styles.boldFont}>
                          Property type:
                        </span>
                        {card.metadata.entirePlace && (' Entire place')}
                        {card.metadata.privateRoom && (' Private room')}
                        {card.metadata.shareRoom && (' Share room')}
                      </Typography>
                      {/* address */}
                    <Grid item xs={12}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>Street:</span>
                          {` ${card.address.street} `}
                          <span className={styles.boldFont}>City:</span>
                          {` ${card.address.city} `}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>State:</span>
                          {` ${card.address.state} `}
                          <span className={styles.boldFont}>Postcode:</span>
                          {` ${card.address.postcode} `}
                          <span className={styles.boldFont}>Country:</span>
                          {` ${card.address.country} `}
                        </Typography>
                      </Grid>
                      {/* address end */}
                  </Grid>
                  <Grid container className={styles.gridContainer}>
                    {/* bed number */}
                    <Grid item xs={6} align='center' className={styles.item}>
                      <HotelIcon />
                      {calculateBeds(card)}
                    </Grid>
                    {/* bathRoom number */}
                    <Grid item xs={6} align='center' className={styles.item}>
                      <BathtubIcon />&nbsp;
                      {`${card.metadata.bathRoomNumber} bathrooms`}
                    </Grid>
                    {/* Amenities types */}
                    <Grid item xs={15} align='center' className={styles.item}>
                    <span className={styles.boldFont}>Amenities:&nbsp;&nbsp;</span>
                      {card.metadata.poop === true && (<PoolRoundedIcon />)}
                      {card.metadata.BBQ === true && (<OutdoorGrillRoundedIcon />)}
                      {card.metadata.parking === true && (<LocalParkingSharpIcon />)}
                      {card.metadata.airCondition === true && (<AcUnitSharpIcon />)}
                      {card.metadata.wifi === true && (<WifiSharpIcon />)}
                      {card.metadata.TV === true && (<LiveTvSharpIcon />)}
                      {card.metadata.kitchen === true && (<CountertopsSharpIcon />)}
                      {card.metadata.pet === true && (<PetsRoundedIcon />)}
                    </Grid>
                  </Grid>
                  {/* Review */}
                  <Grid container className={styles.gridContainer}>
                    <Grid item>{`Total reviews: ${card.reviews.length}`}</Grid>
                  </Grid>
                  {/* Show publish */}
                  <Grid container className={styles.gridContainer}>
                    <Grid item xs={10}>
                      {!card.published && (
                        <Typography>Unpublish</Typography>
                      )}
                      {/* {card.published && showPublishedDate(card)} */}
                      {card.published && (<Grid item xs={12}>
                    <Typography>Available date:</Typography>
                    {card.availability.length === 0 && (<h4>Please selet date</h4>)}
                    {card.availability.length !== 0 && (
                    <React.Fragment>
                      {card.availability.map((ele) => {
                        return (
                      <Typography key={ele.start}>
                      <span >From</span>
                      {` ${ChangeTimeToDate(ele.start)} `}
                      <span >To</span>
                      {` ${ChangeTimeToDate(ele.end)}`}
                      </Typography>
                        )
                      })}
                    </React.Fragment>)}
                    </Grid>)}
                  </Grid>
                  </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid container spacing={1}>
                    <ButtonGroup variant="text" aria-label="text button group">
                      {/* Edit button */}
                      {card.availability.length !== 0 && (<Button
                      size="small"
                      // variant = 'contained'
                      name={card.id}
                      onClick={GoToBooking}
                      >
                      Booking
                      </Button>)}
                      <Button>View Comments</Button>
                    </ButtonGroup>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

AvailableList.propTypes = {
  lists: PropTypes.any,
  setFetchData: PropTypes.any,
}
