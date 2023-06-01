import { i18n } from '../i18n'
import { fetchVersions } from '../api/checklist'
import Loading from '../components/Loading'

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
import { blue } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            color: 'white',
            backgroundColor: '#223d79',
            padding: '1rem',
        },
    },
})

export default function Versions() {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <VersionHeader />
            <VersionTable />
        </Box>
    )
}

const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
})

const VersionHeader = () => {
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
                    {i18n.t('versions')}
                </Typography>
                <Typography>
                    &nbsp;/ {i18n.t('customLabel_checklist')}
                </Typography>
            </div>
        </div>
    )
}

function createData(
    createdDate: string,
    version: string,
    status: string,
    creator: string,
    actions: React.ReactNode
) {
    return {
        createdDate,
        version,
        status,
        creator,
        actions,
    }
}

interface IVersion {
    createdDate: string
    version: string
    status: string
    creator: string
    actions: any
}

function VersionTable() {
    const [versions, setVersions] = useState<IVersion[]>()
    const processRows = (data: IVersion[]) => {
        setPage(0)
        const createdRows = data.map(
            ({ createdDate, version, status, creator }) => {
                return createData(
                    createdDate,
                    version,
                    status,
                    creator,
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <ThemeProvider theme={blueTheme}>
                            {status === 'Draft' && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    style={{ textTransform: 'none' }}
                                >
                                    {i18n.t('edit')}
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >
                                {i18n.t('history')}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >
                                {i18n.t('copy')}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >
                                {i18n.t('delete')}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >
                                {i18n.t('export')}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >
                                {status === 'Published' ? (
                                    'Change Status'
                                ) : (
                                    <Link
                                        to={`/checklists/versions/promote/1`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#2196f3',
                                        }}
                                    >
                                        {i18n.t('publish')}
                                    </Link>
                                )}
                            </Button>
                        </ThemeProvider>
                    </div>
                )
            }
        )
        setVersions(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const lists = await fetchVersions()
            processRows(lists)
            setLoading(false)
        } catch (error) {
            console.log('failed to get versions')
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

    return (
        <>
            {versions && (
                <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                    <Table
                        data-testid="version-table"
                        role="table"
                        size="small"
                    >
                        <TableHead>
                            <TableRow role="rowheader">
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('created_date')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Typography
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {i18n.t('version')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('checklist_status')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('creator')}
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
                            {versions &&
                                versions
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <StyledTableRow key={index} role="row">
                                            <StyledTableCell role="cell">
                                                {row.createdDate}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                role="cell"
                                                align="center"
                                            >
                                                {row.version}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                role="cell"
                                                align="center"
                                            >
                                                {row.status}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                role="cell"
                                                align="center"
                                            >
                                                {row.creator}
                                            </StyledTableCell>
                                            <StyledTableCell role="cell">
                                                {row.actions}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                        </TableBody>
                    </Table>
                    {versions && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component="div"
                            count={versions.length}
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
