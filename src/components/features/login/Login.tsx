import React, { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useActor, useSelector } from '@xstate/react';
import { Container, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '../copyright/Copyright';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { FormEvent } from '../../../domain/form/definition/FormEvents';
import { isInvalidCredentialsSelector, loginErrorSelector, passwordErrorSelector, isValidationDisabledSelector } from './Selectors';

export const Login = () => {
  const { loginService } = useContext(AuthenticationContext);

  const [state, sendToService] = useActor(loginService);

  const loginErrorMessage = useSelector(loginService, loginErrorSelector);
  const passwordErrorMessage = useSelector(loginService, passwordErrorSelector);
  const isDisabled = useSelector(loginService, isValidationDisabledSelector);
  const isInvalid = useSelector(loginService, isInvalidCredentialsSelector);
  const invalidCredentialsMessage = useSelector(loginService, isInvalidCredentialsSelector);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    sendToService({ type: FormEvent.UpdateForm, formData: { [event.target.name]: event.target.value } });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    sendToService({ type: FormEvent.Validate });
  };
  console.log(state.value);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={(event: SyntheticEvent) => onSubmit(event)}>
          <TextField
            inputProps={{ autoComplete: 'off' }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="login"
            autoFocus
            onChange={(event) => handleChange(event)}
            helperText={loginErrorMessage}
            error={!!loginErrorMessage}
          />
          <TextField
            inputProps={{ autoComplete: 'off' }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event) => handleChange(event)}
            helperText={passwordErrorMessage}
            error={!!passwordErrorMessage}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isDisabled}>
            Sign In
          </Button>
          {isInvalid && (
            <Typography component="h1" variant="h5">
              {invalidCredentialsMessage}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
