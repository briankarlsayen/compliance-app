import { i18n } from '../i18n'
import Recurrence from '../components/Recurrence'
import SelectFranchisee from '../components/SelectFranchisee'

import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import {
    Typography,
    TextField,
    Box,
    Paper,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    createTheme,
    ThemeProvider,
    makeStyles,
    InputAdornment,
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import ClearIcon from '@material-ui/icons/Clear'
import QRCode from 'react-qr-code'
import CopyButton from '../components/CopyButton'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

export interface IInputField {
    alias: string
    expiry_date?: Date | null
    name: string
    selected_sites?: string[]
    survey_for: string
    survey_to: string[]
    text_form_name: string
    welcome_msg: string
    link: string
}

export default function SurveyForm() {
    const isServer = typeof window === 'undefined'

    const processEnv = isServer ? process.env : {}
    const silentCheckUrl =
        processEnv?.REACT_APP_SILENT_CHECK_URL || 'http://localhost:3000'

    const dummyLink = `${silentCheckUrl}/pa/3KFNLztllSbTlXckrVE9Kx`

    const classes = useStyles()
    let maxChar = 500
    const [inputField, setInputField] = useState<IInputField>({
        alias: '',
        expiry_date: null,
        link: dummyLink,
        name: '',
        selected_sites: [],
        survey_for: '',
        survey_to: [],
        text_form_name: '',
        welcome_msg: '',
    })
    const [charRemaining, setCharRemaining] = useState(maxChar)

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const updateField = (e: any) => {
        if (e.target.name === 'welcome_msg') {
            let charLen = maxChar - e.target.value.length
            if (charLen < 0) return null
            setCharRemaining(charLen)
        }
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify(inputField))
    }

    const surveyFor_list = ['User1', 'User2', 'User3', 'User4']

    const alias_list = ['Alias1', 'Alias2', 'Alias3', 'Alias4', 'Alias5']

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
                    {i18n.t('edit_survey')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={3}>
                            <Box style={{ padding: '2rem' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('survey_link')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Box style={{ display: 'flex' }}>
                                            <TextField
                                                required
                                                id="link"
                                                name="link"
                                                label="link"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                variant="outlined"
                                                value={inputField.link}
                                                onChange={updateField}
                                                disabled
                                            />
                                            <CopyButton
                                                value={inputField.link}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('QR_code')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <QRCode
                                            // ref={qrRef}
                                            size={256}
                                            style={{
                                                height: 'auto',
                                                maxWidth: '200',
                                                width: '200',
                                            }}
                                            value={inputField?.link}
                                            viewBox={`0 0 256 256`}
                                        />
                                        <Typography style={{ color: 'blue' }}>
                                            Download QR Code
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('survey_name')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="name"
                                            name="name"
                                            label="name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.name}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('survey_expiry_date')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <DatePicker
                                                variant="inline"
                                                inputVariant="outlined"
                                                label="Select expiry date"
                                                defaultValue={null}
                                                name="expiry_date"
                                                value={inputField.expiry_date}
                                                onChange={(e: any) =>
                                                    setInputField({
                                                        ...inputField,
                                                        expiry_date: e,
                                                    })
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment
                                                            position="end"
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={(
                                                                e: any
                                                            ) => {
                                                                e.stopPropagation()
                                                                setInputField({
                                                                    ...inputField,
                                                                    expiry_date:
                                                                        null,
                                                                })
                                                            }}
                                                        >
                                                            {inputField.expiry_date ? (
                                                                <ClearIcon />
                                                            ) : null}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('welcome_msg')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="welcome_msg"
                                            name="welcome_msg"
                                            label="welcome_msg"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.welcome_msg}
                                            onChange={updateField}
                                            multiline
                                            minRows={3}
                                        />
                                        <Typography>
                                            {charRemaining} characters remaining
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Text answers to copy to form name
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="text_form_name"
                                            name="text_form_name"
                                            label="text_form_name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.text_form_name}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Email completed surveys to
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="survey_to"
                                            name="survey_to"
                                            label="survey_to"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.survey_to}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Survey for
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="use-room-alias-label">
                                                {i18n.t('surver_for')}
                                            </InputLabel>
                                            <Select
                                                label={i18n.t('surver_for')}
                                                labelId="select-surver-for-label"
                                                id="select-surver-for"
                                                value={inputField.alias}
                                                name="alias"
                                                onChange={updateField}
                                                variant="outlined"
                                            >
                                                {surveyFor_list.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    )
                                                )}
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
                                            Use room alias to select sites
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="use-room-alias-label">
                                                {i18n.t('alias_select_site')}
                                            </InputLabel>
                                            <Select
                                                label={i18n.t(
                                                    'alias_select_site'
                                                )}
                                                labelId="select-room-alias-label"
                                                id="select-room-alias"
                                                value={inputField.alias}
                                                name="alias"
                                                onChange={updateField}
                                                variant="outlined"
                                            >
                                                {alias_list.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
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
