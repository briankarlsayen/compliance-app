import { i18n } from '../i18n'
import Recurrence from '../components/Recurrence'
import SelectFranchisee from '../components/SelectFranchisee'

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
    createTheme,
    ThemeProvider,
    makeStyles,
    InputAdornment,
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import ClearIcon from '@material-ui/icons/Clear'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

export interface IInputField {
    name: string
    sched_for: string
    alias: string
    franchisees: string[] | []
    startDate?: Date | null
    every_x: string
    rrule: string
}

export default function EditSchedule() {
    const classes = useStyles()
    const [inputField, setInputField] = useState<IInputField>({
        name: '',
        sched_for: '',
        alias: '',
        franchisees: [],
        startDate: null,
        every_x: '',
        rrule: '',
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

    const franchisees = [
        'franchisee 1',
        'franchisee 2',
        'franchisee 3',
        'franchisee 5',
        'franchisee 6',
    ]

    const selected_franchisee = ['franchisee 4']

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
                    {i18n.t('edit_sched')}
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
                                            {i18n.t('sched_name')}
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
                                            {i18n.t('sched_for')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="sched-for-label">
                                                {i18n.t('select_an_opt')}
                                            </InputLabel>
                                            <Select
                                                label={i18n.t('select_an_opt')}
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
                                            {i18n.t('use_franchisee_alias')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="use-franchisee-alias-label">
                                                {i18n.t('select_an_opt')}
                                            </InputLabel>
                                            <Select
                                                label={i18n.t('select_an_opt')}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={inputField.alias}
                                                name="alias"
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
                                            {i18n.t('select_franchisees')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <SelectFranchisee
                                            selected_franchisee={
                                                selected_franchisee
                                            }
                                            franchisees={franchisees}
                                            setInputField={setInputField}
                                            inputField={inputField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('recurrence')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        {/* <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="recurrence-label">
                                                {i18n.t('select_an_opt')}
                                            </InputLabel>
                                            <Select
                                                label={i18n.t('select_an_opt')}
                                                labelId="select-recurrence"
                                                id="select-recurrence"
                                                value={inputField.recurrence}
                                                name="recurrence"
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
                                        </FormControl> */}

                                        <Recurrence
                                            setInputField={setInputField}
                                            inputField={inputField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('start_date')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <DatePicker
                                                variant="inline"
                                                inputVariant="outlined"
                                                label="Default DateTime"
                                                defaultValue={null}
                                                name="startDate"
                                                value={inputField.startDate}
                                                onChange={(e: any) =>
                                                    setInputField({
                                                        ...inputField,
                                                        startDate: e,
                                                    })
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment
                                                            position="end"
                                                            style={{
                                                                zIndex: 33,
                                                            }}
                                                            onClick={(
                                                                e: any
                                                            ) => {
                                                                e.stopPropagation()
                                                                setInputField({
                                                                    ...inputField,
                                                                    startDate:
                                                                        null,
                                                                })
                                                            }}
                                                        >
                                                            <ClearIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {/* <TextField
                                            fullWidth
                                            id="date"
                                            label="Birthday"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            variant="outlined"
                                            value={inputField.startDate}
                                            onChange={(e: any) =>
                                                setInputField({
                                                    ...inputField,
                                                    startDate: e,
                                                })
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> */}
                                        {/* <LocalizationProvider
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
                                        </LocalizationProvider> */}
                                    </Grid>
                                    {/* <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('every_x_weeks_months')}
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
                                            {i18n.t('end')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="end-label">
                                                {i18n.t('select_an_opt')}
                                            </InputLabel>
                                            <Select
                                                label={i18n.t('select_an_opt')}
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
                                    </Grid> */}
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
                                    {i18n.t('save')}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ width: '100%' }}
                                >
                                    {i18n.t('save_and_new_sched')}
                                </Button>
                            </Box>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
