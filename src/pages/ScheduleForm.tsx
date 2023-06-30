import { i18n } from '../i18n'
import Recurrence from '../components/Recurrence'
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
    InputAdornment,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import ClearIcon from '@material-ui/icons/Clear'
import MultiSelectField from '../components/MultiSelectField'
import FeatureFlagsContext from '../feature/featureContext'
import { fetchFranchisee } from '../api/checklist'
import { IInputField } from './ScheduleFormContainer'
i18n.initialise()

interface IAlias {
    id: number
    name: string
    for_user: string[]
}

interface PEditScheduleForm {
    inputField: IInputField
    setInputField: any
}

export default function ScheduleForm({
    inputField,
    setInputField,
}: PEditScheduleForm) {
    const featureFlags = useContext(FeatureFlagsContext).features
    const [isSchedAlias, setSchedAlias] = useState(false)
    const [aliasList, setPickAliasList] = useState<IAlias[]>()
    const [selectList, setSelectList] = useState<any[]>([])
    const [franchiseeList, setFranchiseeList] = useState<string[]>([])

    const checkIsSchedAlias = (str: string) => {
        const strArr = str.toLocaleLowerCase().split(' ')
        const idx = strArr.findIndex((e) => e === 'alias')
        return idx > -1 ? true : false
    }

    const getAlias = (value: string) => {
        const schedType = checklistType
            .find((sched) => sched.name.toLowerCase() === value.toLowerCase())
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
            const isAlias = checkIsSchedAlias(e.target.value)
            setSchedAlias(isAlias)
            getAlias(e.target.value)
        }
    }

    const checklistType = featureFlags.retailOrganisation
        ? [
              {
                  name: 'franchisee',
                  type: 'Franchisee',
              },
              {
                  name: 'franchisee',
                  type: 'Franchisee Alias',
              },
              {
                  name: 'site',
                  type: 'Site',
              },
              {
                  name: 'site',
                  type: 'Site Alias',
              },
          ]
        : [
              {
                  name: 'franchisee',
                  type: 'Franchisee',
              },
              {
                  name: 'franchisee-alias',
                  type: 'Franchisee',
              },
          ]

    const dynamicLabel = () => {
        const pickedFor =
            checklistType.find(
                (item) => item.name === inputField?.checklistType
            )?.type ?? null
        return {
            alias: `Use ${pickedFor} Alias to Select ${pickedFor}`,
            select: `Select ${pickedFor}`,
        }
    }

    const getFranchisees = async () => {
        const franchisees = await fetchFranchisee()

        setFranchiseeList(franchisees)
        setSelectList(franchisees)
    }

    useEffect(() => {
        getFranchisees()
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
                        {i18n.t('sched_for')}
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel id="sched-for-label">
                            {i18n.t('select_an_opt')}
                        </InputLabel>
                        <Select
                            label={i18n.t('select_an_opt')}
                            labelId="select-sched-for"
                            id="select-sched-for"
                            value={inputField.checklistType}
                            name="checklistType"
                            onChange={updateField}
                            variant="outlined"
                        >
                            {checklistType.map((item, index) => (
                                <MenuItem key={index} value={item.name}>
                                    {item.type}
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
                        <InputLabel id="use-franchisee-alias-label">
                            {i18n.t('select_an_opt')}
                        </InputLabel>
                        <Select
                            label={i18n.t('select_an_opt')}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputField.alias}
                            name="alias"
                            onChange={updateField}
                            variant="outlined"
                        >
                            {aliasList &&
                                aliasList.map((item, index) => (
                                    <MenuItem key={item.id} value={item.name}>
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
                        {dynamicLabel().select}
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <MultiSelectField
                        name="franchisees"
                        list={selectList}
                        selectedList={inputField?.selectedList ?? []}
                        inputField={inputField}
                        setInputField={setInputField}
                        disable={isSchedAlias}
                    />
                </Grid>
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
                        {i18n.t('start_date')}
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="inline"
                            inputVariant="outlined"
                            label="Select start date"
                            // defaultValue={null}
                            name="startDate"
                            value={inputField.startDate}
                            onChange={(e: any) =>
                                setInputField({
                                    ...inputField,
                                    startDate: e,
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
                                                startDate: null,
                                            })
                                        }}
                                    >
                                        {inputField.startDate ? (
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
            </Grid>
        </Box>
    )
}
