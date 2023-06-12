import { i18n } from '../i18n'
import AutoComplete from '../common/AutoComplete'

import { Box, InputAdornment } from '@material-ui/core'
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material'
import { grey } from '@material-ui/core/colors'
import { Search } from '@material-ui/icons'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ClearIcon from '@material-ui/icons/Clear'
i18n.initialise()

// * dont copy
const t = (key: any) => {
    const val = i18n.t(key)
    return val.toString()
}

const datePickertheme = createTheme({
    overrides: {
        MuiOutlinedInput: {
            input: {
                padding: '10px 14px',
            },
        },
        MuiInputLabel: {
            outlined: {
                transform: 'translate(14px, 10px) scale(1)',
            },
        },
        MuiFormControl: {
            root: {
                marginTop: '15.5px',
            },
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

export default function RegisterFilter({
    filters,
    setInputField,
    inputField,
    updateField,
    handleFilter,
}: any) {
    const {
        centre,
        centreAlias,
        room,
        roomAlias,
        personType,
        people,
        template,
        creator,
        tag,
        createdDateRange,
        checklistDateRange,
    } = filters
    // const ctx = useContext(OneplaceLibraryContext)
    // const t = ctx.i18next.t
    const centreList = [
        {
            id: 1,
            name: '1Place User',
        },
        {
            id: 2,
            name: 'Head Office',
        },
    ]
    const roomList = [
        {
            id: 1,
            name: 'Room1',
        },
        {
            id: 2,
            name: 'Room2',
        },
        {
            id: 3,
            name: 'Room3',
        },
    ]
    const creatorList = [
        {
            id: 1,
            name: 'User 1',
        },
        {
            id: 2,
            name: 'User 2',
        },
        {
            id: 3,
            name: 'User 3',
        },
    ]
    const checklistTemplateList = [
        {
            id: 1,
            name: 'Template 1',
        },
        {
            id: 2,
            name: 'Template 2',
        },
        {
            id: 3,
            name: 'Template 3',
        },
    ]

    const centreAliasList = [
        {
            id: 1,
            name: '1Place User',
        },
        {
            id: 2,
            name: 'Head Office',
        },
    ]
    const roomAliasList = [
        {
            id: 1,
            name: 'Room1',
        },
        {
            id: 2,
            name: 'Room2',
        },
        {
            id: 3,
            name: 'Room3',
        },
    ]
    const personTypeList = [
        {
            id: 1,
            name: 'User',
        },
        {
            id: 2,
            name: 'Admin',
        },
        {
            id: 3,
            name: '1Place',
        },
    ]
    const peopleList = [
        {
            id: 1,
            name: 'User 1',
        },
        {
            id: 2,
            name: 'User 2',
        },
        {
            id: 3,
            name: 'User 3',
        },
    ]
    const tagList = [
        {
            id: 1,
            name: 'Ongoing',
        },
        {
            id: 2,
            name: 'Completed',
        },
    ]

    return (
        <Box style={{ padding: '.5rem', paddingBottom: '2rem' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <AutoComplete
                        id="centre"
                        fieldLabel="Centre"
                        itemKey="id"
                        itemLabel="name"
                        items={centreList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                centre: newValue,
                            })
                        }}
                        selectedItems={inputField.centre}
                    />
                    <AutoComplete
                        id="room"
                        fieldLabel="Room"
                        itemKey="id"
                        itemLabel="name"
                        items={roomList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                room: newValue,
                            })
                        }}
                        selectedItems={inputField.room}
                    />
                    <AutoComplete
                        id="checklistTemplate"
                        fieldLabel={t('centre')}
                        itemKey="id"
                        itemLabel="name"
                        items={checklistTemplateList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                checklistTemplate: newValue,
                            })
                        }}
                        selectedItems={inputField.checklistTemplate}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <AutoComplete
                        id="centreAlias"
                        fieldLabel={t('centre_alias')}
                        itemKey="id"
                        itemLabel="name"
                        items={centreAliasList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                centreAlias: newValue,
                            })
                        }}
                        selectedItems={inputField.centreAlias}
                    />
                    <AutoComplete
                        id="roomAlias"
                        fieldLabel={t('room_alias')}
                        itemKey="id"
                        itemLabel="name"
                        items={roomAliasList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                roomAlias: newValue,
                            })
                        }}
                        selectedItems={inputField.roomAlias}
                    />
                    <AutoComplete
                        id="creator"
                        fieldLabel={t('creator')}
                        itemKey="id"
                        itemLabel="name"
                        items={creatorList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                creator: newValue,
                            })
                        }}
                        selectedItems={inputField.creator}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Box style={{ display: 'flex', gap: '1rem' }}>
                        <ThemeProvider theme={datePickertheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    variant="inline"
                                    inputVariant="outlined"
                                    label={t('start_date')}
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
                        </ThemeProvider>
                        <ThemeProvider theme={datePickertheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="End date"
                                    name="endDate"
                                    value={inputField.endDate}
                                    onChange={(e: any) =>
                                        setInputField({
                                            ...inputField,
                                            endDate: e,
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
                                                        endDate: null,
                                                    })
                                                }}
                                            >
                                                {inputField.endDate ? (
                                                    <ClearIcon />
                                                ) : (
                                                    <></>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </Box>
                    <AutoComplete
                        id="personType"
                        fieldLabel={t('person_types')}
                        itemKey="id"
                        itemLabel="name"
                        items={personTypeList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                personType: newValue,
                            })
                        }}
                        selectedItems={inputField.personType}
                    />
                    <AutoComplete
                        id="tag"
                        fieldLabel={t('tag')}
                        itemKey="id"
                        itemLabel="name"
                        items={tagList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                tag: newValue,
                            })
                        }}
                        selectedItems={inputField.tag}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Box style={{ display: 'flex', gap: '1rem' }}>
                        <ThemeProvider theme={datePickertheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    variant="inline"
                                    inputVariant="outlined"
                                    label={t('checklist_start_date')}
                                    name="checklistStart"
                                    value={inputField.checklistStart}
                                    onChange={(e: any) =>
                                        setInputField({
                                            ...inputField,
                                            checklistStart: e,
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
                                                        checklistStart: null,
                                                    })
                                                }}
                                            >
                                                {inputField.checklistStart ? (
                                                    <ClearIcon />
                                                ) : (
                                                    <></>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        <ThemeProvider theme={datePickertheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    variant="inline"
                                    inputVariant="outlined"
                                    label={t('checklist_end_date')}
                                    name="checklistEnd"
                                    value={inputField.checklistEnd}
                                    onChange={(e: any) =>
                                        setInputField({
                                            ...inputField,
                                            checklistEnd: e,
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
                                                        checklistEnd: null,
                                                    })
                                                }}
                                            >
                                                {inputField.checklistEnd ? (
                                                    <ClearIcon />
                                                ) : (
                                                    <></>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </Box>

                    <AutoComplete
                        id="people"
                        fieldLabel={t('people')}
                        itemKey="id"
                        itemLabel="name"
                        items={peopleList}
                        onChange={(_event: any, newValue: any) => {
                            setInputField({
                                ...inputField,
                                people: newValue,
                            })
                        }}
                        selectedItems={inputField.people}
                    />
                </Grid>
            </Grid>
            <Box style={{ display: 'flex', float: 'right' }}>
                <ThemeProvider theme={greyTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            color: 'white',
                        }}
                        size="large"
                        type="submit"
                    >
                        <Search fontSize="small" />
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body2"
                        >
                            {t('search')}
                        </Typography>
                    </Button>
                </ThemeProvider>
            </Box>
        </Box>
    )
}
