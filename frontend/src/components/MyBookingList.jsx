import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types'
import { makeStyles, Modal } from '@material-ui/core';
import fetchFunc from '../services/fetchRequest'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import TextField from '@mui/material/TextField';

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

const theme = createTheme();

export default function MyBooking (props) {
  const lists = props.lists
  const setFetchData = props.setFetchData
  const styles = useStyles()
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openCommentModal, setOpenCommentModal] = React.useState(false)
  const [modalStyle] = React.useState(getModalStyle)
  const [bookingID, setBookingID] = React.useState('')
  const [listingID, setlistingID] = React.useState('')
  const [comment, setComment] = React.useState('')
  console.log(lists)

  // Open delete window
  const OpenDeleteWindow = (e) => {
    setBookingID(e.currentTarget.name)
    setOpenDeleteModal(true)
  }
  // Close delete window
  const CloseDeleteWindow = (e) => {
    setOpenDeleteModal(false)
  }
  // submit delete
  const submitDelete = () => {
    console.log(bookingID)
    fetchFunc(`/bookings/${bookingID}`, 'DELETE').then((response) => {
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
  // make a comment
  // Open comment window
  const OpenCommentModal = (e) => {
    setBookingID(e.currentTarget.name)
    setlistingID(e.currentTarget.value)
    setOpenCommentModal(true)
  }
  // Close comment window
  const CloseCommentModal = (e) => {
    setOpenCommentModal(false)
  }
  const makeComment = (e) => {
    let comment = ''
    if (e.target.name === 'comment') {
      comment = { review: e.target.value }
    }
    setComment(comment)
  }

  const submitComment = () => {
    if (comment === '') {
      alert('Please write something')
      return false
    }
    fetchFunc(`/listings/${listingID}/review/${bookingID}`, 'PUT', comment).then((response) => {
      if (response.status !== 200) {
      //   const errorMessageInput = 'You comment have not sent';
      //   errorPop(errorMessageInput);
        alert('You comment have not sent')
      }
      setFetchData((preState) => !preState)
      // const errorMessageInput = 'You have leave a comment succeded!';
      // errorPop(errorMessageInput);
      alert('You have leave a comment succeded!')
      setOpenCommentModal(false)
    })
    console.log(comment, bookingID, listingID)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorPopup></ErrorPopup>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
            >
              My Booking
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {lists.length === 0 && (
            <Grid container>
            <Grid item xs={12} align='center'>
                <Typography variant='h5'>Loading...</Typography>
                <Typography variant='body1'>
                (If loading time too long, maybe you do not have a booking)
                </Typography>
            </Grid>
            </Grid>
          )}
          {lists.length !== 0 && (
          <Grid container spacing={3}>
            {lists.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* bookingID */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>BookingID:</span>
                        {` ${card.id}`}
                    </Typography>
                    {/* booking owner */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Booking user:</span>
                        {` ${card.owner}`}
                    </Typography>
                    {/* booking date */}
                    <Typography><span className={styles.boldFont}>Available date:</span></Typography>
                    <React.Fragment>
                      <Typography>
                      <span >From</span>
                      {` ${ChangeTimeToDate(card.dateRange.start)} `}
                      <span >To</span>
                      {` ${ChangeTimeToDate(card.dateRange.end)}`}
                      </Typography>
                    </React.Fragment>
                    {/* price */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Total Price:</span>
                        {` $${card.totalPrice}`}
                      </Typography>
                    {/* booking status */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Booking status:</span>
                        {` ${card.status}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                {/* comment this booking */}
                  {card.status === 'accepted' && (<Button
                    size="small"
                    color="primary"
                    name={card.id}
                    value={card.listingId}
                    onClick={OpenCommentModal}>
                    Comment
                    </Button>)}
                    {card.status === 'pending' && (<Button
                    size="small"
                    color="primary"
                    disabled
                    >
                    Comment
                    </Button>)}
                {/* delete this booking */}
                    <Button
                    size="small"
                    color="secondary"
                    name={card.id}
                    onClick={OpenDeleteWindow}>
                    Delete This Booking
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)}
          </Grid>
        </Container>
      </main>
      {/* comment modal */}
      <Modal
        open={openCommentModal}
        onClose={CloseCommentModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to leave a comment</h3>
          {/* write comment */}
          <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              name="comment"
              label="Leave your comment"
              sx={{ mb: 1 }}
              autoFocus
              onChange={makeComment}
              // value='jacky@unsw'
            />
        {/* button group */}
            <Button
            onClick={submitComment}
            >
            Sent
            </Button>
          <Button
            size='large'
            color='secondary'
            onClick={CloseCommentModal}
          >
            No
          </Button>
        </div>
      </Modal>
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
    </ThemeProvider>
  );
}

MyBooking.propTypes = {
  lists: PropTypes.any,
  setFetchData: PropTypes.any,
}
