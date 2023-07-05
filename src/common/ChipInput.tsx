import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import Downshift from 'downshift'

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
}))

export default function ChipInput({
    inputField,
    setInputField,
    ...props
}: any) {
    const classes = useStyles()
    const { selectedTags, placeholder, tags, ...other } = props
    const [inputValue, setInputValue] = React.useState('')
    const [selectedItem, setSelectedItem] = React.useState(['hey'])
    useEffect(() => {
        setSelectedItem(tags)
    }, [tags])
    useEffect(() => {
        selectedTags(selectedItem)
    }, [selectedItem, selectedTags])

    function handleKeyDown(event: any) {
        if (event.key === 'Enter') {
            const newSelectedItem = [...selectedItem]
            const duplicatedValues = newSelectedItem.indexOf(
                event.target.value.trim()
            )

            if (duplicatedValues !== -1) {
                setInputValue('')
                return
            }
            if (!event.target.value.replace(/\s/g, '').length) return

            newSelectedItem.push(event.target.value.trim())
            setSelectedItem(newSelectedItem)
            setInputValue('')
        }
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === 'Backspace'
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
        }
    }
    function handleChange(item: any) {
        let newSelectedItem = [...selectedItem]
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item]
        }
        setInputValue('')
        setSelectedItem(newSelectedItem)
        // setInputField({ ...inputField, toRecipients: newSelectedItem })
        // console.log('item', item)
    }

    const handleDelete = (item: any) => () => {
        const newSelectedItem = [...selectedItem]
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
        setSelectedItem(newSelectedItem)
    }

    function handleInputChange(event: any) {
        setInputValue(event.target.value)
    }
    return (
        <React.Fragment>
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={handleChange}
                selectedItem={selectedItem}
            >
                {({ getInputProps }) => {
                    const {
                        onBlur,
                        onChange,
                        onFocus,
                        color,
                        size,
                        ref,
                        ...inputProps
                    } = getInputProps({
                        onKeyDown: handleKeyDown,
                        placeholder,
                    })
                    return (
                        <div>
                            <TextField
                                {...other}
                                {...inputProps}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: selectedItem.map((item) => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={handleDelete(item)}
                                        />
                                    )),
                                    onBlur,
                                    onChange: (event) => {
                                        handleInputChange(event)
                                        onChange && onChange(event)
                                    },
                                    onFocus,
                                }}
                            />
                        </div>
                    )
                }}
            </Downshift>
        </React.Fragment>
    )
}
ChipInput.defaultProps = {
    tags: [],
}
ChipInput.propTypes = {
    selectedTags: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
}
