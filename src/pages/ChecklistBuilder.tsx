import React, { useState } from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Paper,
    makeStyles,
} from '@material-ui/core'
import MultiSelectField from '../components/MultiSelectField'
import SurveyForm from './SurveyForm'
import EditSchedule from './EditSchedule'
import EditScheduleForm from './EditScheduleForm'
import SimpleStepper from '../components/SimpleStepper'

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
    const [activeStep, setActiveStep] = useState(0)

    const showStepComponent = () => {
        switch (activeStep) {
            case 0:
                return <StepOne />
            case 1:
                return <StepTwo />
            case 2:
                return <StepThree />
            case 3:
                return <StepFour />
        }
    }

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
                <SimpleStepper
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                >
                    {showStepComponent()}
                </SimpleStepper>
            </Paper>
        </div>
    )
}

const StepOne = () => {
    const [checkList, setChecklist] = useState({
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

const StepTwo = () => {
    const [selectList, selectedList] = useState([
        'User1',
        'User2',
        'User3',
        'User4',
        'User5',
    ])
    const [inputField, setInputField] = useState({ users: [] })
    return (
        <div>
            <p>Select Profiles</p>
            <MultiSelectField
                name="users"
                list={selectList}
                selectedList={inputField.users}
                inputField={inputField}
                setInputField={setInputField}
            />
        </div>
    )
}

const StepThree = () => {
    const [checkList, setChecklist] = useState({
        scoring: false,
        anwserOpt: false,
        charts: false,
        tickets: false,
        photos: false,
        hideUnaswered: false,
        hideInfo: false,
        printPDF: false,
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
                            checked={checkList.scoring}
                            onChange={handleChange}
                            name="scoring"
                        />
                    }
                    label="Show scoring"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.anwserOpt}
                            onChange={handleChange}
                            name="anwserOpt"
                        />
                    }
                    label="Show all answer options"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.charts}
                            onChange={handleChange}
                            name="charts"
                        />
                    }
                    label="Show charts"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.tickets}
                            onChange={handleChange}
                            name="tickets"
                        />
                    }
                    label="Show tickets (based on user's profile)"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.photos}
                            onChange={handleChange}
                            name="photos"
                        />
                    }
                    label="Show photos at the bottom of each group"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.hideUnaswered}
                            onChange={handleChange}
                            name="hideUnaswered"
                        />
                    }
                    label="Hide unanswered questions/groups"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.hideInfo}
                            onChange={handleChange}
                            name="hideInfo"
                        />
                    }
                    label="Hide information panel questions"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkList.printPDF}
                            onChange={handleChange}
                            name="printPDF"
                        />
                    }
                    label="Print PDF report in landscape mode"
                />
            </FormControl>
        </div>
    )
}

const StepFour = () => {
    return <p>Step four</p>
}

export default ChecklistBuilder
