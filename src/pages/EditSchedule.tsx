import { i18n } from '../i18n'

import React, { useState } from 'react'
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
import EditScheduleForm from './EditScheduleForm'
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
        sched_for: 'Franchisee',
        alias: '',
        franchisees: [''],
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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify(inputField))
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
