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

const handleSubmit = (e: any) => {
    e.preventDefault()
}

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
                Settings
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
                        General
                    </Typography>
                    <StepOne />
                </Box>
                <hr />
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        Access
                    </Typography>
                    <StepTwo />
                </Box>
                <hr />
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        PDF Report
                    </Typography>
                    <StepThree />
                </Box>
                <hr />
                <Box className={classes.root}>
                    <Typography
                        style={{ fontWeight: 'bold', paddingTop: '.5rem' }}
                        variant="h1"
                    >
                        Schedule Survey
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSubmit}
                    >
                        Save and Copy
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
                            Cancel
                        </Link>
                    </Button>
                </ThemeProvider>
            </Box>
        </Paper>
    )
}
