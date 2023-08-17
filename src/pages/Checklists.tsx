import ChecklistFilter from '../components/ChecklistFilter'
import { i18n } from '../i18n'
import { copyTemplate, deleteTemplate, fetchChecklist } from '../api/checklist'
import Schedules from './Schedules'
import Loading from '../components/Loading'
import FeatureFlagsContext from '../feature/featureContext'

import React, { useState, useRef, useEffect, useContext } from 'react'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles
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
import { Link } from 'react-router-dom'
import Register from './Register'

i18n.initialise()
export default function CheckLists() {
    return (
        <div>
            <ChecklistTemplates />
            <CheckListsTable />
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '1rem'
    },
    tabs: {
        background: grey[100]
    },
    tab: {
        marginTop: '2rem'
    }
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
            role='tabpanel'
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
        'aria-controls': `simple-tabpanel-${index}`
    }
}

function ChecklistTemplates() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ fontWeight: 'bold' }}>
                    {i18n.t('customLabel_checklist')}
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
    name: string,
    schedule: React.ReactNode,
    actions: React.ReactNode
) {
    return {
        name,
        schedule,
        actions
    }
}

const redTheme = createTheme({
    palette: {
        primary: {
            main: red[500]
        }
    }
})

const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        }
    }
})

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[500]
        }
    }
})

export interface ICheckListData {
    id: number
    name: string
    schedules: number
    template?: string
    recStatus: string
    adhoc: boolean
}

function CheckListsTable({ setTab }: any) {
    const featureFlags = useContext(FeatureFlagsContext).features
    const [checkLists, setCheckLists] = useState<IChecklist[]>()
    const [selectedId, setSelectId] = useState<number | null>(null)
    const processRows = (data: ICheckListData[]) => {
        setPage(0)
        const createdRows = data.map(
            ({ id, name, schedules, adhoc, recStatus }) => {
                return createData(
                    name,
                    <ThemeProvider theme={redTheme}>
                        <Button variant='outlined' color='primary' size='small'>
                            {schedules}
                        </Button>
                    </ThemeProvider>,
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <ThemeProvider theme={adhoc ? blueTheme : greyTheme}>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                style={{
                                    textTransform: 'none',
                                    color: 'white'
                                }}
                            >
                                {i18n.t('start')}
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={blueTheme}>
                            {!featureFlags?.hideCreateChecklistTemplate && (
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    style={{ textTransform: 'none' }}
                                >
                                    {i18n.t('edit')}
                                </Button>
                            )}

                            {!featureFlags?.hideCreateChecklistSchedule && (
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    style={{ textTransform: 'none' }}
                                    id='menu-btn'
                                    aria-controls='menu'
                                    aria-haspopup='true'
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={(e) => {
                                        console.log('id', id)
                                        setSelectId(id)
                                        handleClick(e, recStatus)
                                    }}
                                    data-testid='btn-more'
                                >
                                    {i18n.t('more')}
                                </Button>
                            )}
                        </ThemeProvider>
                    </div>
                )
            }
        )
        setCheckLists(createdRows)
    }
    const DEFAULT_ROWS_PAGE = 10
    const menuRef = useRef(null)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)
    const [activeBtn, setActiveBtn] = useState(false)
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        recStatus: string
    ) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
        recStatus === 'active' ? setActiveBtn(true) : setActiveBtn(false)
    }
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE)
    const [page, setPage] = useState(0)
    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    }

    const handleDelete = async (id: number | null) => {
        if (id) {
            await deleteTemplate(id)
                .then(() => fetchData())
                .catch((error) => {
                    console.log('failed to delete', error)
                })
        }
    }
    const handleCopy = async (id: number | null) => {
        if (id) {
            await copyTemplate(id)
                .then(() => {
                    fetchData()
                })
                .catch((error) => {
                    console.log('failed to delete', error)
                    fetchData()
                })
        }
    }

    const [loading, setLoading] = useState(false)

    const [checklist, setChecklist] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true)
            const lists = await fetchChecklist()
            setChecklist(lists)
            processRows(lists)
            // processRows(mockData)
            setLoading(false)
        } catch (error) {
            console.log('failed to get checklist')
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

    return (
        <>
            {checkLists && (
                <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                    <ChecklistFilter
                        checklist={checklist}
                        processRows={processRows}
                    />
                    <Table
                        data-testid='checklist-table'
                        role='table'
                        size='small'
                    >
                        <TableHead>
                            <TableRow role='rowheader'>
                                <StyledTableCell role='columnheader'>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('checklist_name')}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    role='columnheader'
                                    align='center'
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {i18n.t('current_schedules')}
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
                            <Menu
                                id='menu'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                ref={menuRef}
                                MenuListProps={{
                                    'aria-labelledby': 'menu-btn'
                                }}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                            >
                                <MenuItem>
                                    <Link
                                        to={`/checklists/${selectedId}/schedules`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }}
                                    >
                                        {i18n.t('schedule')}
                                    </Link>
                                </MenuItem>
                                {/* <MenuItem onClick={() => handleTabChange(2)}>
                                    {i18n.t('schedule')}
                                </MenuItem> */}
                                <MenuItem>
                                    <Link
                                        to={`/checklists/${selectedId}/surveys`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }}
                                    >
                                        {i18n.t('survey')}
                                    </Link>
                                </MenuItem>
                                {!featureFlags?.hideCreateChecklistTemplate && (
                                    <MenuItem onClick={handleClose}>
                                        <Link
                                            to={`/checklists/${selectedId}/versions`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black'
                                            }}
                                        >
                                            {i18n.t('versions')}
                                        </Link>
                                    </MenuItem>
                                )}
                                {!featureFlags?.hideCreateChecklistTemplate && (
                                    <MenuItem onClick={handleClose}>
                                        <Link
                                            to={`/checklists/settings`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black'
                                            }}
                                        >
                                            {i18n.t('settings')}
                                        </Link>
                                    </MenuItem>
                                )}
                                {!featureFlags?.hideCreateChecklistTemplate && (
                                    <MenuItem
                                        onClick={() => handleCopy(selectedId)}
                                    >
                                        {i18n.t('copy')}
                                    </MenuItem>
                                )}
                                {!featureFlags?.hideCreateChecklistTemplate &&
                                    activeBtn && (
                                        <MenuItem
                                            onClick={() =>
                                                handleDelete(selectedId)
                                            }
                                        >
                                            {i18n.t('delete')}
                                        </MenuItem>
                                    )}
                                {!featureFlags?.hideCreateChecklistTemplate && (
                                    <MenuItem onClick={handleClose}>
                                        {activeBtn
                                            ? i18n.t('deactivate')
                                            : i18n.t('activate')}
                                    </MenuItem>
                                )}
                                {!featureFlags?.hideCreateChecklistTemplate && (
                                    <MenuItem onClick={handleClose}>
                                        {i18n.t('print_pdf')}
                                    </MenuItem>
                                )}
                            </Menu>
                            {checkLists &&
                                checkLists
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <StyledTableRow key={index} role='row'>
                                            <StyledTableCell role='cell'>
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                role='cell'
                                                align='center'
                                            >
                                                {row.schedule}
                                            </StyledTableCell>
                                            <StyledTableCell role='cell'>
                                                {row.actions}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                        </TableBody>
                    </Table>
                    {checkLists && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component='div'
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

    const tabs = ['Checklist Templates', 'To-Do List', 'Register', 'Settings']

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
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
                <TabPanel value={value} index={3}>
                    <Register />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Typography>Settings</Typography>
                </TabPanel>
            </Paper>
        </div>
    )
}
