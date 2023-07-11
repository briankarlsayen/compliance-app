import { i18n } from '../i18n'
import Recurrence from '../components/Recurrence'

import React, { useEffect, useState } from 'react'
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
import { fetchScheduleDetails, updateScheduleEvent } from '../api/checklist'
import { IEvent, IInputField } from './ScheduleFormContainer'
import { useRouteMatch } from 'react-router-dom'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

export interface IScheduleEventReq extends IEvent {
    id: number
    tempid: number
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear().toString()

    return year + '-' + month + '-' + day
}

interface MatchParams {
    url: string
    params: {
        tempid: string
        id?: string
    }
}

export default function ScheduleFrequencyForm() {
    const classes = useStyles()
    const [inputField, setInputField] = useState<IInputField>({
        name: '',
        checklistType: 'site',
        alias: '',
        selectedList: [],
        showOverdue: false,
        futureDatesOnly: true,
        emailNotification: true,
        event: {
            gracePeriod: 0,
            id: 0,
            rRule: '',
            rRuleDescription: '',
            startDate: '',
        },
        selectedEntities: [],
        sites: [],
        franchisees: [],
    })

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await updateScheduleEvent({
                ...inputField.event,
                id: Number(match.params.id),
                tempid: Number(match.params.tempid),
            })
        } catch (err) {
            console.error('err', err)
        }
    }

    const match: MatchParams = useRouteMatch()

    const getScheduleDetails = async () => {
        const defaultInput: IInputField = {
            checklistType: 'franchisee',
            name: '',
            alias: '',
            selectedList: [] as [],
            showOverdue: false,
            futureDatesOnly: true,
            emailNotification: true,
            event: {
                gracePeriod: 0,
                id: 0,
                rRule: 'RRULE:FREQ=DAILY;UNTIL=20200524T000000',
                rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
                startDate: null,
            },
            selectedEntities: [],
            sites: [],
            franchisees: [],
        }
        try {
            const details = await fetchScheduleDetails(
                Number(match.params.tempid),
                Number(match.params.id)
            )
            const selected = []
            if (details.checklistType === 'site') {
                details.sites.length && selected.push(...details.sites)
            } else {
                details.franchisees.length &&
                    selected.push(...details.franchisees)
            }
            setInputField({
                ...details,
                alias: '',
                selectedList: selected,
            })
        } catch (err) {
            setInputField(defaultInput)
        }
    }

    useEffect(() => {
        getScheduleDetails()
    }, [])

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
                                            {inputField?.name}
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
                                                {inputField.selectedList?.map(
                                                    (item) => (
                                                        <li
                                                            key={item.name}
                                                            style={{
                                                                marginLeft:
                                                                    '1rem',
                                                            }}
                                                        >
                                                            {item.name}
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
                                                name="startDate"
                                                value={
                                                    inputField.event.startDate
                                                }
                                                onChange={(e: any) =>
                                                    setInputField({
                                                        ...inputField,
                                                        event: {
                                                            ...inputField.event,
                                                            startDate:
                                                                formatDate(e),
                                                        },
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
                                                                    event: {
                                                                        ...inputField.event,
                                                                        startDate:
                                                                            null,
                                                                    },
                                                                })
                                                            }}
                                                        >
                                                            {inputField.event
                                                                .startDate ? (
                                                                <ClearIcon />
                                                            ) : (
                                                                <></>
                                                            )}
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
