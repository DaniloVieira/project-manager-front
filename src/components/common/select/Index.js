import React from "react";
import TextField from "../textField";

const Select = props => {

    const {value, options, id, label, size, ...others} = props;

    return (
        <TextField
            id={id}
            select
            label={label}
            size={4}
            value={value}
            SelectProps={{
              native: true,
            }}
            {...others}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            
          </TextField>

    )
}

export default Select;