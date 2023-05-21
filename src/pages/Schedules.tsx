import { i18n } from '../i18n'

import React, { useEffect, useState } from 'react'
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

import { lightGreen } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { fetchSchedule } from '../api/checklist'
import Loading from '../components/Loading'
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
            backgroundColor: '#223d79',
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
                <Typography>
                    &nbsp;/ {i18n.t('customLabel_checklist')}
                </Typography>
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

    const [schedules, setSchedules] = useState<IScheduleData[]>()
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
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const lists = await fetchSchedule()
            setSchedules(lists)
            processRows(lists)
            // processRows(mockData)
            setLoading(false)
        } catch (error) {
            console.log('failed to get schedules')
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
            {schedules && (
                <TableContainer
                    component={Paper}
                    style={{ marginTop: '2rem', borderRadius: '5px' }}
                >
                    <Table
                        data-testid="schedule-table"
                        role="table"
                        size="small"
                    >
                        <TableHead>
                            <TableRow role="rowheader">
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('sched_name')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('start_date')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('show_when_overdue')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('sched_frequency')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
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
                                                    to={`/checklists/schedules/${index}`}
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
                                                <Link
                                                    to={`/checklists/schedules/frequency/${index}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'blue',
                                                    }}
                                                >
                                                    {row.sched_freq}
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <ul
                                                    style={{
                                                        border: '1px black solid',
                                                        padding: '1rem',
                                                        borderRadius: '5px',
                                                        backgroundColor:
                                                            'white',
                                                    }}
                                                >
                                                    {row.for_user.map(
                                                        (user, index) => (
                                                            <li
                                                                key={index}
                                                                style={{
                                                                    marginLeft:
                                                                        '1rem',
                                                                }}
                                                            >
                                                                {user}
                                                            </li>
                                                        )
                                                    )}
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
            )}
            <Loading loading={loading} />
        </>
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

export default Schedules
