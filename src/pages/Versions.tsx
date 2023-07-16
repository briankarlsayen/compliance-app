import { i18n } from '../i18n'
import {
    copyVersion,
    deleteVersion,
    exportVersion,
    fetchVersions
} from '../api/checklist'
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
    Box
} from '@material-ui/core'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles
} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import { Link, useRouteMatch } from 'react-router-dom'

i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            color: 'white',
            backgroundColor: '#223d79',
            padding: '1rem'
        }
    }
})

interface MatchParams {
    url: string
    params: {
        tempid: string
    }
}

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
            main: blue[500]
        }
    }
})

const VersionHeader = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'self-start'
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
    id: number,
    createdDateTime: string,
    version: string,
    status: string,
    creator: ICreator,
    actions: React.ReactNode
) {
    return {
        id,
        createdDateTime,
        version,
        status,
        creator,
        actions
    }
}

interface ICreator {
    id: number
    name: string
}

interface IVersion {
    id: number
    createdDateTime: string
    version: string
    status: string
    creator: ICreator
    actions: any
}

function VersionTable() {
    const [versions, setVersions] = useState<IVersion[]>([])
    const processRows = (data: IVersion[]) => {
        setPage(0)
        const createdRows = data.map(
            ({ id, createdDateTime, version, status, creator }) => {
                return createData(
                    id,
                    createdDateTime,
                    version,
                    status,
                    creator,
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <ThemeProvider theme={blueTheme}>
                            {status === 'draft' && (
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    style={{ textTransform: 'none' }}
                                >
                                    {i18n.t('edit')}
                                </Button>
                            )}
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                style={{ textTransform: 'none' }}
                            >
                                {i18n.t('history')}
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                style={{ textTransform: 'none' }}
                                onClick={() => handleCopy(id)}
                            >
                                {i18n.t('copy')}
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                style={{ textTransform: 'none' }}
                                onClick={() => handleDelete(id)}
                            >
                                {i18n.t('delete')}
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                style={{ textTransform: 'none' }}
                                onClick={() => handleExport(id)}
                            >
                                {i18n.t('export')}
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                style={{ textTransform: 'none' }}
                            >
                                {status === 'current' ? (
                                    <Link
                                        to={`/checklists/${match.params?.tempid}/versions/${id}/status`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#2196f3'
                                        }}
                                    >
                                        Change Status
                                    </Link>
                                ) : (
                                    <Link
                                        to={{
                                            pathname: `/checklists/${match.params?.tempid}/versions/${id}/promote`,
                                            state: {
                                                version,
                                                status
                                            }
                                        }}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#2196f3'
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

    const match: MatchParams = useRouteMatch()
    const fetchData = async () => {
        try {
            setLoading(true)
            const lists = await fetchVersions(Number(match.params?.tempid))
            processRows(lists)
            setLoading(false)
        } catch (error) {
            console.log('failed to get versions')
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleDelete = async (id: number) => {
        try {
            await deleteVersion(Number(match.params?.tempid), id)
            await fetchData()
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleCopy = async (id: number) => {
        try {
            await copyVersion(Number(match.params?.tempid), id)
            await fetchData()
        } catch (error) {
            await fetchData()
            console.log('error in copying version')
        }
    }

    const handleExport = async (id: number) => {
        try {
            await exportVersion(Number(match.params?.tempid), id)
            await fetchData()
        } catch (error) {
            await fetchData()
            console.log('error in copying version')
        }
    }

    const formatDate = (date: string) => {
        return new Date(date)
            .toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            .split(' ')
            .join('-')
            .toUpperCase()
    }

    console.log('versions', versions)

    return (
        <>
            {versions && (
                <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                    <Table
                        data-testid='version-table'
                        role='table'
                        size='small'
                    >
                        <TableHead>
                            <TableRow role='rowheader'>
                                <StyledTableCell role='columnheader'>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('created_date')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role='columnheader'
                                    align='center'
                                >
                                    <Typography
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {i18n.t('version')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role='columnheader'
                                    align='center'
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('checklist_status')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role='columnheader'
                                    align='center'
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('creator')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role='columnheader'>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('actions')}
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {versions
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => (
                                    <StyledTableRow key={index} role='row'>
                                        <StyledTableCell role='cell'>
                                            {formatDate(row.createdDateTime)}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            role='cell'
                                            align='center'
                                        >
                                            {row.version}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            role='cell'
                                            align='center'
                                            style={{
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {row.status === 'current'
                                                ? 'published'
                                                : row.status}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            role='cell'
                                            align='center'
                                        >
                                            {row.creator.name}
                                        </StyledTableCell>
                                        <StyledTableCell role='cell'>
                                            {row.actions}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                    {versions && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component='div'
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
            backgroundColor: 'white'
        },
        body: {
            fontSize: 14,
            verticalAlign: 'top'
        }
    })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover
            },
            height: '44px'
        }
    })
)(TableRow)
