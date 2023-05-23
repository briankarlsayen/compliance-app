import { i18n } from '../i18n'
import Recurrence from '../components/Recurrence'
import SelectFranchisee from '../components/SelectFranchisee'
import aliasDatas from '../api/alias'

import React, { useState, useEffect, useContext } from 'react'
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
import MultiSelectField from '../components/MultiSelectField'
import { CatchingPokemonSharp } from '@mui/icons-material'
import FeatureFlagsContext from '../feature/featureContext'
import { fetchFranchisee } from '../api/checklist'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

export interface IInputField {
    name: string
    sched_for: string
    alias: string
    franchisees: string[] | []
    startDate?: Date | null
    every_x: string
    rrule: string
}

interface IAlias {
    id: number
    name: string
    for_user: string[]
}

export default function EditScheduleForm() {
    const featureFlags = useContext(FeatureFlagsContext).features
    const classes = useStyles()
    const [inputField, setInputField] = useState<IInputField>({
        name: '',
        sched_for: 'Franchisee',
        alias: '',
        franchisees: [''],
        startDate: null,
        every_x: '',
        rrule: '',
    })
    const [isSchedAlias, setSchedAlias] = useState(false)
    const [aliasList, setPickAliasList] = useState<IAlias[]>()
    const [selectList, setSelectList] = useState<string[]>([])
    const [franchiseeList, setFranchiseeList] = useState<string[]>([])

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const checkIsSchedAlias = (str: string) => {
        const strArr = str.toLocaleLowerCase().split(' ')
        const idx = strArr.findIndex((e) => e === 'alias')
        return idx > -1 ? true : false
    }

    const getAlias = (value: string) => {
        const schedType = sched_for
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
        const schedUsers =
            aliasList && aliasList.find((item) => item.name === value)?.for_user
        const newData = {
            ...inputField,
            alias: value,
            franchisees: schedUsers ?? [],
        }
        setInputField(newData)
        updateSelectList(schedUsers ?? [])
    }

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
        if (e.target.name === 'alias') {
            getUserList(e.target.value)
        }
        if (e.target.name === 'sched_for') {
            const isAlias = checkIsSchedAlias(e.target.value)
            setSchedAlias(isAlias)
            getAlias(e.target.value)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify(inputField))
    }

    const sched_for = featureFlags.retailOrganisation
        ? [
              {
                  name: 'Franchisee',
                  type: 'Franchisee',
              },
              {
                  name: 'Franchisee Alias',
                  type: 'Franchisee',
              },
              {
                  name: 'Site',
                  type: 'Site',
              },
              {
                  name: 'Site Alias',
                  type: 'Site',
              },
          ]
        : [
              {
                  name: 'Franchisee',
                  type: 'Franchisee',
              },
              {
                  name: 'Franchisee Alias',
                  type: 'Franchisee',
              },
          ]

    const dynamicLabel = () => {
        const pickedFor =
            sched_for.find((item) => item.name === inputField?.sched_for)
                ?.type ?? null
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
        getAlias('Franchisee')
        getFranchisees()
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
                            value={inputField.sched_for}
                            name="sched_for"
                            onChange={updateField}
                            variant="outlined"
                        >
                            {sched_for.map((item, index) => (
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
                        {/* {i18n.t('use_franchisee_alias')} */}
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
                        selectedList={inputField.franchisees}
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
                            defaultValue={null}
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
                                        ) : null}
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
