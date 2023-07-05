import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    addButton: {
        marginTop: theme.spacing(2),
    },
}))

const MultiSelectInput = () => {
    const classes = useStyles()
    const [selectedValues, setSelectedValues] = useState([])
    const [newOption, setNewOption] = useState('')

    const handleSelectChange = (event) => {
        setSelectedValues(event.target.value)
    }

    const handleAddOption = () => {
        if (newOption.trim() !== '') {
            setSelectedValues([...selectedValues, newOption])
            setNewOption('')
        }
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Selected Options</InputLabel>
                <Select
                    multiple
                    value={selectedValues}
                    onChange={handleSelectChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {selectedValues.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="New Option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
            />
            <Button
                className={classes.addButton}
                variant="contained"
                color="primary"
                onClick={handleAddOption}
            >
                Add
            </Button>
        </div>
    )
}

export default MultiSelectInput
