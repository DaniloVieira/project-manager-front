import React from "react";
import { Grid, TextField as InputText } from "@material-ui/core";
import InputContainer from "../shared/InputContainer";

const TextField = props => {

    const {id, label, value, size, ...rest} = props

    return (
        <InputContainer size={size}>
          <InputText
            id={id}
            label={label}
            margin='dense'
            fullWidth
            size='small'
            value={value}            
            {...rest}
            />
        </InputContainer>
    )
}

export default TextField;