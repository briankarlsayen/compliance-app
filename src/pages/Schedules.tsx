import { i18n } from '../i18n'

import React from 'react'
import {
    TableContainer,
    Table,
    Button,
    Paper,
    TableHead,
    TableRow,
    Typography,
    TableBody,
    TablePagination,
    TableCell,
    Box,
} from '@material-ui/core'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { red, blue, lightGreen, grey } from '@material-ui/core/colors'
import TableModal from '../components/UsersSchedModal'
import { Link } from 'react-router-dom'
i18n.initialise()
export interface IScheduleData {
    name: string
    start_date: string
    show_over_due: boolean
    sched_freq: string
    for_user: string[]
}

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            color: 'white',
            backgroundColor: 'darkblue',
            padding: '1rem',
        },
    },
})

const Schedules = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <ScheduleHeader />
            <ScheduleTable />
        </Box>
    )
}

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[600],
        },
    },
})

const ScheduleHeader = () => {
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
                <Typography style={{ fontWeight: 'bold' }}>
                    {i18n.t('sched_and_survey')}
                </Typography>
                <Typography>&nbsp;/ {i18n.t('form_sched_for')}</Typography>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}
                >
                    <Typography variant="caption">
                        {i18n.t('new_sched_caption')}:
                    </Typography>
                    <div>
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    color: 'white',
                                }}
                            >
                                <AddIcon fontSize="small" />
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body2"
                                >
                                    {i18n.t('new_sched')}
                                </Typography>
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ScheduleTable = () => {
    const mockData: IScheduleData[] = [
        {
            name: 'Documentation 1',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 2',
            start_date: '01-04-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 3',
            start_date: '05-11-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 4',
            start_date: '04-24-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 12',
            ],
        },
        {
            name: 'Documentation 5',
            start_date: '05-14-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
                'User 1',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 6',
            start_date: '01-21-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 7',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
            ],
        },
        {
            name: 'Documentation 8',
            start_date: '01-24-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 9',
            start_date: '03-24-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 10',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 11',
            start_date: '01-24-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 12',
            start_date: '01-14-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 13',
            start_date: '04-04-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            name: 'Documentation 14',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: ['User 1'],
        },
        {
            name: 'Documentation 15',
            start_date: '04-21-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
    ]

    function createData(
        name: string,
        start_date: string,
        show_over_due: boolean,
        sched_freq: string,
        for_user: string[]
    ) {
        return {
            name,
            start_date,
            show_over_due,
            sched_freq,
            for_user,
        }
    }

    const redTheme = createTheme({
        palette: {
            primary: {
                main: red[500],
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

    const [schedules, setSchedules] = React.useState<IScheduleData[]>()
    const processRows = (data: IScheduleData[]) => {
        const createdRows = data.map(
            ({ name, start_date, show_over_due, sched_freq, for_user }) => {
                return createData(
                    name,
                    start_date,
                    show_over_due,
                    sched_freq,
                    for_user
                )
            }
        )
        setSchedules(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = React.useState(0)
    const [schedIdx, setSchedIdx] = React.useState<number | null>(null)
    const [usersSched, setUsersSched] = React.useState<string[] | null>(null)

    React.useEffect(() => {
        processRows(mockData)
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

    const handleOpenModal = (index: number) => {
        if (schedules) {
            const users = [...schedules[index].for_user]
            setUsersSched(users)
        }
    }

    const handleCloseModal = () => {
        setUsersSched(null)
        setSchedIdx(null)
    }

    return (
        <TableContainer
            component={Paper}
            style={{ marginTop: '2rem', borderRadius: '5px' }}
        >
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('sched_name')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('start_date')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('show_when_overdue')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('sched_frequency')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('for')}
                            </Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schedules &&
                        schedules
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        <Link
                                            to={'/schedule-form'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'blue',
                                            }}
                                        >
                                            {row.name}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {formatDate(row.start_date)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.show_over_due.toString()}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.sched_freq}
                                    </StyledTableCell>
                                    {/* <StyledTruncatedCell
                                            style={{
                                                color: 'blue',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                handleOpenModal(
                                                    index + page * rowsPerPage
                                                )
                                            }
                                        >
                                            {row.for_user.join(', ')}
                                        </StyledTruncatedCell> */}
                                    <StyledTableCell>
                                        <ul
                                            style={{
                                                border: '1px black solid',
                                                padding: '1rem',
                                                borderRadius: '5px',
                                                backgroundColor: 'white',
                                            }}
                                        >
                                            {row.for_user.map((user) => (
                                                <li
                                                    style={{
                                                        marginLeft: '1rem',
                                                        // padding: '.5rem',
                                                    }}
                                                >
                                                    {user}
                                                </li>
                                            ))}
                                        </ul>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                </TableBody>
            </Table>
            {schedules && (
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={schedules.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </TableContainer>
    )
}
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

const StyledTruncatedCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'white',
        },
        body: {
            fontSize: 14,
            verticalAlign: 'top',
            maxWidth: 100,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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

const StyledTableHead = withStyles((theme) => ({
    root: {
        backgroundColor: 'orange',
    },
}))(TableHead)

export default Schedules
