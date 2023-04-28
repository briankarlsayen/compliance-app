import * as React from 'react'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Button from '@mui/material/Button'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

export default function EditSchedule() {
    const [inputField, setInputField] = useState({
        name: '',
        sched_for: '',
        alias: '',
        franchisees: [],
        recurrence: '',
        startDate: new Date(),
        every: '',
        repeat_weekly: '',
        repeat_monthly: '',
        end: '',
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
        'science',
        'sports',
        'business',
        'politics',
        'entertainment',
        'technology',
        'world',
        'all',
    ]
    const franchisee_alias = [
        'science',
        'sports',
        'business',
        'politics',
        'entertainment',
        'technology',
        'world',
        'all',
    ]
    const recurrence = [
        'science',
        'sports',
        'business',
        'politics',
        'entertainment',
        'technology',
        'world',
        'all',
    ]

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ padding: '2rem', marginY: '2rem' }}>
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    Edit Schedule
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={3} sx={{}}>
                            <Box sx={{ padding: 5 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            sx={{
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
                                            sx={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Schedule For
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">
                                                Schedule for
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={inputField.sched_for}
                                                label="sched_for"
                                                name="sched_for"
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
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            sx={{
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
                                            sx={{
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
                                            sx={{
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
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={age}
                                                label="Age"
                                                // onChange={handleChange}
                                            >
                                                {recurrence.map(
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
                                            sx={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Start Date
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        {/* <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        variant="outlined"
                                    /> */}
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
                                            sx={{
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
                                        />

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
                                                        control={<Checkbox />}
                                                        label={option}
                                                        sx={{
                                                            alignItems:
                                                                'center',
                                                            marginRight: '20px',
                                                        }}
                                                    />
                                                )
                                            )}
                                        </FormGroup>
                                        <Typography>
                                            Repeat on (Monthly)
                                        </Typography>
                                        <FormGroup>
                                            {day_of_month.map(
                                                (option, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        control={<Checkbox />}
                                                        label={option}
                                                    />
                                                )
                                            )}
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            sx={{
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
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={inputField.end}
                                                label="End"
                                                name="end"
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
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <Button
                                variant="contained"
                                style={{ width: '100%' }}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                style={{ width: '100%' }}
                            >
                                Save and new Schedule
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
