import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

const Dialog = ({allowClose, onClose, isOpen, title, description, children}) => {
  // const [isOpen, setIsOpen] = useState(false);

  const handleClose = async(e) => {
    // setIsOpen(false);
    if(onClose) {
      await onClose(e);
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={title}
      aria-describedby={description}
    >
      {allowClose && onClose && <IconButton onClick={handleClose}><ClearIcon /></IconButton>}
      {children}
    </Modal>
  )
}

Dialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  allowClose: PropTypes.bool,
  onClose: PropTypes.func,
};

Dialog.defaultProps = {
  title: '',
  description: '',
  allowClose: true
};


export default Dialog;