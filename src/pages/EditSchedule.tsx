import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import {
    Typography,
    TextField,
    Box,
    Paper,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    createTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { blue } from '@mui/material/colors'

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

export default function EditSchedule() {
    const classes = useStyles()
    const [inputField, setInputField] = useState({
        name: '',
        sched_for: '',
        alias: '',
        franchisees: [],
        recurrence: 'monthly',
        startDate: new Date(),
        every_x: '',
        repeat_weekly: '',
        repeat_monthly: '',
        end: '',
    })

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify(inputField))
    }

    const day_of_week = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    const day_of_month = [`Day 'x' of the month`, 'The 1st day of the month']

    const sched_for = [
        'user1',
        'user2',
        'user3',
        'user4',
        'user5',
        'user6',
        'user7',
        'user8',
    ]

    const recurrence = ['monthly', 'weekly']

    return (
        <React.Fragment>
            <Paper
                className={classes.root}
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    Edit Schedule
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={3}>
                            <Box style={{ padding: '2rem' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Schedule Name
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="name"
                                            name="name"
                                            label="name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.name}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Schedule For
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-siaple-select-labelz">
                                                Schedule forzz
                                            </InputLabel>
                                            <Select
                                                labelId="select-sched-for"
                                                id="select-sched-for"
                                                value={inputField.sched_for}
                                                name="sched_for"
                                                onChange={updateField}
                                                variant="outlined"
                                            >
                                                {sched_for.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Use Franchisee Alias to Select
                                            Franchisees
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Grid container>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="name"
                                                    name="name"
                                                    label="name"
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                    value={inputField.name}
                                                    onChange={updateField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="name"
                                                    name="name"
                                                    label="name"
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                    value={inputField.name}
                                                    onChange={updateField}
                                                />
                                            </Grid>
                                        </Grid>
                                        {/* <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">
                                                Select an option
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={inputField.alias}
                                                label="Alias"
                                                name="alias"
                                                onChange={updateField}
                                            >
                                                {franchisee_alias.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl> */}
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Select Franchisees
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="title"
                                            name="title"
                                            label="Franchisee"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Recurrence
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">
                                                Select an option
                                            </InputLabel>
                                            <Select
                                                labelId="select-recurrence"
                                                id="select-recurrence"
                                                value={inputField.recurrence}
                                                name="recurrence"
                                                aria-label="recurrence"
                                                onChange={updateField}
                                                variant="outlined"
                                                style={{
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {recurrence.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                            style={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Start Date
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DatePicker
                                                label="Start date"
                                                value={dayjs(
                                                    inputField.startDate
                                                )}
                                                onChange={(e: any) =>
                                                    setInputField({
                                                        ...inputField,
                                                        startDate: e,
                                                    })
                                                }
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Every 'x' Weeks / Months
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="every_x"
                                            name="every_x"
                                            label="Enter a value"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                            }}
                                        />

                                        {inputField.recurrence === 'monthly' ? (
                                            <div>
                                                <Typography>
                                                    Repeat on (Monthly)
                                                </Typography>
                                                <FormGroup>
                                                    {day_of_month.map(
                                                        (option, index) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                control={
                                                                    <Checkbox />
                                                                }
                                                                label={option}
                                                            />
                                                        )
                                                    )}
                                                </FormGroup>
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography>
                                                    Repeat on (Weekly)
                                                </Typography>
                                                <FormGroup
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    {day_of_week.map(
                                                        (option, index) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                control={
                                                                    <Checkbox />
                                                                }
                                                                label={option}
                                                                style={{
                                                                    alignItems:
                                                                        'center',
                                                                    marginRight:
                                                                        '20px',
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </FormGroup>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            End
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">
                                                Select an option
                                            </InputLabel>
                                            <Select
                                                labelId="select-end"
                                                id="select-end"
                                                value={inputField.end}
                                                name="end"
                                                variant="outlined"
                                                onChange={updateField}
                                            >
                                                {sched_for.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={2} style={{ alignSelf: 'end' }}>
                        <ThemeProvider theme={blueTheme}>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ width: '100%' }}
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ width: '100%' }}
                                >
                                    Save and new Schedule
                                </Button>
                            </Box>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
