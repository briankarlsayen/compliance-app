import ChecklistFilter from '../components/ChecklistFilter'
import { i18n } from '../i18n'
import { copyTemplate, deleteTemplate, fetchChecklist } from '../api/checklist'
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
import { Link, useHistory, useLocation } from 'react-router-dom'
import Checklist from '../pages/Checklists'

i18n.initialise()
export default function ChecklistTab() {
    return <CenteredTabs />
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

function CenteredTabs() {
    const classes = useStyles()
    const [value, setValue] = useState('/')
    const history = useHistory()

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
        history.push(newValue)
    }

    const tabs = [
        {
            label: 'Checklist Templates',
            value: '/'
        },
        {
            label: 'To-Do List',
            value: '/todo'
        },
        {
            label: 'Register',
            value: '/register'
        },
        {
            label: 'Settings',
            value: '/settings'
        }
    ]

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                    className={classes.tabs}
                    value={value}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={
                                <Typography style={{ textTransform: 'none' }}>
                                    {tab.label}
                                </Typography>
                            }
                            value={tab.value}
                        />
                    ))}
                </Tabs>
            </Paper>
        </div>
    )
}
