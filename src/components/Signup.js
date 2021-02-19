import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Signup() {

  const titles = ['Mr', 'Mrs', 'Prof'];
  const titleOption = [];
  for (var c in titles) {
    const title = titles[c];
    titleOption.push(<MenuItem value={title} key={c}>{title}</MenuItem>)
  }
  return <div className="App">
    <h1>Signup</h1>
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Select >
            {titleOption}
          </Select>
          <TextField id="first-name" label="First Name" />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField id="last-name" label="Last Name" />
        </Grid>


        <Grid item xs={12} md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              // value={selectedDate}
              // onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>


      ● Email
      ● Confirm Email
      ● Date of Birth
      ● Phone Number
      ● Password
      ● “Submit” button

    </Grid>
    </Container>
  </div>;
}



export default Signup;