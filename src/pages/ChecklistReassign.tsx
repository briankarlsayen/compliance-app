import React, { useEffect, useState } from 'react'

import {
    Typography,
    Box,
    Paper,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    TableCell,
} from '@material-ui/core'
import Grid from '@mui/material/Grid'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'
import { i18n } from '../i18n'
import { blue, grey } from '@material-ui/core/colors'

import InputSelect from '../components/InputSelect'
import { useHistory } from 'react-router-dom'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            color: 'white',
            backgroundColor: '#223d79',
            paddingTop: '1rem',
            paddingBottom: '1rem',
        },
        '& .MuiTableRow-root.Mui-selected': {
            backgroundColor: '#E3EEFA',
        },
    },
    customDatePicker: {
        height: '2.5rem',
    },
})

interface IReassign {
    id: number
    centre: string
    room: string
    name: string
    template: string
    createdDate: string
    creator: string
    ticket: string
    score: string
    complete: boolean
}

interface ISelectInputProps {
    type?: number | null
    centre: string
    room: string
}

interface IReassignTblProps {
    reassignChecklist: IReassign[]
}

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'white',
        },
        body: {
            fontSize: 14,
            verticalAlign: 'top',
            alignItems: 'center',
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

const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
})

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[600],
        },
    },
})

export default function ChecklistReassign() {
    const classes = useStyles()

    const history = useHistory<IReassign[]>()

    const [reassignCheckList, setreassignCheckList] = useState<IReassign[]>([])
    const [inputField, setInputField] = useState<ISelectInputProps>({
        type: null,
        centre: '',
        room: '',
    })

    const processRows = (data: IReassign[]) => {
        const createdRows = data.map(
            ({
                id,
                centre,
                room,
                name,
                template,
                createdDate,
                creator,
                ticket,
                score,
                complete,
            }) => {
                return createData(
                    id,
                    centre,
                    room,
                    name,
                    template,
                    createdDate,
                    creator,
                    ticket,
                    score,
                    complete
                )
            }
        )
        setreassignCheckList(createdRows)
    }

    function createData(
        id: number,
        centre: string,
        room: string,
        name: string,
        template: string,
        createdDate: string,
        creator: string,
        ticket: string,
        score: string,
        complete: boolean
    ) {
        return {
            id,
            centre,
            room,
            name,
            template,
            createdDate,
            creator,
            ticket,
            score,
            complete,
        }
    }

    const fetchData = async () => {
        try {
            if (history.location.state) {
                setreassignCheckList(history?.location?.state)
                processRows(history?.location?.state)
            }
        } catch (error) {
            console.log('failed to get reassign checlist')
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const ReassignTable = ({ reassignChecklist }: IReassignTblProps) => {
        const classes = useStyles()
        const DEFAULT_ROWS_PAGE = 10
        const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
        const [page, setPage] = useState(0)

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
            <Box className={classes.root}>
                {reassignCheckList && (
                    <TableContainer
                        component={Paper}
                        style={{ marginTop: '1rem', borderRadius: '5px' }}
                    >
                        <Table
                            data-testid="reassign-table"
                            role="table"
                            size="small"
                        >
                            <TableHead>
                                <TableRow role="rowheader">
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('label')}
                                        </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('centre')}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('room')}
                                        </Typography>
                                    </StyledTableCell>

                                    <StyledTableCell role="columnheader">
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {i18n.t('completed')}
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reassignCheckList &&
                                    reassignCheckList
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map(
                                            (
                                                {
                                                    id,
                                                    centre,
                                                    room,
                                                    name,
                                                    template,
                                                    createdDate,
                                                    creator,
                                                    ticket,
                                                    score,
                                                    complete,
                                                },
                                                index
                                            ) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell
                                                        role="cell"
                                                        style={{
                                                            textDecoration:
                                                                'none',
                                                            color: 'blue',
                                                        }}
                                                    >
                                                        {name}
                                                    </StyledTableCell>

                                                    <StyledTableCell role="cell">
                                                        {centre}
                                                    </StyledTableCell>
                                                    <StyledTableCell role="cell">
                                                        {room}
                                                    </StyledTableCell>

                                                    <StyledTableCell role="cell">
                                                        {complete
                                                            ? 'True'
                                                            : 'False'}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        )}
                            </TableBody>
                        </Table>
                        {reassignCheckList && (
                            <TablePagination
                                rowsPerPageOptions={[10, 25]}
                                component="div"
                                count={reassignCheckList?.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </TableContainer>
                )}
            </Box>
        )
    }

    const SelectFields = () => {
        const typeList = [
            {
                id: 1,
                name: 'Centre',
            },
            {
                id: 2,
                name: 'Room',
            },
        ]

        const centreList = [
            {
                id: 1,
                name: 'Test 1',
            },
            {
                id: 2,
                name: 'Test 2',
            },
        ]
        const roomList = [
            {
                id: 1,
                name: 'Room 1',
            },
            {
                id: 2,
                name: 'Room 2',
            },
        ]

        const propsTypeContainer = {
            setInputField,
            inputField,
            isObjectInput: true,
            inputVal: inputField.type,
            label: 'Type',
            name: 'type',
            menu: typeList,
        }

        const propsCentreContainer = {
            setInputField,
            inputField,
            isObjectInput: true,
            inputVal: inputField.centre,
            label: 'Centre',
            name: 'centre',
            menu: centreList,
        }

        const propsRoomContainer = {
            setInputField,
            inputField,
            isObjectInput: true,
            inputVal: inputField.room,
            label: 'Room',
            name: 'room',
            menu: roomList,
        }
        return (
            <Grid container>
                <Grid item xs={3} md={3}>
                    <InputSelect {...propsTypeContainer} />
                </Grid>
                <Grid item xs={3} md={3}>
                    <InputSelect {...propsCentreContainer} />
                </Grid>
                {inputField.type && inputField.type === 2 && (
                    <Grid item xs={3} md={3}>
                        <InputSelect {...propsRoomContainer} />
                    </Grid>
                )}
            </Grid>
        )
    }

    const BackAndReassignBtn = () => {
        return (
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: 5,
                }}
            >
                <ThemeProvider theme={greyTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.goBack()}
                    >
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body2"
                        >
                            {i18n.t('back')}
                        </Typography>
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={blueTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.goBack()}
                    >
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body2"
                        >
                            {i18n.t('reassign')}
                        </Typography>
                    </Button>
                </ThemeProvider>
            </Box>
        )
    }

    return (
        <React.Fragment>
            <Paper
                className={classes.root}
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                }}
            >
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    {i18n.t('reassign_checklist')}
                </Typography>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <SelectFields />
                    <ReassignTable reassignChecklist={reassignCheckList} />
                </Box>
                <BackAndReassignBtn />
            </Paper>
        </React.Fragment>
    )
}
