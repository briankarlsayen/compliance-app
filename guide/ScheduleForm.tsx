import React from 'react'
import {
    Button,
    Typography,
    Box,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

import { blue, lightGreen, grey } from '@material-ui/core/colors'

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[600],
        },
    },
})

const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
})

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[600],
        },
    },
})

const ScheduleForm = () => {
    return (
        <Box>
            <ScheduleHeader />
            <Box
                style={{
                    display: 'flex',
                    marginTop: '2rem',
                    justifyContent: 'center',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        width: '50%',
                    }}
                >
                    <Details />
                    <EventFreq />
                    <Box
                        style={{
                            paddingTop: '1rem',
                            float: 'right',
                            display: 'flex',
                            gap: '1rem',
                            flexDirection: 'row-reverse',
                            paddingRight: '1rem',
                        }}
                    >
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    color: 'white',
                                }}
                            >
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body2"
                                >
                                    SAVE
                                </Typography>
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={greyTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    color: 'white',
                                }}
                            >
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body2"
                                >
                                    CANCEL
                                </Typography>
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const Details = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h3" gutterBottom>
                Schedule Details
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Schedule name"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="sched_for"
                        name="sched_for"
                        label="Schedule for"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <ThemeProvider theme={blueTheme}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Show forms overdue on the form action dashboard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Add for future dates only"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Send email reminder on due day"
                        />
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

const EventFreq = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h3" gutterBottom>
                Schedule Event Frequency
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} style={{ marginTop: '1rem' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Start date" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="whithin_days"
                        name="whithin_days"
                        label="Within days"
                        fullWidth
                        variant="standard"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} style={{ marginTop: '1rem' }}>
                    <Typography
                        style={{
                            color: 'blue',
                            cursor: 'pointer',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <AddIcon fontSize="small" />
                        Add Rules
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

const ScheduleHeader = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ fontWeight: 'bold' }}>
                    Schedules & Surveys
                </Typography>
                <Typography>&nbsp;/ Create Form Schedules</Typography>
            </div>
        </div>
    )
}

export default ScheduleForm
