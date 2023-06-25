import { i18n } from '../i18n'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
i18n.initialise()

interface ISimpleStepper {
    children: any
    activeStep: number
    setActiveStep: Dispatch<SetStateAction<number>>
    steps: string[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}))

export default function SimpleStepper({
    children,
    activeStep,
    setActiveStep,
    steps,
}: ISimpleStepper) {
    const classes = useStyles()
    const [skipped, setSkipped] = useState(new Set())

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '80%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                </div>
            </div>
            {children}
            <div>
                {activeStep !== steps.length && (
                    <div style={{ paddingTop: '2rem' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                {i18n.t('back')}
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? (
                                    <Link
                                        to={`/checklists/settings`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                    >
                                        {i18n.t('save')}
                                    </Link>
                                ) : (
                                    i18n.t('next')
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
