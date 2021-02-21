import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const Dialog = ({onClose, isOpen, title, description, children}) => {
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
      {children}
    </Modal>
  )
}

Dialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool.isRequired
};

Dialog.defaultProps = {
  title: '',
  description: '',
};


export default Dialog;