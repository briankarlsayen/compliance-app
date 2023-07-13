import { i18n } from '../i18n'

import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import {
    Typography,
    Box,
    Paper,
    Button,
    createTheme,
    ThemeProvider,
    makeStyles
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import ScheduleForm from './ScheduleForm'
import { fetchScheduleDetails, saveSchedule } from '../api/checklist'
import { useRouteMatch } from 'react-router-dom'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0
        }
    }
})

export interface IEvent {
    gracePeriod: number
    id: number
    rRule: string
    rRuleDescription: string
    startDate: string | null
}

export interface IInputField {
    name: string
    checklistType: string
    alias: string
    selectedList?: ISelected[]
    showOverdue: boolean
    futureDatesOnly: boolean
    emailNotification: boolean
    event: IEvent
    selectedEntities: ISelected[]
    franchisees?: ISelected[]
    sites?: ISelected[]
}

interface ISelected {
    id: number
    name: string
}

export interface IScheduleRequest {
    name: string
    checklistType: string
    sites?: ISelected[]
    franchisees?: ISelected[]
    showOverdue: boolean
    futureDatesOnly: boolean
    emailNotification: boolean
    id?: number
    tempid: number
}

interface MatchParams {
    url: string
    params: {
        tempid: string
        id?: string
    }
}

export default function ScheduleFormContainer() {
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
            startDate: ''
        },
        selectedEntities: [],
        sites: [],
        franchisees: []
    })

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500]
            }
        }
    })

    const match: MatchParams = useRouteMatch()
    const formType = match.url.split('/').pop() ?? 'create'

    const formatSubmitEntities = (arr: any[]) => {
        return arr.map((item) => {
            return {
                ...item,
                recStatus: undefined
            }
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const formattedSelectedEntitites = formatSubmitEntities(
            inputField.selectedEntities
        )
        const submitSelected =
            inputField.checklistType === 'site'
                ? {
                      sites: formattedSelectedEntitites,
                      franchisees: undefined
                  }
                : {
                      franchisees: formattedSelectedEntitites,
                      sites: undefined
                  }
        const reqBody = {
            ...inputField,
            ...submitSelected,
            tempid: Number(match.params.tempid),
            id: match.params.id ? Number(match.params.id) : undefined,
            alias: undefined,
            entities: undefined,
            historicEvents: undefined,
            selectedEntities: undefined,
            selectedList: undefined,
            startDate: undefined
        }
        try {
            console.log('reqBody', reqBody)
            await saveSchedule(reqBody)
        } catch (error) {
            console.log('error', error)
        }
    }

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
                startDate: null
            },
            selectedEntities: [],
            sites: [],
            franchisees: []
        }
        try {
            switch (formType) {
                case 'edit':
                    const details = await fetchScheduleDetails(
                        Number(match.params.tempid),
                        Number(match.params.id)
                    )

                    const selected = []

                    if (details.checklistType === 'site') {
                        details?.sites?.length &&
                            selected.push(...details?.sites)
                    } else {
                        details?.franchisees.length &&
                            selected.push(...details.franchisees)
                    }

                    const fetchedSelectedList =
                        details.checklistType === 'site'
                            ? 'sites'
                            : 'franchisees'

                    setInputField({
                        ...details,
                        alias: '',
                        selectedList: selected,
                        startDate: details.event.startDate,
                        selectedEntities: details[fetchedSelectedList]
                    })
                    break
                case 'create':
                    setInputField(defaultInput)
                    break
            }
        } catch (err) {
            setInputField(defaultInput)
        }
    }

    useEffect(() => {
        getScheduleDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Paper
                className={classes.root}
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem'
                }}
            >
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    {formType === 'create'
                        ? 'Create Schedule'
                        : 'Edit Schedule'}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={3}>
                            <ScheduleForm
                                inputField={inputField}
                                setInputField={setInputField}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={2} style={{ alignSelf: 'end' }}>
                        <ThemeProvider theme={blueTheme}>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}
                            >
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    style={{ width: '100%' }}
                                    onClick={handleSubmit}
                                >
                                    {i18n.t('save')}
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
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
