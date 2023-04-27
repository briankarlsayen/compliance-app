import React, { useState, useRef, useEffect } from 'react'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import grey from '@material-ui/core/colors/grey'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import { Menu, MenuItem, TablePagination } from '@material-ui/core'

import ChecklistFilter from '../components/ChecklistFilter'
import { i18n } from '../i18n'
import { fetchChecklist } from '../api/checklist'
import Schedules from './Schedules'
import ScheduleForm from './ScheduleForm'
import Loading from '../components/Loading'
i18n.initialise()
export default function CheckLists() {
    return <CenteredTabs />
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '1rem',
    },
    tabs: {
        background: grey[100],
    },
    tab: {
        margin: '2rem',
    },
})

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

interface IChecklist {
    name: string
    schedule: any
    actions: any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function ChecklistTemplates() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ fontWeight: 'bold' }}>
                    {i18n.t('checklist_temp')}
                </Typography>
                <Typography>&nbsp;/ {i18n.t('health_and_safety')}</Typography>
            </div>
        </div>
    )
}

/**
 * Table
 */

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'white',
        },
        body: {
            fontSize: 14,
        },
    })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)(TableRow)

function createData(
    name: string,
    schedule: React.ReactNode,
    actions: React.ReactNode
) {
    return {
        name,
        schedule,
        actions,
    }
}

const redTheme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
    },
})

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
            main: grey[500],
        },
    },
})

export interface ICheckListData {
    title: string
    schedules: number
    template?: string
    status?: string
    adhoc: boolean
}

function CheckListsTable({ setTab }: any) {
    const mockData: ICheckListData[] = [
        {
            title: '1Place Standard Centre Closing Procedure // v1.1',
            schedules: 3,
            template: 'form',
            status: 'inactive',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.2',
            schedules: 4,
            template: 'form',
            status: 'active',
            adhoc: false,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.3',
            schedules: 5,
            template: 'partner',
            status: 'active',
            adhoc: false,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.4',
            schedules: 1,
            template: 'form',
            status: 'inactive',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.5',
            schedules: 8,
            template: 'form',
            status: 'inactive',

            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.6',
            schedules: 9,
            template: 'partner',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.7',
            schedules: 11,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.8',
            schedules: 2,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.9',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.10',
            schedules: 8,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.11',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.12',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.13',
            schedules: 6,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.14',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.15',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.16',
            schedules: 4,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
    ]
    const [checkLists, setCheckLists] = useState<IChecklist[]>()
    const processRows = (data: ICheckListData[]) => {
        setPage(0)
        const createdRows = data.map(({ title, schedules, adhoc }) => {
            return createData(
                title,
                <ThemeProvider theme={redTheme}>
                    <Button variant="outlined" color="primary" size="small">
                        {schedules}
                    </Button>
                </ThemeProvider>,
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ThemeProvider theme={adhoc ? blueTheme : greyTheme}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ textTransform: 'none', color: 'white' }}
                        >
                            {i18n.t('start')}
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={blueTheme}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ textTransform: 'none' }}
                        >
                            {i18n.t('edit')}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ textTransform: 'none' }}
                            id="menu-btn"
                            aria-controls="menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            data-testid="btn-more"
                        >
                            {i18n.t('more')}
                        </Button>
                    </ThemeProvider>
                </div>
            )
        })
        setCheckLists(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const menuRef = useRef(null)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = useState(0)
    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const lists = await fetchChecklist()
            console.log('lists', lists)
            processRows(lists)
            // processRows(mockData)
            setLoading(false)
        } catch (error) {
            console.log('failed to get checklist')
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

    const handleTabChange = (page: number) => {
        return setTab(page ?? 0)
    }

    return (
        <>
            {checkLists && (
                <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                    <ChecklistFilter
                        mockData={mockData}
                        processRows={processRows}
                    />
                    <Table
                        data-testid="checklist-table"
                        role="table"
                        size="small"
                    >
                        <TableHead>
                            <TableRow role="rowheader">
                                <StyledTableCell role="columnheader">
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('checklist_name')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role="columnheader"
                                    align="center"
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('current_schedules')}
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
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                ref={menuRef}
                                MenuListProps={{
                                    'aria-labelledby': 'menu-btn',
                                }}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={() => handleTabChange(2)}>
                                    {i18n.t('schedule')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('survey')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('versions')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('settings')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('copy')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('delete')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('deactivate')}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    {i18n.t('print_pdf')}
                                </MenuItem>
                            </Menu>
                            {checkLists &&
                                checkLists
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <StyledTableRow key={index} role="row">
                                            <StyledTableCell role="cell">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                role="cell"
                                                align="center"
                                            >
                                                {row.schedule}
                                            </StyledTableCell>
                                            <StyledTableCell role="cell">
                                                {row.actions}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                        </TableBody>
                    </Table>
                    {checkLists && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component="div"
                            count={checkLists.length}
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

function CenteredTabs() {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const tabs = [
        'Checklist Templates',
        'To-Do List',
        'Schedules & Surveys',
        'Register',
        'Settings',
    ]

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    className={classes.tabs}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={
                                <Typography style={{ textTransform: 'none' }}>
                                    {tab}
                                </Typography>
                            }
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Paper>
            <Paper className={classes.tab} style={{ minHeight: '710px' }}>
                <TabPanel value={value} index={0}>
                    <ChecklistTemplates />
                    <CheckListsTable setTab={setValue} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography>To-Do List</Typography>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* <Typography>Schedules & Surveys</Typography> */}
                    <Schedules />
                    {/* <ScheduleForm /> */}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Typography>Register</Typography>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Typography>Settings</Typography>
                </TabPanel>
            </Paper>
        </div>
    )
}
