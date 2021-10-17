import { Link, Typography } from '@mui/material';
import React from 'react';

interface CopyrightProps {
  sx: { mt: number; mb: number };
}

export const Copyright = ({ sx }: CopyrightProps): JSX.Element => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};
