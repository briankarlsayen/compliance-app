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
import { Add as AddIcon } from '@material-ui/icons'

import { lightGreen } from '@material-ui/core/colors'
import { Link, useRouteMatch } from 'react-router-dom'
import LinkQRDialog from '../common/LinkQRDialog'
import CopyButton from '../components/CopyButton'
import { fetchSurvey } from '../api/checklist'
import Loading from '../components/Loading'

i18n.initialise()

export interface IScheduleData {
    id: number
    name: string
    start_date: string
    show_over_due: boolean
    sched_freq: string
    entities: string[]
}

export interface ISurvey {
    id: number
    name: string
    expiry_date: string
    qrCodeLink: string
    surveyUrl: string
    entities: string[]
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
        id: number,
        name: string,
        expiry_date: string,
        qrCodeLink: string,
        surveyUrl: string,
        entities: string[]
    ) {
        return {
            id,
            name,
            expiry_date,
            qrCodeLink,
            surveyUrl,
            entities,
        }
    }
    const match = useRouteMatch()
    const isServer = typeof window === 'undefined'

    const processEnv: any = isServer ? process.env : {}

    const silentCheckUrl =
        processEnv?.REACT_APP_SILENT_CHECK_URL || 'http://localhost:3000'
    const [surveys, setSurveys] = useState<ISurvey[]>()
    const processRows = (data: ISurvey[]) => {
        const createdRows = data.map(
            ({ id, name, expiry_date, qrCodeLink, surveyUrl, entities }) => {
                return createData(
                    id,
                    name,
                    expiry_date,
                    qrCodeLink,
                    surveyUrl,
                    entities
                )
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
                    <Table data-testid="survey-table" role="table" size="small">
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
                                                    to={`${match.url}/${row.id}/edit`}
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
                                                            {row.surveyUrl}
                                                        </Typography>
                                                    </Box>
                                                    <CopyButton
                                                        value={row.surveyUrl}
                                                    />
                                                </Box>
                                                <LinkQRDialog
                                                    details={{
                                                        ...row,
                                                        qrValue: row.surveyUrl,
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
                                                    {row.entities.map(
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
