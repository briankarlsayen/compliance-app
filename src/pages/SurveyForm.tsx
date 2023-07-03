import { i18n } from '../i18n'

import { useState, useEffect } from 'react'
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
import CopyButton from '../components/CopyButton'
import MultiSelectField from '../components/MultiSelectField'
import { grey } from '@material-ui/core/colors'
import { Link, useRouteMatch } from 'react-router-dom'
import AutoComplete from '../common/AutoComplete'
import { fetchFranchisee, fetchSurveyDetails } from '../api/checklist'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

interface ISelectedSites {
    id: number
    name: string
}

export interface IInputField {
    id?: number
    alias: string
    expiry_date?: Date | null
    name: string
    survey_for: string
    toRecipients: string[]
    noOfTextFields: number | null
    welcomeMessage: string
    surveyUrl: string
    qrCode: string
    selectedSites: ISelectedSites[]
}

interface PDownloadButton {
    imageBase64: string
    fileName: string
}

interface MatchIds {
    params: {
        id: string
        tempid: string
    }
}

export default function SurveyForm() {
    const classes = useStyles()
    let maxChar = 500
    const [inputField, setInputField] = useState<IInputField>({
        alias: '',
        expiry_date: null,
        surveyUrl: '',
        name: '',
        survey_for: '',
        toRecipients: [],
        noOfTextFields: 0,
        welcomeMessage: '',
        qrCode: '',
        selectedSites: [],
    })
    const [charRemaining, setCharRemaining] = useState(maxChar)
    const [sites, _setSites] = useState([
        { id: 10, name: 'Site1' },
        { id: 11, name: 'Site4' },
        { id: 12, name: 'Site5' },
        { id: 13, name: 'Site6' },
        { id: 14, name: 'Site7' },
    ])
    const [qrImage, setQrImage] = useState('')

    const fetchData = async () => {
        await fetchSurveyDetails(
            Number(match.params.tempid),
            Number(match.params.id)
        ).then((res) => {
            setQrImage(res.qrCode)
            setInputField({ ...res, selectedSites: res.entities })
        })
    }

    console.log('inputField', inputField)

    useEffect(() => {
        fetchData()
    }, [])

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const greyTheme = createTheme({
        palette: {
            primary: {
                main: grey[500],
            },
        },
    })
    const match: MatchIds = useRouteMatch()
    const backUrl = `/checklists/${match?.params?.tempid}/surveys`
    console.log('match', match?.params?.tempid)

    const updateField = (e: any) => {
        if (e.target.name === 'welcomeMessage') {
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

    const surveyFor_list = [
        {
            id: 1,
            name: 'User1',
        },
        {
            id: 2,
            name: 'User2',
        },
        {
            id: 3,
            name: 'User3',
        },
    ]
    const surveyTo_list = [
        { id: 1, name: 'Email1' },
        { id: 2, name: 'Email2' },
        { id: 3, name: 'Email3' },
        { id: 4, name: 'Email4' },
        { id: 5, name: 'Email5' },
    ]
    const alias_list = ['Alias1', 'Alias2', 'Alias3', 'Alias4', 'Alias5']

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
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    {i18n.t('edit_survey')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
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
                                                value={inputField.surveyUrl}
                                                onChange={updateField}
                                                disabled
                                            />
                                            <CopyButton
                                                value={inputField.surveyUrl}
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
                                        <img
                                            src={`data:image/png;base64,${qrImage}`}
                                            alt="survey-qr"
                                        />
                                        <DownloadImageButton
                                            fileName="survey-qr"
                                            imageBase64={qrImage}
                                        />
                                        {/* <SurveyQRCode
                                            details={{
                                                ...qrData,
                                                qrValue: inputField.link,
                                            }}
                                        /> */}
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
                                                            {inputField?.expiry_date ? (
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
                                            label={i18n.t('welcome_msg')}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.welcomeMessage}
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
                                            {i18n.t('txt_ans_to_copy')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="noOfTextFields"
                                            name="noOfTextFields"
                                            label="text answers"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            value={inputField.noOfTextFields}
                                            onChange={updateField}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('surveys_to')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <AutoComplete
                                            id="toRecipients"
                                            fieldLabel="to"
                                            itemKey="id"
                                            itemLabel="name"
                                            items={surveyTo_list}
                                            onChange={(
                                                _event: any,
                                                newValue: any
                                            ) => {
                                                setInputField({
                                                    ...inputField,
                                                    toRecipients: [...newValue],
                                                })
                                            }}
                                            // onChange={updateField}
                                            selectedItems={
                                                inputField.toRecipients
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i18n.t('survey_for')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="use-room-alias-label">
                                                {i18n.t('for')}
                                            </InputLabel>
                                            <Select
                                                label="survey-for"
                                                labelId="select-surver-for-label"
                                                id="select-surver-for"
                                                value={inputField.survey_for}
                                                name="survey_for"
                                                onChange={updateField}
                                                variant="outlined"
                                            >
                                                {surveyFor_list.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
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
                                            {i18n.t('use_room_alias')}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="use-room-alias-label">
                                                Select sites
                                            </InputLabel>
                                            <Select
                                                label="use-room-alias"
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
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Select sites
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <MultiSelectField
                                            name="selected_sites"
                                            list={sites}
                                            selectedList={
                                                inputField.selectedSites
                                            }
                                            inputField={inputField}
                                            setInputField={setInputField}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ alignSelf: 'end', paddingTop: 24 }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '1rem',
                                float: 'right',
                            }}
                        >
                            <ThemeProvider theme={greyTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    <Link
                                        to={backUrl}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                    >
                                        {i18n.t('cancel')}
                                    </Link>
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={blueTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={handleSubmit}
                                >
                                    {i18n.t('save_and_copy')}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={handleSubmit}
                                >
                                    {i18n.t('save')}
                                </Button>
                            </ThemeProvider>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

const DownloadImageButton = ({ imageBase64, fileName }: PDownloadButton) => {
    const downloadImage = () => {
        const element = document.createElement('a')
        element.href = `data:image/png;base64,${imageBase64}`
        element.download = fileName
        element.click()
    }

    return (
        <Typography
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={downloadImage}
        >
            Download QR Code
        </Typography>
    )
}
