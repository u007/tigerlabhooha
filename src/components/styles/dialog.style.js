import { makeStyles } from '@material-ui/core/styles';

export const useDialogStyles = (width = 500, border = '1px solid #000', padding = null) => {
  return makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      left: '50%',
      marginLeft: '-' + (width / 2) + 'px',
      width: width,
      backgroundColor: theme.palette.background.paper,
      border: border,
      boxShadow: theme.shadows[5],
      padding: padding ? padding : theme.spacing(2, 4, 3),
    },
  }));
}
