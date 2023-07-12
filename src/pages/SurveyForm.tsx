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
    Chip,
    Input,
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import ClearIcon from '@material-ui/icons/Clear'
import CopyButton from '../components/CopyButton'
import MultiSelectField from '../components/MultiSelectField'
import { grey } from '@material-ui/core/colors'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    fetchAlias,
    fetchFranchisees,
    fetchNewSurvey,
    fetchSites,
    fetchSurveyDetails,
    saveSurvey,
} from '../api/checklist'
import TagInput from '../common/TagInput'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
})

interface ISelectedSites {
    id: number
    name: string
}

interface ISites extends ISelectedSites {
    recStatus?: string
}

export interface IInputField {
    id?: number
    alias: string
    expiry_date?: Date | null
    name: string
    checklistType: string
    toRecipients: string[]
    noOfTextFields: number | null
    welcomeMessage: string
    surveyUrl: string
    qrCode: string
    selectedSites: ISelectedSites[]
    path?: string
    sites?: ISelectedSites[]
    franchisees?: ISelectedSites[]
    selectedEntities: ISelectedSites[]
}

export interface ISurveyRequest {
    name?: string
    path?: string
    welcomeMessage?: string
    noOfTextFields?: number | null
    checklistType: string
    sites?: ISelectedSites[]
    franchisees?: ISelectedSites[]
    toRecipients?: string[]
    tempid: number
    id?: number
}

interface PDownloadButton {
    imageBase64: string
    fileName: string
}

