import { i18n } from '../i18n'
import MultiSelectField from '../components/MultiSelectField'
import EditScheduleForm, { IInputField } from './EditScheduleForm'
import SimpleStepper from '../components/SimpleStepper'

import { useState } from 'react'
import Grid from '@mui/material/Grid'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Paper,
    makeStyles,
    InputLabel,
    MenuItem,
    Select,
    Box,
    Typography,
} from '@material-ui/core'
i18n.initialise()

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
    const steps = ['General', 'Access', 'PDF Report', 'Schedule/Survey']

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
                    steps={steps}
                >
                    {showStepComponent()}
                </SimpleStepper>
            </Paper>
        </div>
    )
}

export const StepOne = () => {
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

export const StepTwo = () => {
    const [selectList, setSelectedList] = useState([
        'User1',
        'User2',
        'User3',
        'User4',
        'User5',
    ])
    const [inputField, setInputField] = useState({ users: [] })

    return (
        <div style={{ padding: '2rem' }}>
            <Typography>{i18n.t('select_profiles')}</Typography>
            <div>
                <MultiSelectField
                    name="users"
                    list={selectList}
                    selectedList={inputField.users}
                    inputField={inputField}
                    setInputField={setInputField}
                />
            </div>
        </div>
    )
}

export const StepThree = () => {
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
    const [inputField, setInputField] = useState({ logo: '', layout: '' })

    const classes = useStyles()
    const handleChange = (event: any) => {
        setChecklist({
            ...checkList,
            [event.target.name]: event.target.checked,
        })
    }
    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }
    const logoList = [
        {
            name: 'Franchisee/Site logo',
        },
        {
            name: 'Default logo',
        },
        {
            name: 'Web logo',
        },
    ]

    const layoutList = [
        {
            name: 'Portrait',
        },
        {
            name: 'Landscape',
        },
        {
            name: 'A4',
        },
    ]

    return (
        <div>
            <Box
                style={{
                    padding: '2rem',
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <InputLabel
                            style={{
                                display: 'flex',
                                fontWeight: 700,
                            }}
                        >
                            {i18n.t('logo')}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="sched-for-label">
                                Select options
                            </InputLabel>
                            <Select
                                label="Select options"
                                labelId="select-sched-for"
                                id="select-sched-for"
                                value={inputField.logo}
                                name="logo"
                                onChange={updateField}
                                variant="outlined"
                            >
                                {logoList.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel
                            style={{
                                display: 'flex',
                                fontWeight: 700,
                            }}
                        >
                            {i18n.t('layout')}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="sched-for-label">
                                Select options
                            </InputLabel>
                            <Select
                                label="Select options"
                                labelId="select-sched-for"
                                id="select-sched-for"
                                value={inputField.layout}
                                name="layout"
                                onChange={updateField}
                                variant="outlined"
                            >
                                {layoutList.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                >
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
            </Box>
        </div>
    )
}

export const StepFour = () => {
    const [inputField, setInputField] = useState<IInputField>({
        name: '',
        sched_for: 'Franchisee',
        alias: '',
        franchisees: [''],
        startDate: null,
        every_x: '',
        rrule: '',
    })
    return (
        <EditScheduleForm
            inputField={inputField}
            setInputField={setInputField}
        />
    )
}

export default ChecklistBuilder
