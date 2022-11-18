import * as React from 'react';
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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types'
import {
  // Card,
  ImageList,
  ImageListItem,
  // CardContent,
  // Grid,
  // Typography,
  // CardActions,
  // Button,
  Modal,
  makeStyles,
} from '@material-ui/core'
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
import fetchFunc from '../services/fetchRequest'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
// trying
// import { MuiPickersUtilsProvider } from '@material-ui/pickers'
// import DateFnsUtils from '@date-io/date-fns'
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import TextField from '@mui/material/TextField';

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        AirBrB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function getModalStyle () {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
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

const calculateBeds = (card) => {
  if (card.metadata.bedsNumber.length === 0) {
    return <span>0 bed</span>
  } else if (card.metadata.bedsNumber.length !== 0) {
    return <span>&nbsp;{card.metadata.bedsNumber} bed</span>
  }
}

const theme = createTheme();

export default function HostedLists (props) {
  // console.log(props)
  const lists = props.lists
  // console.log('111', lists)
  // for (let i = 0; i < lists.length; i++) {
  //   console.log('why', lists[i])
  // }
  const setFetchData = props.setFetchData
  const styles = useStyles()
  const history = useHistory()
  const [modalStyle] = React.useState(getModalStyle)
  const [currentListId, setCurrentListId] = React.useState('')
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openUnpublishModal, setOpenUnpublishModal] = React.useState(false)
  // const [openPublishModal, setOpenPublishModal] = React.useState(false)
  // const [startTime, setStartTime] = React.useState(null)
  // const [endTime, setEndTime] = React.useState(null)
  // const [timeRanges, setTimeRanges] = React.useState([])
  console.log(currentListId)

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

  // go to edit page
  const GoToEdit = (e) => {
    console.log('gotoedit');
    console.log(e.currentTarget.name);
    history.push(`/edit/${e.currentTarget.name}`)
  }
  // Open delete window
  const OpenDeleteWindow = (e) => {
    setCurrentListId(e.currentTarget.name)
    setOpenDeleteModal(true)
  }
  // Close delete window
  const CloseDeleteWindow = (e) => {
    setOpenDeleteModal(false)
  }
  const submitDelete = () => {
    fetchFunc(`/listings/${currentListId}`, 'DELETE').then((response) => {
      if (response.status !== 200) {
        const errorMessageInput = 'Delete fault';
        errorPop(errorMessageInput);
      }
      setFetchData((preState) => !preState)
      const errorMessageInput = 'Delete succeeded';
      errorPop(errorMessageInput);
      setOpenDeleteModal(false)
    })
  }
  // Publish your list
  const GoToPublish = (e) => {
    console.log('gotopublish');
    console.log(e.currentTarget.name);
    history.push(`/publishLish/${e.currentTarget.name}`)
  }
  // Publish your list
  // const OpenPublishWindow = (e) => {
  //   setCurrentListId(e.currentTarget.name)
  //   setOpenPublishModal(true)
  // }
  // Close publish window
  // const ClosePublishWindow = (e) => {
  //   setOpenPublishModal(false)
  // }
  // Unpublish your list
  // Open Unpublish window
  const OpenUnpublishWindow = (e) => {
    setCurrentListId(e.currentTarget.name)
    setOpenUnpublishModal(true)
  }
  // Close Unpublish window
  const CloseUnpublishWindow = (e) => {
    setOpenUnpublishModal(false)
  }
  const submitUnpublish = () => {
    fetchFunc(`/listings/unpublish/${currentListId}`, 'PUT').then((response) => {
      if (response.status !== 200) {
        const errorMessageInput = 'Unpublish fault';
        errorPop(errorMessageInput);
      }
      setFetchData((preState) => !preState)
      const errorMessageInput = 'Unpublish succeeded';
      errorPop(errorMessageInput);
      setOpenUnpublishModal(false)
    })
  }
  // Go to check booking requests
  const handleJumpToBookRequest = (e) => {
    history.push(`/CheckBooking/${e.currentTarget.name}`)
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
              All my lists
            </Typography>
          </Container>
          <ErrorPopup></ErrorPopup>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
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
                      <Button
                      size="small"
                      // variant = 'contained'
                      onClick={GoToEdit}
                      name={card.id}
                      >
                      Edit
                      </Button>
                      {/* Delete button */}
                      <Button
                      size="small"
                      color='secondary'
                      onClick={OpenDeleteWindow}
                      name={card.id}
                      >
                      Delete
                      </Button>
                      {/* Publish button */}
                      {!card.published && (<Button
                      size="small"
                      name={card.id}
                      // onClick={OpenPublishWindow}
                      onClick={GoToPublish}
                      // variant = 'contained'
                      >
                      Publish
                      </Button>)}
                      {/* Unpublish button */}
                      {card.published && (<Button
                      size="small"
                      // variant = 'contained'
                      name={card.id}
                      onClick={OpenUnpublishWindow}
                      >
                      Unpublish
                      </Button>)}
                      {/* Booking button */}
                      <Button
                      size="small"
                      // variant = 'contained'
                      name={card.id}
                      onClick={handleJumpToBookRequest}
                      >
                      Check Booking
                      </Button>
                    </ButtonGroup>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)}
        </Container>
      </main>
      {/* delete modal */}
      <Modal
        open={openDeleteModal}
        onClose={CloseDeleteWindow}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to delete this list?</h3>
          <Button size='large' color='primary' onClick={submitDelete}>
            Yes
          </Button>
          <Button
            size='large'
            color='secondary'
            onClick={CloseDeleteWindow}
          >
            No
          </Button>
        </div>
      </Modal>
      {/* Unpublish modal */}
      <Modal
        open={openUnpublishModal}
        onClose={CloseUnpublishWindow}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to UNPUBLISH this list?</h3>
          <Button size='large' color='primary' onClick={submitUnpublish}>
            Yes
          </Button>
          <Button
            size='large'
            color='secondary'
            onClick={CloseUnpublishWindow}
          >
            No
          </Button>
        </div>
      </Modal>
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
          Have a good travel!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

HostedLists.propTypes = {
  lists: PropTypes.any,
  setFetchData: PropTypes.any,
}
