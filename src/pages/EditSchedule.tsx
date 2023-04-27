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

export default function EditSchedule() {
    const [age, setAge] = React.useState('')
    const [input, setInput] = useState({
        name: '',
        sched_for: '',
        alias: '',
        franchisees: [],
        recurrence: '',
        startData: '',
        every: '',
        repeat_weekly: '',
        repeat_monthly: '',
        end: '',
    })

    const handleChange = (event) => {
        setAge(event.target.value)
    }

    const day_of_week = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
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
                                        id="title"
                                        name="title"
                                        label="Title"
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
                                        Schdule For
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
                                            // value={age}
                                            label="Age"
                                            // onChange={handleChange}
                                        >
                                            {sched_for.map((item) => (
                                                <MenuItem value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
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
                                            {franchisee_alias.map((item) => (
                                                <MenuItem value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
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
                                        Select Franchisees
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Title"
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
                                            Recurrence
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={age}
                                            label="Age"
                                            // onChange={handleChange}
                                        >
                                            {recurrence.map((item) => (
                                                <MenuItem value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
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
                                    <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Title"
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
                                        Every 'x' Weeks / Months
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        variant="outlined"
                                    />

                                    <Typography>Repeat on (Weekly)</Typography>
                                    <FormGroup
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {day_of_week.map((option) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={option}
                                                sx={{
                                                    alignItems: 'center',
                                                    marginRight: '20px',
                                                }}
                                            />
                                        ))}
                                    </FormGroup>
                                    <Typography>Repeat on (Monthly)</Typography>
                                    <FormGroup>
                                        {day_of_month.map((option) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={option}
                                            />
                                        ))}
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
                                            // value={age}
                                            label="Age"
                                            // onChange={handleChange}
                                        >
                                            {sched_for.map((item) => (
                                                <MenuItem value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
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
                        <Button variant="contained" style={{ width: '100%' }}>
                            Save
                        </Button>
                        <Button variant="contained" style={{ width: '100%' }}>
                            Save and new Schedule
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
