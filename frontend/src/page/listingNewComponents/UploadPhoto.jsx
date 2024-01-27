// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemText from '@mui/material/ListItemText';
// import Grid from '@mui/material/Grid';
// import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
// import { makeStyles } from '@material-ui/core'
// import { initData } from '../../services/config'
// import { fileToDataUrl } from '../../services/sendImage';
// import fetchFunc from '../../services/fetchRequest'
// import errorPop from '../../components/errorPopup';
// import { useHistory } from 'react-router'
//
// const useStyles = makeStyles((theme) => ({
//   container: {
//     paddingTop: theme.spacing(10),
//     height: '100vh',
//   },
//   nextButton: {
//     marginLeft: 5,
//   },
//
//   choosedButton: {
//     borderRadius: 5,
//     // border: '2px black solid',
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: '#3f51b5',
//     border: '2px solid #3f51b5',
//   },
//   unChoosedButton: {
//     borderRadius: 5,
//     // border: '2px black solid',
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     border: '2px solid #b5b5b5',
//   },
//
// }))
//
// export default function SetAmenities () {
//   const styles = useStyles()
//   const history = useHistory()
//   const [Inputimage, setInputImage] = React.useState([])
//   const handleInputFile = (e) => {
//     setInputImage(e.target.files)
//   }
//   // Upload the image
//   const filesContent = (function () {
//     if (Inputimage.length !== 0) {
//       console.log('passed');
//       let UploadImage = ''
//       for (let i = 0; i < Inputimage.length; i++) {
//         UploadImage += ` ${Inputimage[i].name}`
//       }
//       return <Typography> Files are{UploadImage} </Typography>
//     }
//   })()
//   // check all information correct
//   const checkValidation = (info) => {
//     console.log(info)
//     if (info.thumbnail === '') {
//       const errorMessageInput = 'Please upload at least one image';
//       errorPop(errorMessageInput);
//       return false
//     }
//     return true
//   }
//   // make a submit
//   const MakeSubmition = () => {
//     const data = { ...initData }
//     let ExistThumbnail = ''
//     for (let i = 0; i < Inputimage.length; i++) {
//       fileToDataUrl(Inputimage[i]).then((res) => {
//         ExistThumbnail += `${res} `
//         if (i === Inputimage.length - 1) {
//           data.thumbnail = ExistThumbnail
//           console.log('+++', data);
//           if (checkValidation(data)) {
//             fetchFunc('/listings/new', 'POST', data)
//               .then((response) => {
//                 if (response.status !== 200) {
//                   // alert('not succeed');
//                   const errorMessageInput = 'invalid submit!';
//                   errorPop(errorMessageInput);
//                 }
//                 const errorMessageInput = 'create new list succeded!';
//                 errorPop(errorMessageInput);
//                 history.push('/MyListing')
//               })
//               .catch((err) => {
//                 console.log(err)
//                 const errorMessageInput = 'error exist';
//                 errorPop(errorMessageInput);
//               })
//           }
//         }
//       })
//     }
//   }
//
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Upload photos
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} align='center'>
//           <Typography>Thumbnail</Typography>
//           <Box>
//             <input
//               accept='image/jpeg,image/png,image/jpg'
//               className={styles.input}
//               id='upload-file'
//               multiple
//               type='file'
//               onChange={handleInputFile}
//             />
//             <Typography className={styles.uploadTitle}>
//               Upload a image (jpeg, png, jpg)
//             </Typography>
//             {Inputimage.length === 0 && (<Typography> No file </Typography>)}
//             {Inputimage.length !== 0 && filesContent }
//             <Button variant='contained'
//                     color='primary'
//                     component='span'
//                     onClick={MakeSubmition}>Submit</Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }
import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Button, Card, CircularProgress } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import { initData } from '../../services/config';
import fetchFunc from '../../services/fetchRequest';
import errorPop from '../../components/errorPopup';
import { fileToDataUrl } from '../../services/sendImage';

const UploadCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#DC0F62', // 自定义颜色
  color: 'white',
  '&:hover': {
    backgroundColor: '#BB0A50', // 鼠标悬停时颜色略暗
  },
}));

const Dropzone = styled(DropzoneArea)(({ theme }) => ({
  minHeight: '200px',
  maxHeight: '300px',
  marginTop: theme.spacing(2),
}));

export default function SetAmenities () {
  const [inputImages, setInputImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const history = useHistory();

  const handleImageChange = (files) => {
    setInputImages(files);
  };

  const checkValidation = (data) => {
    if (data.thumbnail === '') {
      errorPop('Please upload at least one image');
      return false;
    }
    return true;
  };

  const makeSubmission = () => {
    const data = { ...initData, thumbnail: '' };
    if (inputImages.length === 0) {
      checkValidation(data);
      return;
    }

    setUploading(true);
    Promise.all(inputImages.map(file => fileToDataUrl(file)))
      .then(urls => {
        data.thumbnail = urls.join(' ');
        if (checkValidation(data)) {
          return fetchFunc('/listings/new', 'POST', data);
        }
      })
      .then(response => {
        setUploading(false);
        if (response?.status !== 200) {
          errorPop('Invalid submit!');
          return;
        }
        errorPop('Create new list succeeded!');
        history.push('/MyListing');
      })
      .catch(err => {
        console.log(err);
        setUploading(false);
        errorPop('Error exists');
      });
  };

  return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Upload Photos
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={15} md={10}>
            <UploadCard>
              <Dropzone
                  onChange={handleImageChange}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
                  dropzoneText="Drag and drop an image here or click"
                  filesLimit={5}
              />
            </UploadCard>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <SubmitButton
                variant='contained'
                onClick={makeSubmission}
                disabled={uploading}
            >
              {uploading ? <CircularProgress size={24} /> : 'Submit'}
            </SubmitButton>
          </Grid>
        </Grid>
      </React.Fragment>
  );
}
