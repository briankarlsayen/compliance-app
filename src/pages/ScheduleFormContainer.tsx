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
    makeStyles,
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import EditScheduleForm from './ScheduleForm'
import { fetchScheduleDetails } from '../api/checklist'
import { useRouteMatch } from 'react-router-dom'
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
    checklistType: string
    alias: string
    startDate?: Date | null
    every_x: string
    rrule: string
    selectedList?: []
}

interface MatchParams {
    url: string
    params: {
        tempid: string
        id: string
    }
}

export default function ScheduleFormContainer() {
    const classes = useStyles()
    const [inputField, setInputField] = useState<IInputField>({
        name: '',
        checklistType: '',
        alias: '',
        startDate: null,
        every_x: '',
        rrule: '',
        selectedList: [],
    })

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify(inputField))
    }

    const match: MatchParams = useRouteMatch()

    const getScheduleDetails = async () => {
        const defaultInput = {
            checklistType: 'franchisee',
            name: '',
            alias: '',
            startDate: null,
            every_x: '',
            rrule: '',
            selectedList: [] as [],
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
                every_x: '',
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
                    {i18n.t('edit_sched')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={3}>
                            <EditScheduleForm
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
