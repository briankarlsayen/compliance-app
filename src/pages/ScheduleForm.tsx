import React from 'react';
import {
  TableContainer,
  Table,
  Button,
  Paper,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Menu,
  MenuItem,
  TablePagination,
  TableCell,
  Box,
  Grid,
  TextField,
  Card,
} from '@material-ui/core';

import {
  Theme,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import { red, blue, lightGreen } from '@material-ui/core/colors';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: lightGreen[600],
    },
  },
});

const ScheduleForm = () => {
  return (
    <Box style={{ padding: '2rem', gap: '1rem' }}>
      <Box style={{ display: 'flex', gap: '1rem' }}>
        <Details />
        <Details />
      </Box>
      <Box style={{ paddingTop: '1rem', float: 'right' }}>
        <Button>
          <Typography style={{ fontWeight: 'bold' }} variant='body2'>
            CANCEL
          </Typography>
        </Button>
        <ThemeProvider theme={buttonTheme}>
          <Button>
            <Typography style={{ fontWeight: 'bold' }} variant='body2'>
              SAVE
            </Typography>
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};
const Details = () => {
  return (
    <Card style={{ padding: '2rem' }}>
      <Typography variant='h2' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address1'
            name='address1'
            label='Address line 1'
            fullWidth
            autoComplete='shipping address-line1'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address2'
            name='address2'
            label='Address line 2'
            fullWidth
            autoComplete='shipping address-line2'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            fullWidth
            autoComplete='shipping address-level2'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='state'
            name='state'
            label='State/Province/Region'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Zip / Postal code'
            fullWidth
            autoComplete='shipping postal-code'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id='country'
            name='country'
            label='Country'
            fullWidth
            autoComplete='shipping country'
            variant='standard'
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </Card>
  );
};

const EventFreq = () => {
  return <Box></Box>;
};

export default ScheduleForm;
