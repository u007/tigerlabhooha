import { makeStyles } from '@material-ui/core/styles';

const useDialogStyles = (height = 'auto', width = 500, border = '1px solid #000', padding = null, zIndex = 100) => makeStyles((theme) => ({
  paper: {
    zIndex,
    position: 'absolute',
    height,
    // left: '50%',
    margin: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    // marginLeft: '-' + (width / 2) + 'px',
    left: 0,
    right: 0,
    width,
    backgroundColor: theme.palette.background.paper,
    border,
    boxShadow: theme.shadows[5],
    padding: padding || theme.spacing(2, 4, 3),
  },
}));

export default useDialogStyles;
