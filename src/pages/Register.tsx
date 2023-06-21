import { i18n } from '../i18n'
import { fetchRegisters } from '../api/checklist'

import React, { useEffect, useState } from 'react'
import {
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    TableCell,
    Checkbox,
    Button,
    Paper,
    Typography,
    FormControl,
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
import { Redo, Print, Lock, Add } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import RegisterFilter from '../components/RegisterFilter'
import Loading from '../components/Loading'
i18n.initialise()

interface IRegister {
    centre: string[]
    centreAlias: string[]
    room: string[]
    roomAlias: string[]
    personType: string[]
    people: string[]
    checklistTemplate: string[]
    creator: string[]
    tag: string[]
    createdDateRange: string
    checklistDateRange: string
    startDate: Date
    endDate: Date
    checklistStart: Date
    checklistEnd: Date
}

interface IRegisterList {
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
    isLocked: boolean
}

interface IRegisterTblProps {
    registerList: IRegisterList[]
    loading: boolean
    setAllSelected?: any
}

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

const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
})

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

const RegisterHeader = () => {
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
                <Typography style={{ fontWeight: 'bold' }}>Register</Typography>
                <Typography>
                    &nbsp;/ {i18n.t('customLabel_checklist')}
                </Typography>
            </div>
        </div>
    )
}

export default function Register() {
    const history = useHistory()
    const [inputField, setInputField] = useState<IRegister>({
        centre: [],
        centreAlias: [],
        room: [],
        roomAlias: [],
        personType: [],
        people: [],
        checklistTemplate: [],
        creator: [],
        tag: [],
        createdDateRange: '',
        checklistDateRange: '',
        startDate: new Date(),
        endDate: new Date(),
        checklistStart: new Date(),
        checklistEnd: new Date(),
    })
    const [registerList, setRegisterList] = useState<IRegisterList[]>([])
    const [filteredRegisterList, setFilteredRegisterList] = useState<
        IRegisterList[]
    >([])
    const [allSelected, setAllSelected] = useState<IRegisterList[]>([])
    console.log(
        '🚀 ~ file: Register.tsx:171 ~ Register ~ allSelected:',
        allSelected
    )

    const [loading, setLoading] = useState(false)

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    let filters = {
        centre: [],
        centreAlias: [],
        room: [],
        roomAlias: [],
        personType: [],
        people: [],
        template: [],
        creator: [],
        tag: [],
        createdDateRange: [],
        checklistDateRange: [],
    }

    // const handleFilter = () => {
    //     alert(JSON.stringify(inputField))
    // }

    const processRows = (data: IRegisterList[]) => {
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
                isLocked,
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
                    complete,
                    isLocked
                )
            }
        )
        setRegisterList(createdRows)
    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const list = await fetchRegisters()
            setRegisterList(list)
            setFilteredRegisterList(list)
            processRows(list)
            setLoading(false)
        } catch (error) {
            console.log('failed to get register')
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleChangeIsLockStatus = () => {
        const updatedItems = allSelected?.map((selected) => {
            selected.isLocked = !selected.isLocked
            return { ...selected }
        })
        const newArr = filteredRegisterList.map((item) => {
            const updatedItem = updatedItems.find(
                (updated) => updated.id === item.id
            )
            if (updatedItem) {
                return updatedItem
            }
            return item
        })
        setFilteredRegisterList(newArr)
    }

    return (
        <div>
            <RegisterHeader />
            <Paper
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <RegisterFilter
                    filters={filters}
                    setInputField={setInputField}
                    inputField={inputField}
                    updateField={updateField}
                    setLoading={setLoading}
                />
            </Paper>
            <Paper
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <RegisterBtns
                    allSelected={allSelected}
                    handleChangeIsLockStatus={handleChangeIsLockStatus}
                />
                <RegisterTable
                    registerList={filteredRegisterList}
                    loading={loading}
                    setAllSelected={setAllSelected}
                />
            </Paper>
        </div>
    )
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
    complete: boolean,
    isLocked: boolean
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
        isLocked,
    }
}

