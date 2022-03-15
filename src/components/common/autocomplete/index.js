import { Grid} from "@material-ui/core";
import { Autocomplete as AutoComplete } from "@material-ui/lab";
import React from "react";
import TextField from "../textField";


const Autocomplete = props => {

    const {id, label, options, onChange, size, multiple, ...rest} = props

    return (
        <Grid item xs={size}>
          <AutoComplete
            multiple={multiple}
            id={id}
            onChange={onChange}
            options={options}
            size="small"
            getOptionLabel={(option) => option.label}  
            {...rest}          
            renderInput={(params) => (
              <TextField {...{params, label, size:`auto`}} />
            )}
          />
        </Grid>

    )
}

export default Autocomplete;