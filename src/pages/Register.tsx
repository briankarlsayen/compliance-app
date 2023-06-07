import { i18n } from '../i18n'
import AutoComplete from '../common/AutoComplete'
import { fetchRegisters } from '../api/checklist'

import React, { useEffect, useState } from 'react'
import {
    TextField,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    TableCell,
} from '@material-ui/core'
import Grid from '@mui/material/Grid'
import { Button, Paper, Typography } from '@mui/material'
import { grey, lightGreen } from '@material-ui/core/colors'
import { Search } from '@material-ui/icons'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'
import Loading from '../components/Loading'
import blue from '@material-ui/core/colors/blue'

interface IRegister {
    centre: string[]
    centreAlias: string[]
    room: string[]
    roomAlias: string[]
    personType: string[]
    people: string[]
    checklistTemplate: string[]
    creator: string[]
    tag: string[]
    createdDateRange: string
    checklistDateRange: string
}

interface IRegisterTblProps {
    centre: string
    room: string
    name: string
    template: string
    createdDate: string
    creator: string
    ticket: string
    score: string
    complete: boolean
}

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[500],
        },
    },
})

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            color: 'white',
            backgroundColor: '#223d79',
            padding: '1rem',
        },
    },
})

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[600],
        },
    },
})

const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
})

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'white',
        },
        body: {
            fontSize: 14,
            verticalAlign: 'top',
        },
    })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            height: '44px',
        },
    })
)(TableRow)

const RegisterHeader = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'self-start',
                }}
            >
                <Typography style={{ fontWeight: 'bold' }}>Register</Typography>
                <Typography>
                    &nbsp;/ {i18n.t('customLabel_checklist')}
                </Typography>
            </div>
        </div>
    )
}

export default function Register() {
    const [inputField, setInputField] = useState<IRegister>({
        centre: [],
        centreAlias: [],
        room: [],
        roomAlias: [],
        personType: [],
        people: [],
        checklistTemplate: [],
        creator: [],
        tag: [],
        createdDateRange: '',
        checklistDateRange: '',
    })

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const classes = useStyles()

    const TableData = () => {
        return (
            <Box className={classes.root}>
                <RegisterTable />
            </Box>
        )
    }

    const RegisterTable = () => {
        function createData(
            centre: string,
            room: string,
            name: string,
            template: string,
            createdDate: string,
            creator: string,
            ticket: string,
            score: string,
            complete: boolean
        ) {
            return {
                centre,
                room,
                name,
                template,
                createdDate,
                creator,
                ticket,
                score,
                complete,
            }
        }

        const [registerList, setRegisterList] = useState<IRegisterTblProps[]>()
        const processRows = (data: IRegisterTblProps[]) => {
            const createdRows = data.map(
                ({
                    centre,
                    room,
                    name,
                    template,
                    createdDate,
                    creator,
                    ticket,
                    score,
                    complete,
                }) => {
                    return createData(
                        centre,
                        room,
                        name,
                        template,
                        createdDate,
                        creator,
                        ticket,
                        score,
                        complete
                    )
                }
            )
            setRegisterList(createdRows)
        }
        const DEFAULT_ROWS_PAGE = 10
        const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
        const [page, setPage] = useState(0)
        const [loading, setLoading] = useState(false)

        const fetchData = async () => {
            try {
                setLoading(true)
                const list = await fetchRegisters()
                setRegisterList(list)
                processRows(list)
                setLoading(false)
            } catch (error) {
                console.log('failed to get register')
            }
        }

        useEffect(() => {
            fetchData()
        }, [])

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number
        ) => {
            setPage(newPage)
        }

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            setRowsPerPage(parseInt(event.target.value))
            setPage(0)
        }

        const formatDate = (date: string) => {
            return new Date(date)
                .toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })
                .split(' ')
                .join('-')
                .toUpperCase()
        }

        return (
            <>
                {registerList && (
                    <TableContainer
                        component={Paper}
                        style={{ marginTop: '2rem', borderRadius: '5px' }}
                    >
                        <Table
                            data-testid="survey-table"
                            role="table"
                            size="small"
                        >
                            <TableHead>
                                <TableRow role="rowheader">
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('checklist_name')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('template')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('created_date')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('creator')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('centre')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('room')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('ticket')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('score')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('completed')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('actions')}
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {registerList &&
                                    registerList
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map(
                                            (
                                                {
                                                    centre,
                                                    room,
                                                    name,
                                                    template,
                                                    createdDate,
                                                    creator,
                                                    ticket,
                                                    score,
                                                    complete,
                                                },
                                                index
                                            ) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>
                                                        {/* <Link
                            to={`/checklists/surveys/${row.name}`}
                            style={{
                              textDecoration: "none",
                              color: "blue",
                            }}
                          >
                            asdasdasd
                          </Link> */}
                                                        {name}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {/* {formatDate(row.expiry_date)} */}
                                                        {template}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {createdDate}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {creator}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {centre}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {room}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {ticket}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {score}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {complete
                                                            ? 'True'
                                                            : 'False'}
                                                    </StyledTableCell>

                                                    <StyledTableCell>
                                                        <ThemeProvider
                                                            theme={blueTheme}
                                                        >
                                                            <Box
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    gap: 5,
                                                                }}
                                                            >
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    size="small"
                                                                    style={{
                                                                        textTransform:
                                                                            'none',
                                                                    }}
                                                                >
                                                                    {i18n.t(
                                                                        'edit'
                                                                    )}
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    size="small"
                                                                    style={{
                                                                        textTransform:
                                                                            'none',
                                                                    }}
                                                                >
                                                                    {i18n.t(
                                                                        'delete'
                                                                    )}
                                                                </Button>
                                                            </Box>
                                                        </ThemeProvider>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        )}
                            </TableBody>
                        </Table>
                        {registerList && (
                            <TablePagination
                                rowsPerPageOptions={[10, 25]}
                                component="div"
                                count={registerList?.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </TableContainer>
                )}
                <Loading loading={loading} />
            </>
        )
    }

    const filters = {
        centre: [],
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
    }

    return (
        <div>
            <RegisterHeader />
            <Paper
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <RegisterFilter
                    filters={filters}
                    setInputField={setInputField}
                    inputField={inputField}
                    updateField={updateField}
                />
                <TableData />
            </Paper>
        </div>
    )
}