const RegisterTable = ({
    registerList,
    loading,
    setAllSelected,
}: IRegisterTblProps) => {
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

    // * start
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [selectedList, setSelectedList] = useState<IRegisterList[]>([])
    const isAllSelected = selectedRows.length === registerList.length

    useEffect(() => {
        setAllSelected(selectedList)
    }, [selectedList])

    const handleRowClick = (rowId: number, data: IRegisterList) => {
        const findSelectedIfExist = selectedList.findIndex(
            ({ id }) => id === data.id
        )
        let copySelectList = [...selectedList]
        if (findSelectedIfExist >= 0) {
            copySelectList.splice(findSelectedIfExist, 1)
            setSelectedList(copySelectList)
        } else {
            copySelectList.push(data)
            setSelectedList(copySelectList)
        }

        const selectedIndex = selectedRows.indexOf(rowId)
        let newSelected: number[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, rowId)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1))
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            )
        }

        setSelectedRows(newSelected)
    }
    const isSelected = (rowId: number) => selectedRows.indexOf(rowId) !== -1
    const handleSelectAllClick = () => {
        if (isAllSelected) {
            setSelectedList([])
            setSelectedRows([])
        } else {
            setSelectedList(registerList)
            const allRowIds = registerList.map((row, index) => index)
            setSelectedRows(allRowIds)
        }
    }

    return (
        <Box className={classes.root}>
            {registerList && (
                <TableContainer
                    component={Paper}
                    style={{ marginTop: '2rem', borderRadius: '5px' }}
                >
                    <Table
                        data-testid="register-table"
                        role="table"
                        size="small"
                    >
                        <TableHead>
                            <TableRow role="rowheader">
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Checkbox
                                        role="checkbox-header"
                                        style={{ color: 'white' }}
                                        // indeterminate={
                                        //     selectedRows.length > 0 &&
                                        //     selectedRows.length <
                                        //         registerList.length
                                        // }
                                        checked={
                                            selectedRows.length ===
                                            registerList.length
                                        }
                                        onClick={handleSelectAllClick}
                                    />
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('checklist_name')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('template')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('created_date')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('creator')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('centre')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('room')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('ticket')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('score')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('completed')}
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
                            {registerList &&
                                registerList
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((data, index) => {
                                        const {
                                            centre,
                                            room,
                                            name,
                                            template,
                                            createdDate,
                                            creator,
                                            ticket,
                                            score,
                                            complete,
                                            isLocked,
                                        } = data
                                        return (
                                            <StyledTableRow
                                                role="row"
                                                key={index}
                                                hover
                                                onClick={() =>
                                                    handleRowClick(index, data)
                                                }
                                                selected={isSelected(index)}
                                            >
                                                <StyledTableCell
                                                    style={{
                                                        textAlignLast: 'center',
                                                    }}
                                                >
                                                    <ThemeProvider
                                                        theme={blueTheme}
                                                    >
                                                        <Box>
                                                            <FormControl>
                                                                <Checkbox
                                                                    role="checkbox"
                                                                    color="primary"
                                                                    checked={isSelected(
                                                                        index
                                                                    )}
                                                                    inputProps={{
                                                                        // @ts-ignore
                                                                        'data-testid':
                                                                            'checkbox-component',
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </ThemeProvider>
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        <Typography
                                                            style={{
                                                                color: 'blue',
                                                            }}
                                                        >
                                                            {name}
                                                        </Typography>
                                                        {isLocked && (
                                                            <Lock
                                                                fontSize="small"
                                                                style={{
                                                                    marginRight: 5,
                                                                    alignSelf:
                                                                        'center',
                                                                }}
                                                                data-testid="lock-icon"
                                                            />
                                                        )}
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {template}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {createdDate}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {creator}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {centre}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {room}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {ticket}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {score}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {complete
                                                        ? 'True'
                                                        : 'False'}
                                                </StyledTableCell>

                                                <StyledTableCell>
                                                    <ThemeProvider
                                                        theme={blueTheme}
                                                    >
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                gap: 5,
                                                            }}
                                                        >
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                style={{
                                                                    textTransform:
                                                                        'none',
                                                                }}
                                                            >
                                                                {i18n.t(
                                                                    'delete'
                                                                )}
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                style={{
                                                                    textTransform:
                                                                        'none',
                                                                }}
                                                            >
                                                                {i18n.t(
                                                                    'print'
                                                                )}
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                style={{
                                                                    textTransform:
                                                                        'none',
                                                                }}
                                                            >
                                                                {i18n.t('copy')}
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                style={{
                                                                    textTransform:
                                                                        'none',
                                                                }}
                                                            >
                                                                {i18n.t(
                                                                    'attachment'
                                                                )}
                                                            </Button>
                                                        </Box>
                                                    </ThemeProvider>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                        </TableBody>
                    </Table>
                    {registerList && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component="div"
                            count={registerList?.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </TableContainer>
            )}
            <Loading loading={loading} />
        </Box>
    )
}

const RegisterBtns = ({ allSelected, handleChangeIsLockStatus }: any) => {
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <ThemeProvider theme={blueTheme}>
                <Box style={{ display: 'flex', flex: 1, gap: 5 }}>
                    <Link
                        to={{
                            pathname: '/checklists/reassign',
                            state: allSelected,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                color: 'white',
                            }}
                            size="large"
                            type="submit"
                        >
                            <Redo fontSize="small" style={{ marginRight: 5 }} />
                            <Typography
                                style={{ fontWeight: 'bold' }}
                                variant="body2"
                            >
                                {i18n.t('reassign')}
                            </Typography>
                        </Button>
                    </Link>
                    <Link
                        to={{
                            pathname: '/checklists/report',
                            state: allSelected ?? [],
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                color: 'white',
                            }}
                            size="large"
                            type="submit"
                        >
                            <Print
                                fontSize="small"
                                style={{ marginRight: 5 }}
                            />
                            <Typography
                                style={{ fontWeight: 'bold' }}
                                variant="body2"
                            >
                                {i18n.t('generate_custom_report')}
                            </Typography>
                        </Button>
                    </Link>
                    <Button
                        data-testid="lock-unlock-btn"
                        variant="contained"
                        color="primary"
                        style={{
                            color: 'white',
                        }}
                        size="large"
                        onClick={handleChangeIsLockStatus}
                    >
                        <Lock fontSize="small" style={{ marginRight: 5 }} />
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body2"
                        >
                            {i18n.t('lock_unlock_update')}
                        </Typography>
                    </Button>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            color: 'white',
                        }}
                        size="large"
                        type="submit"
                    >
                        <Add fontSize="small" style={{ marginRight: 5 }} />
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body2"
                        >
                            {i18n.t('complete_checklist')}
                        </Typography>
                    </Button>
                </Box>
            </ThemeProvider>
        </Box>
    )
}
