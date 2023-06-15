import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectMui,
} from "@material-ui/core";

interface ISelectProps {
  value: string | number;
  items: any[];
  itemValueKey: string;
  itemLabelKey: string;
  onChange: (newValue: any) => void;
  id: string;

  showDefaultOption?: boolean;
  defaultOptionValue?: string | number;
  defaultOptionLabel?: string;

  label?: string;
  style?: any;
  disabled?: boolean;
  required?: boolean;
}
const Select = (props: ISelectProps) => {
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth={true}
      required={!!props.required}
      disabled={props.disabled}
    >
      <InputLabel id={props.id + "-label"}>{props.label || ""}</InputLabel>
      <SelectMui
        id={props.id}
        labelId={props.id + "-label"}
        label={props.label}
        value={props.value}
        //onChange={(event) => props.onChange(event.target)}
        //sending the entity instead of value only
        onChange={(event: any) => {
          const newItem = props.items.find(
            (item) => item[props.itemValueKey] === event.target.value
          );
          props.onChange(newItem);
        }}
        style={props.style || {}}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {props.showDefaultOption && (
          <MenuItem value={props.defaultOptionValue || -1}>
            {props.defaultOptionLabel || "[ Select ]"}
          </MenuItem>
        )}
        {props.items.map((item, idx) => (
          <MenuItem
            value={item[props.itemValueKey]}
            key={item[props.itemValueKey]}
          >
            {item[props.itemLabelKey]}
          </MenuItem>
        ))}
      </SelectMui>
    </FormControl>
  );
};
export default Select;
