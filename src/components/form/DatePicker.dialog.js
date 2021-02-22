import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { Controller, Control } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePickerDialog = ({
  name,
  label,
  control,
  defaultValue,
  children,
  value,
  setValue,
  getValues,
  watch,
  format,
  inputRef,
  required,
  ...props
}) => {
  const dateValue = value && value instanceof Date ? value : null;

  return (
    <FormControl {...props}>
      <Controller
        as={(
          <MuiPickersUtilsProvider utils={DateFnsUtils} inputRef={inputRef}>
            <KeyboardDatePicker
              autoOk
              margin="normal"
              label={label}
              format={format}
              className="full"
              value={dateValue}
                // onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              onChange={(e) => {
                console.log('picked', name, e);
                setValue(name, e);
              }}
            />
          </MuiPickersUtilsProvider>
          )}
        control={control}
        rules={{ required }}
        name={name}
        label={label}
        value={watch(name)}
        defaultValue={defaultValue}
        onChange={(date) => {
          setValue(name, date);
          // handleBlur(getValues().id, 'receivedDate'); //Managing patch save at server
          return { value: date }; // important to update the controller value after change else state is updated and the controller will not render
        }}
        format={format} // This will cause the value of received date to have an ISO date and a formatted date in an array, so it's recommended you use watch(name)[0] to extract the ISO date and [1] for the formatted date.
        autoOk
        margin="normal"
      />
    </FormControl>
  );
};

DatePickerDialog.defaultProps = {
  name: '',
  label: '',
  defaultValue: null,
  children: null,
  value: null,
  format: 'YYYY-MM-dd',
  inputRef: null,
  required: false,
};

DatePickerDialog.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  children: PropTypes.element,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  format: PropTypes.func,
  inputRef: PropTypes.func,
  required: PropTypes.bool,
  control: PropTypes.instanceOf(Control).isRequired,
};

export default DatePickerDialog;
