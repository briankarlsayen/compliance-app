import { i18n } from '../i18n'
import aliasDatas from '../api/alias'

import { useState, useEffect, useContext } from 'react'
import Grid from '@mui/material/Grid'
import {
    TextField,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@material-ui/core'
import MultiSelectField from '../components/MultiSelectField'
import FeatureFlagsContext from '../feature/featureContext'
import { fetchAlias, fetchFranchisees, fetchSites } from '../api/checklist'
import { IInputField } from './ScheduleFormContainer'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { InputAdornment } from '@mui/material'
import DateFnsUtils from '@date-io/date-fns'
import Recurrence from '../components/Recurrence'
import ClearIcon from '@material-ui/icons/Clear'
import { useRouteMatch } from 'react-router-dom'
i18n.initialise()

interface IAlias {
    id: number
    name: string
    for_user: string[]
}

interface ISelectedSites {
    id: number
    name: string
}

interface ISites extends ISelectedSites {
    recStatus?: string
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear().toString()

    return year + '-' + month + '-' + day
}
interface PEditScheduleForm {
    inputField: IInputField
    setInputField: any
}

interface MatchParams {
    url: string
    params: {
        tempid: string
        id?: string
    }
}

export default function ScheduleForm({
    inputField,
    setInputField,
}: PEditScheduleForm) {
    const featureFlags = useContext(FeatureFlagsContext).features
    const [aliasList, setPickAliasList] = useState<IAlias[]>()
    const [selectList, setSelectList] = useState<any[]>([])
    const [franchiseeList, setFranchiseeList] = useState<string[]>([])

    const match: MatchParams = useRouteMatch()
    const formType = match.url.split('/').pop() ?? 'create'

    // const checklistType = featureFlags.retailOrganisation
    const checklistType = true
        ? [
              {
                  id: 1,
                  name: 'Franchisee ',
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
                  value: 'sites-alias',
              },
          ]
        : [
              {
                  id: 1,
                  name: 'Franchisee ',
                  type: 'franchisee',
                  value: 'franchisee',
              },
              {
                  id: 2,
                  name: 'Franchisee Alias',
                  type: 'franchisee',
                  value: 'franchisee-alias',
              },
          ]

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
    const getAliasList = async () => {
        try {
            await fetchAlias().then((res) => {
                setAliases(res)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

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
        return filteredEntity[0].type
    }

    useEffect(() => {
        getEntities()
    }, [sites, franchisees])

    const [entities, setEntities] = useState<ISites[]>([])
    const [isAlias, setAlias] = useState(false)

    const [resetFlag, setResetFlag] = useState(false)
    const handleReset = () => {
        setResetFlag(!resetFlag)
    }

    const checkIsSchedAlias = (str: string) => {
        const strArr = str.toLocaleLowerCase().split(' ')
        const idx = strArr.findIndex((e) => e === 'alias')
        return idx > -1 ? true : false
    }

    const getAlias = (value: string) => {
        const schedType = checklistType
            .find((sched) => sched.type.toLowerCase() === value.toLowerCase())
            ?.type.toLowerCase()
        const schedAlias = aliasDatas.find(
            (item) => item.name === schedType
        )?.alias
        setPickAliasList(schedAlias ?? [])
    }

    const updateSelectList = (list: string[] = []) => {
        const difference = list.length
            ? franchiseeList.filter((item) => !list.includes(item))
            : franchiseeList
        setSelectList(difference)
    }

    const getUserList = (value: string) => {
        const schedUsers = aliasList
            ? aliasList.find((item) => item.name === value)?.for_user
            : []
        const newData = {
            ...inputField,
            alias: value,
            franchisees: schedUsers,
        }
        setInputField(newData)
        updateSelectList(schedUsers)
    }

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
        if (e.target.name === 'alias') {
            getUserList(e.target.value)
        }
        if (e.target.name === 'checklistType') {
            getAlias(e.target.value)

            // * new
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

    const fetchSurveyFor = async () => {
        await fetchFranchisees().then((res) => {
            setFranchisees(res)
        })
        await fetchSites().then((res) => {
            setSites(res)
        })
    }

    useEffect(() => {
        getAliasList()
        fetchSurveyFor()
        getAlias(inputField.checklistType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box style={{ padding: '2rem' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <InputLabel
                        style={{
                            display: 'flex',
                            fontWeight: 700,
                        }}
                    >
                        {i18n.t('sched_name')}
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
                        {i18n.t('survey_for')}
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth size="small" variant="outlined">
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
                                <MenuItem key={item.id} value={item.value}>
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
                    <FormControl fullWidth size="small" variant="outlined">
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
                                <MenuItem key={index} value={item}>
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
                        selectedList={inputField.selectedEntities}
                        inputField={inputField}
                        setInputField={setInputField}
                        disable={isAlias}
                        reset={resetFlag}
                    />
                </Grid>
                {formType === 'create' && (
                    <>
                        <Grid item xs={12} sm={4}>
                            <InputLabel
                                style={{
                                    display: 'flex',
                                    fontWeight: 700,
                                }}
                            >
                                {i18n.t('recurrence')}
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Recurrence
                                setInputField={setInputField}
                                inputField={inputField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel
                                style={{
                                    display: 'flex',
                                    fontWeight: 700,
                                }}
                            >
                                formatDate
                                {i18n.t('start_date')}
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Select start date"
                                    name="startDate"
                                    value={inputField.event.startDate}
                                    onChange={(e: any) =>
                                        setInputField({
                                            ...inputField,
                                            event: {
                                                ...inputField.event,
                                                startDate: formatDate(e),
                                            },
                                        })
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={(e: any) => {
                                                    e.stopPropagation()
                                                    setInputField({
                                                        ...inputField,
                                                        event: {
                                                            ...inputField.event,
                                                            startDate: null,
                                                        },
                                                    })
                                                }}
                                            >
                                                {inputField.event.startDate ? (
                                                    <ClearIcon />
                                                ) : (
                                                    <></>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    )
}
