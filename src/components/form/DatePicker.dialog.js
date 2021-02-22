import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
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
  value,
  setValue,
  watch,
  format,
  required,
  className,
}) => {
  const dateValue = value && value instanceof Date ? value : null;

  return (
    <FormControl className={className}>
      <Controller
        as={(
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
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
  value: null,
  format: 'YYYY-MM-dd',
  required: false,
  className: '',
};

DatePickerDialog.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  format: PropTypes.string,
  required: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

export default DatePickerDialog;