interface MatchIds {
    url: string
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
        checklistType: 'site',
        toRecipients: [],
        noOfTextFields: 0,
        welcomeMessage: '',
        qrCode: '',
        selectedSites: [],
        path: '',
        sites: [],
        franchisees: [],
        selectedEntities: [],
    })
    const [charRemaining, setCharRemaining] = useState(maxChar)
    const [qrImage, setQrImage] = useState('')

    const match: MatchIds = useRouteMatch()
    const formType = match.url.split('/').pop() ?? 'create'

    const getEntityList = async () => {
        try {
            await fetchFranchisees().then((res) => {
                setFranchisees(res)
            })
            await fetchSites().then((res) => {
                setSites(res)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const getAliasList = async () => {
        try {
            await fetchAlias().then((res) => {
                setAliases(res)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const fetchData = async () => {
        try {
            const defaultEntity = 'site'

            switch (formType) {
                case 'edit':
                    await fetchSurveyDetails(
                        Number(match.params.tempid),
                        Number(match.params.id)
                    ).then((res) => {
                        setQrImage(res.qrCode)
                        const fetchedSelectedList =
                            res.checklistType === 'site'
                                ? 'sites'
                                : 'franchisees'
                        getEntities(res?.checklistType)
                        setInputField({
                            ...inputField,
                            ...res,
                            checklistType: res?.checklistType ?? defaultEntity,
                            selectedEntities: res[fetchedSelectedList] ?? [],
                        })
                    })
                    break
                case 'create':
                    await fetchNewSurvey(Number(match.params.tempid)).then(
                        (res) => {
                            setQrImage(res.qrCode)
                            setInputField({
                                ...inputField,
                                ...res,
                                checklistType: defaultEntity,
                            })
                        }
                    )
                    break
            }
        } catch (err) {
            console.error('err', err)
        }
    }

    useEffect(() => {
        getAliasList()
        getEntityList()
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

    const backUrl = `/checklists/${match?.params?.tempid}/surveys`

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
        if (e.target.name === 'checklistType') {
            const entityType = getEntities(e.target.value)
            let newEnt
            if (entityType === 'site') {
                newEnt = inputField?.sites
            } else {
                newEnt = inputField?.franchisees
            }
            setInputField({
                ...inputField,
                [e.target.name]: e.target.value,
                selectedEntities: newEnt ?? [],
            })
            handleReset()
            setAlias(e.target.value.includes('alias'))
        }
    }

    const formatSubmitEntities = (arr: any[]) => {
        return arr.map((item) => {
            return {
                ...item,
                recStatus: undefined,
            }
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formattedSelectedEntitites = formatSubmitEntities(
            inputField.selectedEntities
        )
        const submitSelected =
            inputField.checklistType === 'site'
                ? {
                      sites: formattedSelectedEntitites,
                      franchisees: undefined,
                  }
                : {
                      franchisees: formattedSelectedEntitites,
                      sites: undefined,
                  }
        const reqBody = {
            ...inputField,
            ...submitSelected,
            path: inputField.path ?? '1',
            tempid: Number(match.params.tempid),
            id: match.params.id ? Number(match.params.id) : undefined,
            selectedSites: undefined,
            qrCode: undefined,
            surveyUrl: undefined,
            selectedEntities: undefined,
            entities: undefined,
            expiry_date: undefined,
            alias: undefined,
        }
        try {
            await saveSurvey(reqBody)
        } catch (error) {
            console.log('error', error)
        }
    }

    const surveyFor_list = [
        {
            id: 1,
            name: 'Franchisee',
            type: 'franchisee',
            value: 'franchisee',
        },
        {
            id: 2,
            name: 'Franchisee Alias',
            type: 'franchisee',
            value: 'franchisee-alias',
        },
        {
            id: 3,
            name: 'Site',
            type: 'site',
            value: 'site',
        },
        {
            id: 4,
            name: 'Site Alias',
            type: 'site',
            value: 'site-alias',
        },
    ]

    const [sites, setSites] = useState<ISites[]>([])
    const [franchisees, setFranchisees] = useState<ISites[]>([])
    const [aliases, setAliases] = useState([])

    const [entities, setEntities] = useState<ISites[]>([])
    const [isAlias, setAlias] = useState(false)

    const getEntities = (e?: string) => {
        let filteredEntity
        if (e) {
            filteredEntity = surveyFor_list.filter((item) => item.value === e)
        } else {
            filteredEntity = surveyFor_list.filter(
                (item) => item.value === inputField.checklistType
            )
        }
        const newEntities =
            filteredEntity[0].type === 'site' ? sites : franchisees
        const filteredActive = newEntities?.filter(
            (e) => e.recStatus === 'active'
        )

        setEntities(filteredActive)
        setAlias(inputField?.checklistType?.includes('alias'))
        return filteredEntity[0].type
    }

    useEffect(() => {
        getEntities(inputField?.checklistType)
    }, [sites, franchisees])

    const [resetFlag, setResetFlag] = useState(false)
    const handleReset = () => {
        setResetFlag(!resetFlag)
    }

    const dynamicLabel = () => {
        function capitalize(s: string) {
            return s[0].toUpperCase() + s.slice(1)
        }
        let filteredEntity = surveyFor_list.filter(
            (item) => item.value === inputField.checklistType
        )
        const pickedFor = capitalize(filteredEntity[0].type) ?? null

        return {
            alias: `Use ${pickedFor} Alias to Select ${pickedFor}`,
            select: `Select ${pickedFor}`,
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
                                            id="welcomeMessage"
                                            name="welcomeMessage"
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
                                        <TagInput
                                            id="toRecipients"
                                            name="toRecipients"
                                            value={inputField.toRecipients}
                                            handleUpdateList={(val: string[]) =>
                                                setInputField({
                                                    ...inputField,
                                                    toRecipients: val,
                                                })
                                            }
                                            variant="outlined"
                                            placeholder="Input Email"
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
                                                value={inputField.checklistType}
                                                name="checklistType"
                                                onChange={updateField}
                                                variant="outlined"
                                            >
                                                {surveyFor_list.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.value}
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
                                            {dynamicLabel().alias}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        >
                                            <InputLabel id="use-room-alias-label">
                                                {dynamicLabel().select}
                                            </InputLabel>
                                            <Select
                                                label="use-room-alias"
                                                labelId="select-room-alias-label"
                                                id="select-room-alias"
                                                value={inputField.alias}
                                                name="alias"
                                                onChange={updateField}
                                                variant="outlined"
                                                disabled={!aliases.length}
                                            >
                                                {aliases.map((item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
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
                                            {dynamicLabel().select}
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <MultiSelectField
                                            name="selectedEntities"
                                            list={entities}
                                            selectedList={
                                                inputField.selectedEntities
                                            }
                                            inputField={inputField}
                                            setInputField={setInputField}
                                            disable={isAlias}
                                            reset={resetFlag}
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
