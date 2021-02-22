import React from 'react';
import TextField from '@material-ui/core/TextField';

const DatePicker = ({
  name,
  ...props
}) => (
  <TextField name={name} type="datetime-local" {...props} />
);

DatePicker.propTypes = {
  name: React.String.isRequired,
};

export default DatePicker;
