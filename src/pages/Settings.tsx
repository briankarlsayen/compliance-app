import { i18n } from '../i18n'

import React from 'react'
import { StepFour, StepOne, StepThree, StepTwo } from './ChecklistBuilder'
import {
    Box,
    Button,
    Paper,
    ThemeProvider,
    Typography,
    createTheme,
    makeStyles,
} from '@material-ui/core'
import { grey, blue } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
i18n.initialise()

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2rem',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}))

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[500],
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

export default function Settings() {
    const classes = useStyles()

    return (
        <Paper
            elevation={3}
            style={{
                marginTop: '2rem',
                marginBottom: '2rem',
            }}
            className={classes.root}
        >
            <Typography style={{ fontWeight: 'bold' }} variant="h2">
                {i18n.t('settings')}
            </Typography>
            <Paper
                elevation={3}
                style={{
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        {i18n.t('general')}
                    </Typography>
                    <StepOne />
                </Box>
                <hr />
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        {i18n.t('access')}
                    </Typography>
                    <StepTwo />
                </Box>
                <hr />
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        {i18n.t('pdf_report')}
                    </Typography>
                    <StepThree />
                </Box>
                <hr />
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        {i18n.t('schedule')}/{i18n.t('survey')}
                    </Typography>
                    <StepFour />
                </Box>
            </Paper>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    gap: '1rem',
                    width: '100%',
                }}
            >
                <ThemeProvider theme={blueTheme}>
                    <Button variant="contained" color="primary" size="small">
                        {i18n.t('save')}
                    </Button>
                    <Button variant="contained" color="primary" size="small">
                        {i18n.t('save_and_copy')}
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={greyTheme}>
                    <Button variant="contained" color="primary" size="small">
                        <Link
                            to={`/checklists`}
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                            }}
                        >
                            {i18n.t('cancel')}
                        </Link>
                    </Button>
                </ThemeProvider>
            </Box>
        </Paper>
    )
}
