import React, { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useActor } from '@xstate/react';
import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '../copyright/Copyright';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { FormEvent } from '../../../domain/form/definition/FormEvents';

export const Register = () => {
  const { registerService, authService } = useContext(AuthenticationContext);

  const [state, sendToService] = useActor(registerService);

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
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }} noValidate onSubmit={(event: SyntheticEvent) => onSubmit(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => handleChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(event) => handleChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => handleChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(event) => handleChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: 'primary' }}
            // disabled={isDisabled && !isLoggedIn}
            type="submit"
            // loading={isLoading}
            loadingIndicator="Searching..."
          >
            Sign up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
