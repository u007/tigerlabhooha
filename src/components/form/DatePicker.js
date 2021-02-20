import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({
  name,
  label,
  control,
  defaultValue,
  children,
  setValue,
  getValues,
  watch,
  format,
  inputRef,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <Controller
          as={
            <MuiPickersUtilsProvider utils={DateFnsUtils} inputRef={inputRef}>
              <KeyboardDatePicker
                margin="normal"
                label={label}
                format={format}
                className="full"
                value={getValues(name)}
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
          }
          control={control}
          rules={{ required: true }}
          name={name}
          label={label}
          value={watch(name)}
          defaultValue={watch(name)}
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
export default DatePicker;
