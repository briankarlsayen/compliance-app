import {
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
    withStyles
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { i18n } from '../i18n'
import { mockPartnerPortals } from './mockData/partnerPortals'

i18n.initialise()
function PartnerPortal() {
    return <PartnerPortalTable />
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

    useEffect(() => {
        processRows(mockPartnerPortals)
    }, [])

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
                <TableBody></TableBody>
            </Table>
        </TableContainer>
    )
}

export default PartnerPortal
