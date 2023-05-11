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
    TextField,
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
    ThemeOptions,
} from '@material-ui/core/styles'
import { Add as AddIcon, Done, FileCopyOutlined } from '@material-ui/icons'

import { red, blue, lightGreen, grey } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import LinkQRDialog from '../common/LinkQRDialog'
import CopyButton from '../components/CopyButton'
import { fetchSurvey } from '../api/checklist'
import Loading from '../components/Loading'

i18n.initialise()

export interface IScheduleData {
    name: string
    start_date: string
    show_over_due: boolean
    sched_freq: string
    for_user: string[]
}

export interface ISurvey {
    name: string
    expiry_date: string
    qr_image: string
    path: string
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

const Survey = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <SurveyHeader />
            <SurveyTable />
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

const SurveyHeader = () => {
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
                    {i18n.t('surveys')}
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
                                    {i18n.t('new_survey')}
                                </Typography>
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SurveyTable = () => {
    function createData(
        name: string,
        expiry_date: string,
        qr_image: string,
        path: string,
        for_user: string[]
    ) {
        return {
            name,
            expiry_date,
            qr_image,
            path,
            for_user,
        }
    }

    const isServer = typeof window === 'undefined'

    const processEnv = isServer ? process.env : {}

    const silentCheckUrl =
        processEnv?.REACT_APP_SILENT_CHECK_URL || 'http://localhost:3000'
    const [surveys, setSurveys] = useState<ISurvey[]>()
    const processRows = (data: ISurvey[]) => {
        const createdRows = data.map(
            ({ name, expiry_date, qr_image, path, for_user }) => {
                return createData(name, expiry_date, qr_image, path, for_user)
            }
        )
        setSurveys(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const lists = await fetchSurvey()
            setSurveys(lists)
            processRows(lists)
            // processRows(mockData)
            setLoading(false)
        } catch (error) {
            console.log('failed to get surveys')
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
            {surveys && (
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
                                        {i18n.t('survey_name')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('expiry_date')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('link')}
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
                            {surveys &&
                                surveys
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>
                                                <Link
                                                    to={`/checklists/surveys/${row.name}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'blue',
                                                    }}
                                                >
                                                    {row.name}
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {formatDate(row.expiry_date)}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                style={{
                                                    maxWidth: '80px',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                    padding={1}
                                                    bgcolor={'#0000001a'}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth:
                                                                'calc(100% - 92px)',
                                                        }}
                                                    >
                                                        <Typography
                                                            style={{
                                                                textOverflow:
                                                                    'ellipsis',
                                                                overflow:
                                                                    'hidden',
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            {`${silentCheckUrl}/pa/${row.path}`}
                                                        </Typography>
                                                    </Box>
                                                    <CopyButton
                                                        value={`${silentCheckUrl}/pa/${row.path}`}
                                                    />
                                                </Box>
                                                <LinkQRDialog
                                                    details={{
                                                        ...row,
                                                        qrValue: `${silentCheckUrl}/pa/${row.path}`,
                                                    }}
                                                />
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
                    {surveys && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component="div"
                            count={surveys.length}
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

export default Survey
