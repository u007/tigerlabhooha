import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";

import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Signup(props) {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log("submit", data);
  };

  const titles = ['Mr', 'Mrs', 'Prof'];
  const titleOption = [
    <MenuItem value="" key={0}>Your title</MenuItem>
  ];
  for (var c in titles) {
    const title = titles[c];
    titleOption.push(<MenuItem value={title} key={c + 1}>{title}</MenuItem>)
  }
  return <div className="App">
    <h1>Signup</h1>
    <Container fixed>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
            <Select name="title" placeholder="Your title" defaultValue="" ref={register({ required: true })} >
              {titleOption}
            </Select>
            {errors.title && <span role="alert">{errors.title.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="firstName" className="full" label="First Name" inputRef={register({ pattern: /^[A-Za-z]+$/i, required: true, maxLength: 255 })} />
            {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="lastName" label="Last Name" className="full" inputRef={register({ pattern: /^[A-Za-z]+$/i, required: true, maxLength: 255 })} />
            {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="email" label="Email" className="full" inputRef={register({
              pattern: {
                value: /S+@S+.S+/,
                message: "Email format is invalid"
              }, required: true, maxLength: 255
            })} />
            {errors.email && <span role="alert">{errors.email.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="confirmEmail" label="Confirm Email" className="full" inputRef={register({ required: true, maxLength: 255 })} />
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiPickersUtilsProvider name="dob" utils={DateFnsUtils} inputRef={register({ required: true })}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date of birth"
                format="MM/dd/yyyy"
                className="full"
                // value={selectedDate}
                // onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            {errors.dob && <span role="alert">{errors.dob.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="phone" label="Phone Number" className="full" inputRef={register({ required: true, maxLength: 20 })} />
            {errors.phone && <span role="alert">{errors.phone.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="password" label="Password" type="password" className="full" inputRef={register({ required: true, maxLength: 255 })} />
            {errors.password && <span role="alert">{errors.password.message}</span>}
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" className="full">Submit</Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  </div>;
}

export default Signup;