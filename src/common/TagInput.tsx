import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiInputBase-root': {
            flexWrap: 'wrap',
            padding: '5px',
        },
        '& .MuiChip-root': {
            marginTop: '5px',
            marginBottom: '5px',
        },
        '& input[type=text]': {
            flexGrow: 1,
            textOverflow: 'ellipsis',
            opacity: 1,
            width: '10px',
            minWidth: '30px',
            padding: '0px',
        },

        padding: '20px',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}))

const TagInput = ({
    selectedItems,
    inputField,
    setInputField,
    ...props
}: any) => {
    const classes = useStyles()
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setInputValue('')
            const newList = [...inputField.toRecipients, inputValue.trim()]
            setInputField({ ...inputField, toRecipients: newList })
        }
    }

    const handleDeleteTag = (tag: string) => {
        const updatedTags = inputField.toRecipients.filter(
            (t: string) => t !== tag
        )
        setInputField({ ...inputField, toRecipients: updatedTags })
    }

    return (
        <Stack>
            <TextField
                className={classes.root}
                variant="outlined"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
                InputProps={{
                    startAdornment: inputField.toRecipients.map(
                        (item: string) => (
                            <Chip
                                key={item}
                                tabIndex={-1}
                                label={item}
                                onDelete={() => handleDeleteTag(item)}
                            />
                        )
                    ),
                }}
            />
        </Stack>
    )
}

export default TagInput
