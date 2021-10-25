import React, { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useActor, useSelector } from '@xstate/react';
import { Container, Box, Avatar, Typography, TextField, Grid, Link, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '../copyright/Copyright';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { FormEvent } from '../../../services/domain/form/definition/FormEvents';
import {
  emailErrorSelector,
  invalidCredentialsSelector,
  isInvalidCredentialsSelector,
  isLoadingSelector,
  isValidationDisabledSelector
} from './Selectors';
import { AuthEvents } from '../../../services/domain/authentication/auth/definition/AuthEvents';

export const Forgot = () => {
  const { authService } = useContext(AuthenticationContext);

  const [authState, sendToAuthService] = useActor(authService);
  const forgotService = authState.context.forgotRef!;
  const [state, sendToService] = useActor(forgotService);

  const isDisabled = useSelector(forgotService, isValidationDisabledSelector);
  const isInvalid = useSelector(forgotService, isInvalidCredentialsSelector);
  const isLoading = useSelector(forgotService, isLoadingSelector);
  const invalidCredentialsMessage = useSelector(forgotService, invalidCredentialsSelector);
  const emailErrorMessage = useSelector(forgotService, emailErrorSelector);

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
          Forgot your password?
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'light' }}>
          Please enter your email and we'll send you a link
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
            helperText={emailErrorMessage}
            error={!!emailErrorMessage}
            onChange={(event) => handleChange(event)}
          />
          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDisabled}
            type="submit"
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Reset your password
          </LoadingButton>
          {isInvalid && (
            <Typography align="center" variant="body1" sx={{ color: 'error.main' }}>
              {invalidCredentialsMessage}
            </Typography>
          )}
          <Grid container justifyContent="center">
            <Grid item>
              <Link component="button" variant="body2" underline="hover" onClick={() => sendToAuthService({ type: AuthEvents.SignIn })}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