const RegisterFilter = ({
    filters,
    setInputField,
    inputField,
    updateField,
}: any) => {
    const {
        centre,
        centreAlias,
        room,
        roomAlias,
        personType,
        people,
        checklistTemplate,
        creator,
        tag,
        createdDateRange,
        checklistDateRange,
    } = filters

    const centreList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const centreAliasList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const roomList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const roomAliasList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const personTypeList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const peopleList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const checklistTemplateList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const creatorList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
        },
    ]
    const tagList = [
        {
            id: 1,
            name: 'one',
        },
        {
            id: 2,
            name: 'two',
        },
        {
            id: 3,
            name: 'three',
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
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.centre}
                    />
                    <AutoComplete
                        id="room"
                        fieldLabel="Room"
                        itemKey="id"
                        itemLabel="name"
                        items={roomList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.room}
                    />
                    <AutoComplete
                        id="checklistTemplate"
                        fieldLabel="Checklist Template"
                        itemKey="id"
                        itemLabel="name"
                        items={checklistTemplateList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.checklistTemplate}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <AutoComplete
                        id="centreAlias"
                        fieldLabel="Centre Alias"
                        itemKey="id"
                        itemLabel="name"
                        items={centreAliasList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.centreAlias}
                    />
                    <AutoComplete
                        id="roomAlias"
                        fieldLabel="Room Alias"
                        itemKey="id"
                        itemLabel="name"
                        items={roomAliasList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.roomAlias}
                    />
                    <AutoComplete
                        id="creator"
                        fieldLabel="Creator"
                        itemKey="id"
                        itemLabel="name"
                        items={creatorList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.creator}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="createdDateRange"
                        name="createdDateRange"
                        label="Created Date Range"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        variant="outlined"
                        value={inputField.createdDateRange}
                        onChange={updateField}
                    />
                    <AutoComplete
                        id="personType"
                        fieldLabel="Person Types"
                        itemKey="id"
                        itemLabel="name"
                        items={personTypeList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.personType}
                    />
                    <AutoComplete
                        id="tag"
                        fieldLabel="Tag"
                        itemKey="id"
                        itemLabel="name"
                        items={tagList}
                        onChange={(_event: any, newValue: any) => {}}
                        selectedItems={inputField.tag}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="checklistDateRange"
                        name="checklistDateRange"
                        label="Checklist Date Range"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        variant="outlined"
                        value={inputField.checklistDateRange}
                        onChange={updateField}
                    />

                    <AutoComplete
                        id="people"
                        fieldLabel="People"
                        itemKey="id"
                        itemLabel="name"
                        items={peopleList}
                        onChange={(_event: any, newValue: any) => {}}
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
                            Search
                        </Typography>
                    </Button>
                </ThemeProvider>
            </Box>
        </Box>
    )
}
