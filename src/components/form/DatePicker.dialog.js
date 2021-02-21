import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
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

  const dateValue = value && value instanceof Date ? value: null;

  return (
    <FormControl {...props}>
      <Controller
          as={
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
                // InputProps={{
                //   endAdornment: (
                //     <IconButton onClick={(e) => setValue(name, null)}>
                //       <ClearIcon />
                //     </IconButton>
                //   )
                // }}
              />
            </MuiPickersUtilsProvider>
          }
          control={control}
          rules={{ required: required }}
          name={name}
          label={label}
          value={watch(name)}
          defaultValue={defaultValue}
          onChange={date => {
              setValue(name, date);
              // handleBlur(getValues().id, 'receivedDate'); //Managing patch save at server
              return {value: date} //important to update the controller value after change else state is updated and the controller will not render
          }}
          format={format} //This will cause the value of received date to have an ISO date and a formatted date in an array, so it's recommended you use watch(name)[0] to extract the ISO date and [1] for the formatted date.
          autoOk
          margin="normal"
      />
    </FormControl>
  );
};

DatePickerDialog.defaultProps = {
  required: false
};

export default DatePickerDialog;
