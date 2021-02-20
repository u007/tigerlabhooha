
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { useRef, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ReactHookFormSelect from '../components/form/ReactHookFormSelect';
import PhoneInput from '../components/form/Phone';
import DatePicker from '../components/form/DatePicker';

import MuiPhoneNumber from 'material-ui-phone-number';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiURL } from '../config';
import ReactDirective from 'react-directive';
import { FETCH_FAIL } from '../constant';
import Alert from '@material-ui/lab/Alert';


function Signup(props) {
  const { register, errors, handleSubmit, control, getValues, setValue, watch } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { dob: null }
  });
  const [signedUp, setSignedUp] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = data => {
    console.log("submit", data);
    setLoading(true);

    try {
      const postApi = request => from(axios({
        url: apiURL + 'users',
        method: 'POST',
        data
      })).pipe(map(res => res.data)).catch(error => {
        setSubmitError(error);
        return Observable.ofType(FETCH_FAIL)
      });
      postApi.subscribe((x) => {
        console.log("subs!", x);
      })
      setSignedUp(true);

    } catch (err) {
      setSubmitError(err);
    } finally {
      setLoading(false)
    }
  };

  // console.log("errors.password", errors.password);
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
      {signedUp && <div >
        <h2>Thank you</h2>
        We have submitted your application!
      </div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {submitError && <Alert severity="error">{submitError.message}</Alert>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>

            <ReactHookFormSelect
              className="half"
              name="title"
              label="Your title"
              control={control}
              error={!!errors.title}
              margin="normal"
              defaultValue=""
            >
              {titleOption}
            </ReactHookFormSelect>
            {errors.title && <span role="alert">{errors.title.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="firstName" className="full" label="First Name" required={true} inputRef={register({ pattern: /^[A-Za-z]+$/i, required: true, maxLength: 255 })} />
            {errors.firstName && errors.firstName.type === 'required' && <span role="alert">Required</span>}
            {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="lastName" required={true} label="Last Name" className="full" inputRef={register({ pattern: /^[A-Za-z]+$/i, required: true, maxLength: 255 })} />
            {errors.lastName && errors.lastName.type === 'required' && <span role="alert">Required</span>}
            {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="email" label="Email" required={true} className="full" inputRef={register({
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "invalid format"
              }, required: true, maxLength: 255
            })} />
            {errors.email && errors.email.type === 'required' && <span role="alert">Required</span>}
            {errors.email && <span role="alert">{errors.email.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="confirmEmail" required={true} label="Confirm Email" className="full" inputRef={register({
              validate: async (val) => {
                const email = getValues('email');
                console.log("validate", val, email, email === val);
                return email === val;
              }, required: true, maxLength: 255
            })} />
            {errors.confirmEmail && errors.confirmEmail.type === 'required' && <span role="alert">Required</span>}
            {errors.confirmEmail && errors.confirmEmail.type === 'validate' && <span role="alert">Mismatch with email</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker className="full" control={control} format="dd/MM/yyyy" watch={watch} setValue={setValue} getValues={getValues} defaultValue="" name="dob" inputRef={register({ required: true, valueAsDate: true, })} />

            {errors.dob && <span role="alert">{errors.dob.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            {/* <MuiPhoneNumber name="mobile" defaultCountry={'my'} inputRef={register({ required: true, maxLength: 20 })}/> */}
            <PhoneInput name="phone" label="Phone Number" className="full" inputRef={register({
              pattern: {
                value: /^[0-9]{3,}-[0-9]{5,}-[0-9]{3,}$/,
                message: "invalid format"
              }, maxLength: 20
            })} />
            {errors.phone && <span role="alert">{errors.phone.message}</span>}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField name="password" label="Password" type="password" className="full" inputRef={register({
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "invalid format"
              }, required: true, minLength: 8, maxLength: 20
            })} />
            {errors.password && errors.password.type === 'required' && <span role="alert">Required</span>}
            {errors.password && errors.password.type === 'minLength' && <span role="alert">Password too short, min 8 charactors</span>}
            {errors.password && errors.password.type === 'maxLength' && <span role="alert">Password too long</span>}
            {errors.password && errors.password.type === 'pattern' && <span role="alert">Password must be alphanumeric only</span>}
          </Grid>

          <Grid item xs={12}>
            <Button disabled={loading} variant="contained" color="primary" className="full" onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  </div >;
}

export default Signup;