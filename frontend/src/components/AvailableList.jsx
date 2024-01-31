import React, { useState, useEffect } from 'react';
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
// import { makeStyles, ImageList, ImageListItem, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
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
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageCarousel = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false); // 控制模态窗口的打开状态
  const [selectedImage, setSelectedImage] = useState(''); // 当前选中的图片 URL
  const multiImages = images.length > 1

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        {multiImages
          ? (
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((image, index) => (
                <div key={image} onClick={() => handleOpen(image)}>
                  <img src={image} alt={`image-${index}`} style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                </div>
            ))}
          </AutoPlaySwipeableViews>)
          : (
            <div onClick={() => handleOpen(images[0])}>
              <img src={images[0]} alt="image-0" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
            </div>
            )}
          {/* 放大查看的模态窗口 */}
          <Modal open={open} onClose={handleClose}>
            <div style={{ position: 'relative', outline: 'none' }}>
              <img src={selectedImage} alt="Zoomed" style={{ width: '100%', height: 'auto' }} />
              <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </Modal>
        {/* 可以添加指示器或控制按钮 */}
      </div>
  );
};
const theme = createTheme();

export default function AvailableList (props) {
  const lists = props.lists
  const bookInfo = props.bookInfo
  console.log('AvaList', bookInfo)
  const [openCommenteModal, setOpenCommentModal] = React.useState(false)
  const [modalStyle] = React.useState(getModalStyle)
  const [commentTitle, setCommentTitle] = React.useState('')
  // const setFetchData = props.setFetchData
  // const currentUser = JSON.parse(localStorage.getItem('user'))
  const styles = useStyles()
  const history = useHistory()
  console.log(commentTitle)
  // Open comment window
  const OpenCommentWindow = (e) => {
    // const targetID = { id: e.currentTarget.name }
    setCommentTitle(e.currentTarget.name)
    setOpenCommentModal(true)
  }
  // Close delete window
  const CloseCommentWindow = (e) => {
    setOpenCommentModal(false)
  }
  // go to booking page
  const GoToBooking = (e) => {
    console.log('gotoedit');
    console.log(e.currentTarget.name);
    history.push(`/Booking/${e.currentTarget.name}`)
  }
  // const [comment, setComment] = React.useState('')
  console.log(lists)
  const temp = []
  for (let i = 0; i < lists.length; i++) {
    let comment = { title: '', reviews: '' }
    comment = { title: lists[i].title, reviews: lists[i].reviews }
    temp.push(comment)
  }
  console.log(temp)

  // Loading text, after 5s change
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  useEffect(() => {
    // 如果列表为空，则开始计时器
    if (lists.length === 0) {
      const timer = setTimeout(() => {
        setLoadingMessage('No items');
      }, 2000); // 5000 毫秒后更新文本
      // console.log('loading', loadingMessage)
      return () => clearTimeout(timer); // 组件卸载时清除计时器
    }
  }, [lists]);

  // for (let i = 0; i < temp.length; i++) {
  //   if (temp[i].title === commentTitle) {
  //     console.log('yes')
  //   }
  // }

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
            {/* {lists.length === 0 && (
            <Grid container>
            <Grid item xs={12} align='center'>
                <Typography variant='h5'>Loading...</Typography>
                <Typography variant='body1'>
                (If loading time too long, maybe you do not have any hosted
                listing, go to create a new one)
                </Typography>
            </Grid>
            </Grid>
          )} */}
            {lists.length === 0 && (
                <Grid container>
                  <Grid item xs={12} align='center'>
                    <Typography variant='h5'>{loadingMessage}</Typography>
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
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              boxShadow: 3,
                              borderRadius: 2,
                              '&:hover': {
                                boxShadow: 5,
                                transform: 'scale(1.02)',
                                // transition: 'transform .2s ease-in-out',
                              }
                            }}
                        >
                          <div className={styles.root}>
                            {/* <ImageList className={styles.imageList} cols={1}> */}
                            {/*  {getAllImage(card.thumbnail).map((imageBase64) => { */}
                            {/*    return ( */}
                            {/*        <ImageListItem key={imageBase64}> */}
                            {/*          < img src={imageBase64} alt='Image of listings' /> */}
                            {/*        </ImageListItem> */}
                            {/*    ) */}
                            {/*  })} */}
                            {/* </ImageList> */}
                            <div className={styles.root}>
                              <ImageCarousel images={getAllImage(card.thumbnail)} />
                            </div>
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
                                {/* see comment */}
                                <Button
                                    size="small"
                                    name={card.title}
                                    onClick={OpenCommentWindow}
                                >
                                  View Comments
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
        {/* comment modal */}
        <Modal
            open={openCommenteModal}
            onClose={CloseCommentWindow}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
        >
          <div style={modalStyle} className={styles.paper}>
            {/* <h3>Do you want to delete this list?</h3> */}
            {/* price */}
            {temp.map((card) => (
                <Grid item key={card.title} xs={12} sm={6} md={4}>
                  {card.title === commentTitle && card.reviews.length !== 0 && (
                      <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                      >
                        <span className={styles.boldFont}>Comment:</span>
                        {` ${card.reviews}`}
                      </Typography>
                  )}
                  {card.title === commentTitle && card.reviews.length === 0 && (
                      <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                      >
                        <span className={styles.boldFont}>This list has no comment</span>
                      </Typography>
                  )}
                </Grid>
            ))}
            <Button
                size='large'
                color='secondary'
                onClick={CloseCommentWindow}
            >
              Return
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

AvailableList.propTypes = {
  lists: PropTypes.any,
  setFetchData: PropTypes.any,
  bookInfo: PropTypes.any,
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
