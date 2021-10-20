import { Link, Typography } from '@mui/material';
import React from 'react';

interface CopyrightProps {
  sx: { mt?: number; mb?: number };
}

export const Copyright = ({ sx }: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      Copyright ©
      <Link color="inherit" href="https://github.com/nicholas570">
        Nicolas Mercier
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};
