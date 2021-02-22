import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';

const Dialog = ({
  allowClose, onClose, isOpen, title, description, children,
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  const handleClose = async (e) => {
    // setIsOpen(false);
    if (onClose) {
      await onClose(e);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={title}
      aria-describedby={description}
    >
      <>
        {allowClose && onClose && <IconButton onClick={handleClose}><ClearIcon /></IconButton>}
        {children}
      </>
    </Modal>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  allowClose: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element,
};

Dialog.defaultProps = {
  title: '',
  description: '',
  allowClose: false,
  onClose: null,
  children: null,
};

export default Dialog;
