import { i18n } from '../i18n'
import { fetchRegisters } from '../api/checklist'

import React, { useEffect, useState } from 'react'
import {
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    TableCell,
} from '@material-ui/core'
import { Button, Paper, Typography } from '@mui/material'
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
import RegisterFilter from '../components/RegisterFilter'
i18n.initialise()

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
    startDate: Date
    endDate: Date
    checklistStart: Date
    checklistEnd: Date
}

interface IRegisterList {
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

interface IRegisterTblProps {
    registerList: IRegisterList[]
    loading: boolean
}

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            color: 'white',
            backgroundColor: '#223d79',
            padding: '1rem',
        },
    },
    customDatePicker: {
        height: '2.5rem',
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
        startDate: new Date(),
        endDate: new Date(),
        checklistStart: new Date(),
        checklistEnd: new Date(),
    })
    const [registerList, setRegisterList] = useState<IRegisterList[]>([])
    const [filteredRegisterList, setFilteredRegisterList] = useState<
        IRegisterList[]
    >([])
    const [loading, setLoading] = useState(false)

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    let filters = {
        centre: [],
        centreAlias: [],
        room: [],
        roomAlias: [],
        personType: [],
        people: [],
        template: [],
        creator: [],
        tag: [],
        createdDateRange: [],
        checklistDateRange: [],
    }

    // const handleFilter = () => {
    //     alert(JSON.stringify(inputField))
    // }

    const processRows = (data: IRegisterList[]) => {
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

    const fetchData = async () => {
        try {
            setLoading(true)
            const list = await fetchRegisters()
            setRegisterList(list)
            setFilteredRegisterList(list)
            processRows(list)
            setLoading(false)
        } catch (error) {
            console.log('failed to get register')
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

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
                    setLoading={setLoading}
                />
                <RegisterTable
                    registerList={filteredRegisterList}
                    loading={loading}
                />
            </Paper>
        </div>
    )
}

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

const RegisterTable = ({ registerList, loading }: IRegisterTblProps) => {
    const classes = useStyles()
    const DEFAULT_ROWS_PAGE = 10
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = useState(0)

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

    return (
        <Box className={classes.root}>
            {registerList && (
                <TableContainer
                    component={Paper}
                    style={{ marginTop: '2rem', borderRadius: '5px' }}
                >
                    <Table
                        data-testid="register-table"
                        role="table"
                        size="small"
                    >
                        <TableHead>
                            <TableRow role="rowheader">
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('checklist_name')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('template')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('created_date')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('creator')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('centre')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('room')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('ticket')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('score')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('completed')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
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
                                                <StyledTableCell
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'blue',
                                                    }}
                                                >
                                                    {name}
                                                </StyledTableCell>
                                                <StyledTableCell>
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
                                                                display: 'flex',
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
                                                                {i18n.t('edit')}
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
        </Box>
    )
}
