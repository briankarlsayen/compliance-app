import React, { useState } from 'react'
import {
    TextField,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    makeStyles,
    InputAdornment,
} from '@material-ui/core'
import Grid from '@mui/material/Grid'
import {
    Button,
    Paper,
    ThemeProvider,
    Typography,
    createTheme,
} from '@mui/material'
import AutoComplete from '../common/AutoComplete'
import { grey } from '@material-ui/core/colors'
import { Search } from '@material-ui/icons'

interface IRegister {
    centre: string
    centreAlias: string
    room: string
    roomAlias: string
    personType: string
    people: string
    checklistTemplate: string
    creator: string
    tag: string
    createdDateRange: string
    checklistDateRange: string
}

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[500],
        },
    },
})

export default function Register() {
    const [inputField, setInputField] = useState<IRegister>({
        centre: '',
        centreAlias: '',
        room: '',
        roomAlias: '',
        personType: '',
        people: '',
        checklistTemplate: '',
        creator: '',
        tag: '',
        createdDateRange: '',
        checklistDateRange: '',
    })

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }
    // const centreList = [
    //     {
    //         id: 1,
    //         name: 'one',
    //     },
    //     {
    //         id: 2,
    //         name: 'two',
    //     },
    //     {
    //         id: 3,
    //         name: 'three',
    //     },
    // ]
    const centreList = ['all', 'one', 'two', 'three']
    const centreAliasList = ['all', 'one', 'two', 'three']
    const roomList = ['all', 'one', 'two', 'three']
    const roomAliasList = ['all', 'one', 'two', 'three']
    const personTypeList = ['all', 'one', 'two', 'three']
    const peopleList = ['all', 'one', 'two', 'three']
    const checklistTemplateList = ['all', 'one', 'two', 'three']
    const creatorList = ['all', 'one', 'two', 'three']
    const tagList = ['all', 'one', 'two', 'three']

    return (
        <div>
            <Paper
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <Box style={{ padding: '2rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Centre
                                </InputLabel>
                                <Select
                                    label="Centre"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.centre}
                                    name="centre"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {centreList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/* <AutoComplete
                                    fieldLabel="to"
                                    itemKey="id"
                                    itemLabel="name"
                                    items={centreList}
                                    onChange={(_event: any, newValue: any) => {
                                        setInputField({
                                            ...inputField,
                                            centre: [...newValue],
                                        })
                                    }}
                                    // onChange={updateField}
                                    selectedItems={inputField.centre}
                                /> */}
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Room
                                </InputLabel>
                                <Select
                                    label="Room"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.room}
                                    name="room"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {roomList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Checklist Template
                                </InputLabel>
                                <Select
                                    label="Checklist Template"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.checklistTemplate}
                                    name="checklistTemplate"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {checklistTemplateList.map(
                                        (item, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Centre Alias
                                </InputLabel>
                                <Select
                                    label="Centre"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.centreAlias}
                                    name="centre"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {centreAliasList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Room Alias
                                </InputLabel>
                                <Select
                                    label="Room Alias"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.roomAlias}
                                    name="roomAlias"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {roomAliasList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Creator
                                </InputLabel>
                                <Select
                                    label="Creator"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.creator}
                                    name="creator"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {creatorList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Created Date Range
                                </InputLabel>
                                <Select
                                    label="Centre"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.createdDateRange}
                                    name="centre"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {centreAliasList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Person Types
                                </InputLabel>
                                <Select
                                    label="Person Types"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.personType}
                                    name="centre"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {personTypeList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Tag
                                </InputLabel>
                                <Select
                                    label="Tag"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.tag}
                                    name="tag"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {tagList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    Checklist Date Range
                                </InputLabel>
                                <Select
                                    label="Checklist Date Range"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.checklistDateRange}
                                    name="centre"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {centreAliasList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="sched-for-label">
                                    People
                                </InputLabel>
                                <Select
                                    label="People"
                                    labelId="select-sched-for"
                                    id="select-sched-for"
                                    value={inputField.people}
                                    name="people"
                                    onChange={updateField}
                                    variant="outlined"
                                >
                                    {peopleList.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                    Search
                                </Typography>
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </Paper>
        </div>
    )
}
