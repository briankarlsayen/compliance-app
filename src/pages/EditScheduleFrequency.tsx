import { i18n } from '../i18n'
import Recurrence from '../components/Recurrence'

import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import {
    Typography,
    Box,
    Paper,
    InputLabel,
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

export default function EditScheduleFrequency() {
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

    const schedule = {
        name: 'Document1',
        for_user: [
            'User 1',
            'User 2',
            'User 3',
            'User 4',
            'User 5',
            'User 6',
            'User 7',
            'User 8',
            'User 9',
            'User 10',
            'User 11',
            'User 12',
        ],
    }

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
                    {i18n.t('edit_sched_freq')}
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
                                        <Typography>
                                            {schedule?.name}
                                        </Typography>
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
                                        <Typography>
                                            <ul
                                                style={{
                                                    border: '1px black solid',
                                                    padding: '1rem',
                                                    borderRadius: '5px',
                                                    backgroundColor: 'white',
                                                }}
                                            >
                                                {schedule?.for_user.map(
                                                    (user, index) => (
                                                        <li
                                                            key={index}
                                                            style={{
                                                                marginLeft:
                                                                    '1rem',
                                                            }}
                                                        >
                                                            {user}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </Typography>
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
                                                label="Select start date"
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
                                                                cursor: 'pointer',
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
                                                            {inputField.startDate ? (
                                                                <ClearIcon />
                                                            ) : null}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
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
