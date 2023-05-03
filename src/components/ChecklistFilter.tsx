import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Typography,
} from '@material-ui/core'
import {
    ThemeProvider,
    makeStyles,
    createTheme,
} from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import lightGreen from '@material-ui/core/colors/lightGreen'
import { Search, Add } from '@material-ui/icons'

import { i18n } from '../i18n'
import { useContext, useState } from 'react'
import FeatureFlagsContext from '../feature/featureContext'
i18n.initialise()

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '20vw',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        height: '10vh',
    },
    inputLabel: {
        fontSize: '4vh',
        alignSelf: 'center',
    },
}))

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[500],
        },
    },
})

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[600],
        },
    },
})

interface PChecklistFilter {
    checklist: any
    processRows: any
}

const ChecklistFilter = ({ checklist, processRows }: PChecklistFilter) => {
    const featureFlags = useContext(FeatureFlagsContext).features
    const [filter, setFilter] = useState({
        template: 'all',
        status: 'all',
    })
    const handleChange = (e: any) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        filterChecklist()
    }

    function filterArray(array: [], filters: any) {
        const filterKeys = Object.keys(filters)
        return array.filter((item) => {
            return filterKeys.every((key) => {
                if (typeof filters[key] !== 'function') return true
                return filters[key](item[key])
            })
        })
    }

    const filters = {
        template: (template: string) =>
            !filter.template ||
            filter.template === 'all' ||
            template === filter.template,
        status: (status: string) =>
            !filter.status ||
            filter.status === 'all' ||
            status === filter.status,
    }

    const filterChecklist = () => {
        const filtered = filterArray(checklist, filters)
        processRows(filtered)
    }

    const classes = useStyles()
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'baseline',
                padding: '.5rem',
            }}
        >
            {featureFlags?.partnerPortal ? (
                <FormControl variant="standard" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                        Form Template Types
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter.template}
                        label="All"
                        name="template"
                        onChange={handleChange}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            getContentAnchorEl: null,
                        }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="form">Form Templates</MenuItem>
                        <MenuItem value="partner">
                            Partner Provided Form Templates
                        </MenuItem>
                    </Select>
                </FormControl>
            ) : null}
            <FormControl variant="standard" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                    Status Filter
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.status}
                    label="All"
                    name="status"
                    onChange={handleChange}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                    }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
            </FormControl>
            <ThemeProvider theme={greyTheme}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        color: 'white',
                    }}
                    size="large"
                    type="submit"
                >
                    <Search fontSize="small" />
                    <Typography style={{ fontWeight: 'bold' }} variant="body2">
                        {i18n.t('search')}
                    </Typography>
                </Button>
            </ThemeProvider>
            <div
                style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flex: 1,
                    textAlignLast: 'end',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="caption">
                        Create new{' '}
                        <span style={{ textTransform: 'lowercase' }}>
                            {i18n.t('customLabel_checklist')}
                        </span>{' '}
                        template in this folder:
                    </Typography>
                    <div>
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    color: 'white',
                                }}
                            >
                                <Add fontSize="small" />
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body2"
                                >
                                    {i18n.t('new_temp')}
                                </Typography>
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ChecklistFilter
