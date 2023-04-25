import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Link as MUILink,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

export interface ISimpleTableColumn {
    content: any
    onClick?: () => void
    linkTo?: string
}

export interface ISimpleTableRow {
    id?: number | string
    columns: ISimpleTableColumn[]
}

export interface ISimpleTableProps {
    header: string[]
    rows: ISimpleTableRow[]
}

const tableHeaderStyle = {
    backgroundColor: '#00317d',
    color: 'white',
}

const SimpleTable = (props: ISimpleTableProps) => {
    return (
        <>
            <Container maxWidth={false}>
                <TableContainer component={Paper}>
                    <Table data-testid="simple-table" role="table">
                        <TableHead style={tableHeaderStyle}>
                            <TableRow role="rowheader">
                                {props.header.map((title) => (
                                    <TableCell
                                        role="columnheader"
                                        key={title}
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        {title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row, idxRow) => (
                                <TableRow
                                    key={row.id != null ? row.id : idxRow}
                                    role="row"
                                >
                                    {row.columns.map((col, idxCol) => (
                                        <TableCell key={idxCol} role="cell">
                                            {col.linkTo && (
                                                <Link
                                                    to={col.linkTo}
                                                    onClick={col.onClick}
                                                >
                                                    {col.content}
                                                </Link>
                                            )}
                                            {!col.linkTo && col.onClick && (
                                                <MUILink onClick={col.onClick}>
                                                    {col.content}
                                                </MUILink>
                                            )}
                                            {!col.linkTo &&
                                                !col.onClick &&
                                                col.content}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default SimpleTable
