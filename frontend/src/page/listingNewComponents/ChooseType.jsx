import * as React from 'react';
import Box from '@material-ui/core/Box'
import { initData } from '../../services/config'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import ErrorPopup from '../../components/errorPopupWindow';
import errorPop from '../../components/errorPopup';
// import errorWindow from '../../components/errorWindow';
const useStyles = makeStyles(() => ({
  container: {
    // paddingTop: theme.spacing(10),
    height: '100vh',
  },
  listTitle: { width: 'auto' },
  choosedButton: {
    borderRadius: 10,
    textAlign: 'center',
    border: '3px solid #DC0F62',
  },
  unChoosedButton: {
    borderRadius: 10,
    textAlign: 'center',
    border: '2px solid #b5b5b5',
  },
}))

export default function AddressForm () {
  const styles = useStyles()
  const [dataState, setdataState] = React.useState(initData)

  // 使用 useEffect 设置初始状态
  React.useEffect(() => {
    setdataState(initData);
  }, []);// 空依赖数组表示这个 effect 只在组件挂载时运行
  // const handlePropertyType = (e) => {
  //   const newData = { ...dataState }
  //   if (e.currentTarget.name === 'entirePlace') {
  //     if (newData.metadata.privateRoom || newData.metadata.shareRoom) {
  //       const errorMessageInput = 'You can only choose one type';
  //       errorPop(errorMessageInput);
  //     }
  //     newData.metadata.entirePlace = !newData.metadata.entirePlace
  //   } else if (e.currentTarget.name === 'privateRoom') {
  //     if (newData.metadata.entirePlace || newData.metadata.shareRoom) {
  //       const errorMessageInput = 'You can only choose one type';
  //       errorPop(errorMessageInput);
  //     }
  //     newData.metadata.privateRoom = !newData.metadata.privateRoom
  //   } else if (e.currentTarget.name === 'shareRoom') {
  //     if (newData.metadata.entirePlace || newData.metadata.privateRoom) {
  //       const errorMessageInput = 'You can only choose one type';
  //       errorPop(errorMessageInput);
  //     }
  //     newData.metadata.shareRoom = !newData.metadata.shareRoom
  //   }
  //   setdataState(newData)
  // }
  const handlePropertyType = (e) => {
    const selectedType = e.currentTarget.name;
    const newData = { ...dataState };

    // 如果已经选择了当前类型，直接切换它的状态
    if (newData.metadata[selectedType]) {
      newData.metadata[selectedType] = !newData.metadata[selectedType];
    } else {
      // 检查是否已选择其他类型
      const alreadySelected = Object.values(newData.metadata).some(value => value);

      if (alreadySelected) {
        const errorMessageInput = 'You can only choose one type';
        errorPop(errorMessageInput);
      } else {
      // 选择当前类型
        newData.metadata[selectedType] = true;
      }
    }

    setdataState(newData);
  };
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
