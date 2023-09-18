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
import { i18n } from '../../i18n'
import { mockClientTemps } from './mockData/partnerPortals'
import { Link } from 'react-router-dom'
import ClientTempFilter from './ClientTempFilter'

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

export const ClientTemplates = () => {
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
    templateName: string,
    version: number,
    createdAt: string,
    recStatus: string
) {
    return {
        id,
        templateName,
        version,
        createdAt,
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
    const [clientTemplates, setClientTemplates] = useState<any[]>([])
    const [page, setPage] = useState(0)

    const processRows = (data: any[]) => {
        setPage(0)
        const createdRows = data.map(
            ({ id, templateName, version, createdAt, recStatus }) => {
                return createData(
                    id,
                    templateName,
                    version,
                    createdAt,
                    recStatus
                )
            }
        )
        setClientTemplates(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)

    useEffect(() => {
        processRows(mockClientTemps)
    }, [])

    return (
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
            <ClientTempFilter />
            <Table
                data-testid='client-template-table'
                role='table'
                size='small'
            >
                <TableHead>
                    <TableRow role='rowheader'>
                        <StyledTableCell role='columnheader'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('template_name')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell role='columnheader'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('version')}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell role='columnheader' align='center'>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {i18n.t('created_date_time')}
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
                    {clientTemplates &&
                        clientTemplates
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        {row.templateName}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.version}
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        {formatDate(row.createdAt)}
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
