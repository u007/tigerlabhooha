import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { CircularProgress } from '@material-ui/core';
import { apiURL } from '../config';
import Dialog from '../components/dialog';
import DatePicker from '../components/form/DatePicker.dialog';
import PhoneInput from '../components/form/Phone';
import ReactHookFormSelect from '../components/form/ReactHookFormSelect';
import useDialogStyles from '../components/styles/dialog.style';

const errorRequired = 'field is blank, please fill in';

const existingEmails = [
  'abc@example.com',
  'james@example.com',
  'banned@example.com',
];

function Signup() {
  const {
    register, errors, handleSubmit, control, getValues, setValue, watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
  });
  const [signedUp, setSignedUp] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedUpID, setSignedUpID] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    console.log('submit', data);
    if (existingEmails.indexOf(data.email.toLowerCase()) >= 0) {
      setSubmitError(Error('This Email exists'));
      return;
    }
    setLoading(true);

    try {
      setSubmitError(null);

      const postApi = from(axios({
        url: `${apiURL}users`,
        method: 'POST',
        // data
        data: {
          email: data.email,
        },
      })).pipe(switchMap((res) => {
        console.log('pipedswitchmap1', res);
        return [res.data];
      }),
      catchError((err) => {
        console.error('axios error', err);
        // setSubmitError(err);
        throw err;
        // return of({ error: true, message: err.message })
      }));
      console.log('postapi', postApi);
      postApi.subscribe(async (subData) => {
        console.log('subs!', subData, subData.id);
        setSignedUpID(subData.id);
        setSignedUp(true);
      });
    } catch (err) {
      setSubmitError(err);
    } finally {
      setLoading(false);
    }
  };

  const doSignin = async () => {
    setSignedUp(false);// hide dialog
    await axios({
      url: `${apiURL}login`,
      method: 'POST',
      data: { email: getValues('email'), password: getValues('password') },
    }).then(() => {
      setSignedIn(true);
    }).catch((err) => {
      console.log('login error', err, err.response);
      // throw Error("Unable to login");
      if (err.response && err.response.status === 400) {
        setSubmitError(Error(`The user with ID ${signedUpID} and email ${getValues('email')} cannot be logged in.`));
      } else {
        setSubmitError(Error(`Unable to login: ${err.message}`));
      }
    });
  };

  const clearSubmitError = () => {
    setSubmitError(null);
  };

  console.log('errors?', errors);
  // console.log("errors.password", errors.password);
  const titles = ['Mr', 'Mrs', 'Prof'];
  const titleOption = [
    <MenuItem value="" key={0}>Your title</MenuItem>,
  ];
  for (let c = 0; c < titles.length; c += 1) {
    const title = titles[c];
    titleOption.push(<MenuItem value={title} key={c + 1}>{title}</MenuItem>);
  }

  const modalStyle = useDialogStyles()();
  // console.log('modalStyle.paper222', modalStyle);
  return (
    <div className="App">
      <h1>Signup</h1>
      <Container fixed>
        {signedUp && (
          <Dialog title="Signup" isOpen={signedUp} onClose={() => { setSignedUp(false); }}>
            <div className={modalStyle.paper}>
              <div style={{ position: 'relative' }}>
                <h2>Thank you</h2>
                Your application has been submitted!
                <p>
                  Your id is
                  {' '}
                  {signedUpID}
                </p>
                <p>
                  <Button variant="contained" color="primary" className="full" onClick={doSignin}>Sign in</Button>
                </p>
              </div>
            </div>
          </Dialog>
        )}
        {signedIn && (
          <div>
            You are now logged in...
          </div>
        )}
        {loading && <CircularProgress />}
        <form onSubmit={handleSubmit(onSubmit)}>
          {submitError && (
            <Alert
              severity="error"
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSubmitError(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            >
              {submitError.message}
            </Alert>
          )}

          {submitError && (
            <Dialog title="Signup" isOpen={submitError} onClose={clearSubmitError}>
              <div className={modalStyle.paper}>
                <div style={{ position: 'relative' }}>
                  <h2>Sorry</h2>
                  <p>
                    {submitError.message}
                  </p>
                  <p>
                    <Grid container spacing={3} style={{}}>
                      <Grid item xs={12} md={6}>
                        <Button variant="contained" color="primary" className="full" onClick={clearSubmitError}>Ok</Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button variant="contained" className="full" onClick={clearSubmitError}>Cancel</Button>
                      </Grid>
                    </Grid>
                  </p>
                </div>
              </div>
            </Dialog>
          )}

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
              <TextField
                name="firstName"
                className="full"
                label="First Name"
                required
                inputRef={register({ pattern: /^[A-Za-z]+$/i, required: true, maxLength: 255 })}
              />
              {errors.firstName && errors.firstName.type === 'required' && <span role="alert">{errorRequired}</span>}
              {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                required
                label="Last Name"
                className="full"
                inputRef={register({ pattern: /^[A-Za-z]+$/i, required: true, maxLength: 255 })}
              />
              {errors.lastName && errors.lastName.type === 'required' && <span role="alert">{errorRequired}</span>}
              {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                required
                className="full"
                inputProps={{
                  form: {
                    autoComplete: 'off',
                  },
                }}
                inputRef={register({
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'invalid format',
                  },
                  required: true,
                  maxLength: 255,
                })}
              />
              {errors.email && errors.email.type === 'required' && <span role="alert">{errorRequired}</span>}
              {errors.email && <span role="alert">{errors.email.message}</span>}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="confirmEmail"
                required
                label="Confirm Email"
                className="full"
                inputProps={{
                  form: {
                    autoComplete: 'off',
                  },
                }}
                inputRef={register({
                  validate: async (val) => {
                    const email = getValues('email');
                    return email === val;
                  },
                  required: true,
                  maxLength: 255,
                })}
              />
              {errors.confirmEmail && errors.confirmEmail.type === 'required' && <span role="alert">{errorRequired}</span>}
              {errors.confirmEmail && errors.confirmEmail.type === 'validate' && <span role="alert">Mismatch with email</span>}
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Date of birth"
                className="full"
                control={control}
                format="dd/MM/yyyy"
                watch={watch}
                setValue={setValue}
                value={getValues('dob')}
                name="dob"
              />
              {errors.dob && <span role="alert">{errors.dob.message}</span>}
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <MuiPhoneNumber name="mobile" defaultCountry={'my'} inputRef={register({ required: true, maxLength: 20 })}/> */}
              <PhoneInput
                name="phone"
                label="Phone Number"
                className="full"
                inputRef={register({
                  pattern: {
                    value: /^[0-9]{3,}-[0-9]{5,}-[0-9]{3,}$/,
                    message: 'invalid format',
                  },
                  maxLength: 20,
                })}
              />
              {errors.phone && <span role="alert">{errors.phone.message}</span>}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                className="full"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                inputRef={register({
                  pattern: {
                    value: /^[a-zA-Z0-9]*$/,
                    message: 'invalid format',
                  },
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                })}
              />
              {errors.password && errors.password.type === 'required' && <span role="alert">{errorRequired}</span>}
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
    </div>
  );
}

export default Signup;
