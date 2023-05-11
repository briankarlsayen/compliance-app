import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import TextField from '@material-ui/core/TextField/TextField'
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
}

export default withStyles(styles)((props: IAutoCompleteProps) => {
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
            onChange={props.onChange}
            multiple={props.multiple || true}
            id="auto-complete"
            options={props.items}
            getOptionDisabled={props.getOptionDisabled}
            getOptionSelected={getOptionSelected}
            value={props.selectedItems}
            getOptionLabel={getOptionLabel}
            disableCloseOnSelect
            renderOption={(option, { selected }) => (
                <>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        color="primary"
                    />
                    <Typography>{option.name}</Typography>
                </>
            )}
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
