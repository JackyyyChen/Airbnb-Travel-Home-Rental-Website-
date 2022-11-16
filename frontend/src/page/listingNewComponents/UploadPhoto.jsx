import * as React from 'react';
import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { initData } from '../../services/config'
import { fileToDataUrl } from '../../services/sendImage';
import fetchFunc from '../../services/fetchRequest'
import errorPop from '../../components/errorPopup';
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100vh',
  },
  nextButton: {
    marginLeft: 5,
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

}))

export default function SetAmenities () {
  const styles = useStyles()
  const history = useHistory()
  const [Inputimage, setInputImage] = React.useState([])
  const handleInputFile = (e) => {
    setInputImage(e.target.files)
  }
  // Upload the image
  const filesContent = (function () {
    if (Inputimage.length !== 0) {
      console.log('passed');
      let UploadImage = ''
      for (let i = 0; i < Inputimage.length; i++) {
        UploadImage += ` ${Inputimage[i].name}`
      }
      return <Typography> Files are{UploadImage} </Typography>
    }
  })()
  // check all information correct
  const checkValidation = (info) => {
    console.log(info)
    if (info.thumbnail === '') {
      const errorMessageInput = 'Please upload at least one image';
      errorPop(errorMessageInput);
      return false
    }
    return true
  }
  // make a submit
  const MakeSubmition = () => {
    const data = { ...initData }
    let ExistThumbnail = ''
    for (let i = 0; i < Inputimage.length; i++) {
      fileToDataUrl(Inputimage[i]).then((res) => {
        ExistThumbnail += `${res} `
        if (i === Inputimage.length - 1) {
          data.thumbnail = ExistThumbnail
          console.log('+++', data);
          if (checkValidation(data)) {
            fetchFunc('/listings/new', 'POST', data)
              .then((response) => {
                if (response.status !== 200) {
                  // alert('not succeed');
                  const errorMessageInput = 'invalid submit!';
                  errorPop(errorMessageInput);
                }
                const errorMessageInput = 'create new list succeded!';
                errorPop(errorMessageInput);
                history.push('/MyListing')
              })
              .catch((err) => {
                console.log(err)
                const errorMessageInput = 'error exist';
                errorPop(errorMessageInput);
              })
          }
        }
      })
    }
  }

  return (
    <React.Fragment>
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
            {/* <label htmlFor='upload-file'>
              <Button
                variant='contained'
                color='primary'
                component='span'
              >
                Upload
              </Button>
            </label> */}
            {Inputimage.length === 0 && (<Typography> No file </Typography>)}
            {Inputimage.length !== 0 && filesContent }
            <Button variant='contained'
                    color='primary'
                    component='span'
                    onClick={MakeSubmition}>Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
