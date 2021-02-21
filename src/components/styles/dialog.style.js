import { makeStyles } from '@material-ui/core/styles';

export const useDialogStyles = (height = 'auto', width = 500, border = '1px solid #000', padding = null, zIndex = 100) => {
  return makeStyles((theme) => ({
    paper: {
      zIndex: zIndex,
      position: 'absolute',
      height: height,
      // left: '50%',
      margin: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
      // marginLeft: '-' + (width / 2) + 'px',
      left: 0, right: 0,
      width: width,
      backgroundColor: theme.palette.background.paper,
      border: border,
      boxShadow: theme.shadows[5],
      padding: padding ? padding : theme.spacing(2, 4, 3),
    },
  }));
}
