import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';

const DatePicker = ({
  name,
  format,
  inputRef,
  ...props
}) => {
  return (
    <TextField name={name} type="datetime-local" {...props} />
  );
};
export default DatePicker;
