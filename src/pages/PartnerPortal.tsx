import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
    createStyles,
    makeStyles,
    withStyles
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { i18n } from '../i18n'
import { mockPartnerPortals } from './mockData/partnerPortals'
import { Link } from 'react-router-dom'

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

function PartnerPortal() {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <PartnerPortalTable />
        </Box>
    )
}

// * table
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'white'
        },
        body: {
            fontSize: 14
        }
    })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover
            }
        }
    })
)(TableRow)

function createData(
    id: number,
    franchiseName: string,
    createdAt: string,
    cancelledAt: string,
    recStatus: string
) {
    return {
        id,
        franchiseName,
        createdAt,
        cancelledAt,
        recStatus
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

const PartnerPortalTable = () => {
    const [partnerPortals, setPartnerPortals] = useState<any[]>([])
    const [page, setPage] = useState(0)

    const processRows = (data: any[]) => {
        setPage(0)
        const createdRows = data.map(
            ({ id, franchiseName, createdAt, cancelledAt, recStatus }) => {
                return createData(
                    id,
                    franchiseName,
                    createdAt,
                    cancelledAt,
                    recStatus
                )
            }
        )
        setPartnerPortals(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)

    useEffect(() => {
        processRows(mockPartnerPortals)
    }, [])

    console.log('partnerPortals', partnerPortals)

    return (
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
            <Table data-testid='checklist-table' role='table' size='small'>
                <TableHead>
                    <TableRow role='rowheader'>
                        <StyledTableCell role='columnheader'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('franchiseeName')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell role='columnheader' align='center'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('createdAt')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell role='columnheader'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('cancelledAt')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell role='columnheader'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('status')}
                            </Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {partnerPortals &&
                        partnerPortals
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        <Link
                                            to={'/'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'blue'
                                            }}
                                        >
                                            {row.franchiseName}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        {formatDate(row.createdAt)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.cancelledAt &&
                                            formatDate(row.cancelledAt)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.recStatus}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PartnerPortal
