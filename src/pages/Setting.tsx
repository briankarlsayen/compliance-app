import React from 'react'
import { StepFour, StepOne, StepThree, StepTwo } from './ChecklistBuilder'
import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
}))

export default function Settings() {
    const classes = useStyles()

    return (
        <div>
            <Paper
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                    variant="h1"
                >
                    Settings
                </Typography>
                <div>
                    <Typography>General</Typography>
                    <StepOne />
                </div>
                <div>
                    <Typography>Access</Typography>
                    <StepTwo />
                </div>
                <div>
                    <Typography>PDF Report</Typography>
                    <StepThree />
                </div>
                <div>
                    <Typography>Schedule Survey</Typography>
                    <StepFour />
                </div>
            </Paper>
        </div>
    )
}
