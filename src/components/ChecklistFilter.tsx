import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    makeStyles,
    Button,
    Typography,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'

import React from 'react'

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

const ChecklistFilter = ({ mockData, processRows }: any) => {
    const [filter, setFilter] = React.useState({
        template: '',
        status: '',
    })
    const handleChange = (e: any) => {
        const { name, value } = e.target
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
        const filtered = filterArray(mockData, filters)
        processRows(filtered)
    }

    const classes = useStyles()
    return (
        <form onSubmit={handleSubmit}>
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
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="form">Form Templates</MenuItem>
                    <MenuItem value="partner">
                        Partner Provided Form Templates
                    </MenuItem>
                </Select>
            </FormControl>
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
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
            </FormControl>
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
                    Search
                </Typography>
            </Button>
        </form>
    )
}

export default ChecklistFilter
