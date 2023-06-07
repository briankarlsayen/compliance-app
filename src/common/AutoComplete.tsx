import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import TextField from '@material-ui/core/TextField/TextField'
import { FilterOptionsState } from '@material-ui/lab'

import {
    Typography,
    withStyles,
    Theme,
    createStyles,
    WithStyles,
} from '@material-ui/core'

const styles = (_theme: Theme) =>
    createStyles({
        mandatoryField: {
            color: _theme.palette.secondary.main,
        },
    })

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface IAutoCompleteProps extends WithStyles<typeof styles> {
    id: string
    items: any[]
    selectedItems: any[]
    itemKey: string | number
    itemLabel: string
    getOptionDisabled?: (option: any) => boolean
    getOptionSelected?: (option: any, value: any) => boolean
    getOptionLabel?: (option: any) => string
    fieldLabel?: string
    onChange: (event: React.ChangeEvent<any>, newValue: any[]) => void
    required?: boolean
    multiple?: boolean
    style?: React.CSSProperties
    disabled?: boolean
    selectAll?: boolean
    limitTags?: number
}

export default withStyles(styles)((props: IAutoCompleteProps) => {
    const [selectedOptions, setSelectedOptions] = React.useState(
        props.selectedItems
    )
    const selectAll = props.selectAll ? props.selectAll : false
    const allSelected = props.items.length === selectedOptions.length
    const { limitTags = -1 } = props

    React.useEffect(() => {
        setSelectedOptions(props.selectedItems)
    }, [props.selectedItems])

    const handleToggleOption = (selectedOptions: any[]) => {
        setSelectedOptions(selectedOptions)
    }

    const handleClearOptions = () => {
        setSelectedOptions([])
    }

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedOptions(props.items)
        } else {
            handleClearOptions()
        }
    }

    const handleToggleSelectAll = () => {
        handleSelectAll && handleSelectAll(!allSelected)
    }
    const filter = createFilterOptions()
    const handleChange = (
        event: React.ChangeEvent<any>,
        selectedOptions: any[],
        reason: string
    ) => {
        if (reason === 'select-option' || reason === 'remove-option') {
            if (
                selectedOptions.find(
                    (option) => option[props.itemKey] === 'select-all'
                )
            ) {
                handleToggleSelectAll()
                let result = []
                result = props.items.filter(
                    (el) => el[props.itemKey] !== 'select-all'
                )
                return props.onChange(event, result)
            } else {
                handleToggleOption && handleToggleOption(selectedOptions)
                return props.onChange(event, selectedOptions)
            }
        } else if (reason === 'clear') {
            handleClearOptions && handleClearOptions()
        }
    }

    const getOptionSelected = (option: any, value: any): boolean => {
        if (props.getOptionSelected) {
            return props.getOptionSelected(option, value)
        } else {
            return option[props.itemKey] === value[props.itemKey]
        }
    }

    const getOptionLabel = (option: any): string => {
        if (props.getOptionLabel) {
            return props.getOptionLabel(option)
        } else {
            return option[props.itemLabel]
        }
    }

    return (
        <Autocomplete
            size="small"
            fullWidth={true}
            disabled={!!props.disabled}
            onChange={handleChange}
            limitTags={limitTags}
            filterOptions={(
                options: any[],
                state: FilterOptionsState<any>
            ): any[] => {
                if (props.items.length > 0 && selectAll) {
                    const filtered = filter(options, state)
                    let selectAllOption: any = {}
                    selectAllOption[props.itemLabel] = 'Select All'
                    selectAllOption[props.itemKey] = 'select-all'

                    return [selectAllOption, ...filtered]
                } else if (props.items.length > 0) {
                    const filtered = filter(options, state)
                    return [...filtered]
                } else if (props.items.length === 0) {
                    const filteredList = filter(options, state)
                    return [...filteredList]
                } else {
                    return []
                }
            }}
            multiple={props.multiple || true}
            id={props.id}
            options={props.items}
            getOptionDisabled={props.getOptionDisabled}
            getOptionSelected={getOptionSelected}
            value={selectedOptions}
            getOptionLabel={getOptionLabel}
            disableCloseOnSelect
            renderOption={(option, { selected }) => {
                const selectAllProps =
                    props.items.length > 0 &&
                    option[props.itemKey] === 'select-all' // To control the state of 'select-all' checkbox
                        ? { checked: allSelected }
                        : {}
                return (
                    <>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            color="primary"
                            {...selectAllProps}
                        />
                        <Typography>{option[props.itemLabel]}</Typography>
                    </>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.fieldLabel}
                    InputLabelProps={{
                        className: props.required
                            ? props.classes.mandatoryField
                            : '',
                        shrink: true,
                    }}
                    placeholder=""
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    required={!!props.required}
                />
            )}
        />
    )
})
