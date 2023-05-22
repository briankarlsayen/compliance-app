import React from 'react'
import ChecklistStepper from '../components/SimpleStepper'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Paper,
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}))

const ChecklistBuilder = () => {
    const classes = useStyles()

    return (
        <div>
            <Paper
                className={classes.root}
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <ChecklistStepper>
                    <StepOne />
                </ChecklistStepper>
            </Paper>
        </div>
    )
}

const StepOne = () => {
    const [checkList, setChecklist] = React.useState({
        restrict: true,
        groupings: false,
        hideGroup: false,
        hideQuestion: false,
    })
    const classes = useStyles()
    const handleChange = (event: any) => {
        setChecklist({
            ...checkList,
            [event.target.name]: event.target.checked,
        })
    }
    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.restrict}
                            onChange={handleChange}
                            name="restrict"
                        />
                    }
                    label="Restrict use via Schedule, Survey or Ticket only"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.groupings}
                            onChange={handleChange}
                            name="groupings"
                        />
                    }
                    label="Show all Groupings on a single page (App)"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.hideGroup}
                            onChange={handleChange}
                            name="hideGroup"
                        />
                    }
                    label="Hide Group Photos"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.hideQuestion}
                            onChange={handleChange}
                            name="hideQuestion"
                        />
                    }
                    label="Hide Question Numbers"
                />
            </FormControl>
        </div>
    )
}

export default ChecklistBuilder
