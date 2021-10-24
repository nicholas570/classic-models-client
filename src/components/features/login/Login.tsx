import React, { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useActor, useSelector } from '@xstate/react';
import { Container, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Grid, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '../copyright/Copyright';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { FormEvent } from '../../../services/domain/form/definition/FormEvents';
import {
  isInvalidCredentialsSelector,
  emailErrorSelector,
  passwordErrorSelector,
  isValidationDisabledSelector,
  invalidCredentialsSelector,
  isLoadingSelector,
  isLoggedInSelector
} from './Selectors';
import { AuthEvents } from '../../../services/domain/authentication/auth/definition/AuthEvents';

export const Login = () => {
  const { authService } = useContext(AuthenticationContext);

  const [authState, sendToAuthService] = useActor(authService);
  const loginService = authState.context.loginRef;
  const [state, sendToService] = useActor(authState.context.loginRef);

  const loginErrorMessage = useSelector(loginService, emailErrorSelector);
  const passwordErrorMessage = useSelector(loginService, passwordErrorSelector);
  const isDisabled = useSelector(loginService, isValidationDisabledSelector);
  const isLoading = useSelector(loginService, isLoadingSelector);
  const isInvalid = useSelector(loginService, isInvalidCredentialsSelector);
  const invalidCredentialsMessage = useSelector(loginService, invalidCredentialsSelector);
  const isLoggedIn = useSelector(loginService, isLoggedInSelector);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    sendToService({ type: FormEvent.UpdateForm, formData: { [event.target.name]: event.target.value } });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    sendToService({ type: FormEvent.Validate });
  };

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
            name="email"
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
          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: isLoggedIn ? 'primary' : null }}
            disabled={isDisabled && !isLoggedIn}
            type="submit"
            loading={isLoading}
            loadingIndicator="Searching..."
          >
            {isLoggedIn ? 'Logged in' : 'Sign In'}
          </LoadingButton>
          {isInvalid && (
            <Typography align="center" variant="body1" sx={{ color: 'error.main' }}>
              {invalidCredentialsMessage}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link component="button" variant="body2" underline="hover" onClick={() => sendToAuthService({ type: AuthEvents.Forgot })}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component="button" variant="body2" underline="hover" onClick={() => sendToAuthService({ type: AuthEvents.Register })}>
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
