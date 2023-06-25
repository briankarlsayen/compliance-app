import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react'
import {
    Typography,
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    TableCell,
    Checkbox,
    Button,
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
import { i18n } from '../i18n'
import ReactToPrint from 'react-to-print'
import { useHistory } from 'react-router-dom'
import Loading from './Loading'
import { blue, grey } from '@material-ui/core/colors'
import PrintReportLayout from './PrintReportLayout'

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

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[600],
        },
    },
})

interface IReportTable {
    id: number
    centre: string
    room: string
    name: string
    template: string
    createdDate?: string | null
    creator?: string | null
    ticket?: string | null
    score?: string | null
    complete?: boolean | null
    isLocked?: boolean | null
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

interface IReportTableProps {
    name: string
    template: string
    centre: string
    room: string
    id: number
}

interface IChecklistReportProps {
    reportDataTable: IReportTableProps[]
    loading: boolean
    inputField: IChecklistPDFReportProps
    setInputField: Dispatch<SetStateAction<IChecklistPDFReportProps>>
}

interface IHeader {
    name: boolean
    due_date: boolean
    creator: boolean
    template: boolean
    creation_date: boolean
    version: boolean
}

interface IContactDetails {
    centre: boolean
    email: boolean
    room: boolean
    address: boolean
    name: boolean
    phone: boolean
}

interface IPDFSettings {
    scoring: boolean
    selectable_answers: boolean
    charts: boolean
    tickets: boolean
    photos: boolean
    hide_question_num: boolean
    hide_unanswered_question: boolean
    hide_info_panel: boolean
    print_pdf_landscape: boolean
}

interface IGroup {
    follow_checklist_template: boolean
    show_all: boolean
}
interface IChecklistPDFReportProps {
    logo?: string
    layout?: string
    name?: string
    title?: string
    header?: IHeader
    contact_details?: IContactDetails
    pdf_settings?: IPDFSettings
    group?: IGroup
    questions?: IGroup
    answer_labels?: IGroup
    table_data?: IReportTableProps[]
}

interface ITextFieldProps {
    name?: string
    value?: any
    inputField: IChecklistPDFReportProps
    setInputField: Dispatch<SetStateAction<IChecklistPDFReportProps>>
    table_data?: IReportTableProps[]
}

export default function ChecklistPDFTable(props: any) {
    const { inputField, setInputField, table_data } = props ?? {}

    const classes = useStyles()
    const history = useHistory<IReportTable[]>()
    const { state } = history.location ?? []

    const componentRef = useRef<HTMLDivElement>(null)
    const [reportTable, setReportTable] = useState<IReportTable[]>([])
    const [loading, setLoading] = useState(false)

    const processRows = (data: IReportTable[]) => {
        const createdRows = data.map(({ id, centre, room, name, template }) => {
            return createData(id, centre, room, name, template)
        })
        setReportTable(createdRows)
    }

    function createData(
        id: number,
        centre: string,
        room: string,
        name: string,
        template: string
    ) {
        return {
            id,
            centre,
            room,
            name,
            template,
        }
    }

    const fetchData = async () => {
        try {
            setLoading(true)

            setReportTable(state ?? [])

            processRows(state ?? [])
            setLoading(false)
        } catch (error) {
            console.log('failed to get data')
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    function backBtn() {
        return history.goBack()
    }

    const ToPrint = forwardRef(({ props }: any, ref: any) => {
        return (
            <div ref={ref}>
                <PrintReportLayout />
            </div>
        )
    })

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <RegisterTable
                setInputField={setInputField}
                inputField={inputField}
                loading={loading}
                reportDataTable={reportTable}
            />
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
                        onClick={backBtn}
                    >
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body2"
                        >
                            {i18n.t('cancel')}
                        </Typography>
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={blueTheme}>
                    <ReactToPrint
                        trigger={() => (
                            <Button
                                variant="contained"
                                color="primary"
                                // onClick={backBtn}
                            >
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body2"
                                >
                                    {i18n.t('print')}
                                </Typography>
                            </Button>
                        )}
                        content={() => componentRef?.current}
                    />
                </ThemeProvider>
                <Box style={{ display: 'none' }}>
                    <ToPrint ref={componentRef} props={inputField} />
                </Box>
            </Box>
        </Box>
    )
}

const RegisterTable = ({
    reportDataTable,
    loading,
    setInputField,
    inputField,
}: IChecklistReportProps) => {
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
    const [selectedList, setSelectedList] = useState<IReportTableProps[]>([])
    const isAllSelected = selectedRows.length === reportDataTable.length

    useEffect(() => {
        setInputField({ ...inputField, table_data: selectedList })
    }, [selectedList])

    const handleRowClick = (rowId: number, data: IReportTableProps) => {
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
    }
    const isSelected = (rowId: number) => selectedRows.indexOf(rowId) !== -1
    const handleSelectAllClick = () => {
        if (isAllSelected) {
            setSelectedList([])
            setSelectedRows([])
        } else {
            setSelectedList(reportDataTable)
            const allRowIds = reportDataTable.map((row, index) => index)
            setSelectedRows(allRowIds)
        }
    }

    return (
        <Box className={classes.root}>
            {reportDataTable && (
                <TableContainer
                    component={Paper}
                    style={{ borderRadius: '5px' }}
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
                                        checked={
                                            selectedRows.length ===
                                            reportDataTable.length
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
                                        {i18n.t('actions')}
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportDataTable &&
                                reportDataTable
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((data, index) => {
                                        const { centre, room, name, template } =
                                            data
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
                                                <StyledTableCell>
                                                    <Typography>
                                                        {name}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography>
                                                        {' '}
                                                        {template}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography>
                                                        {' '}
                                                        {centre}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography>
                                                        {' '}
                                                        {room}
                                                    </Typography>
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
                                                                    'print'
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
                    {reportDataTable && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component="div"
                            count={reportDataTable?.length}
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
