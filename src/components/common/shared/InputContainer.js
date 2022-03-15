import React from "react";
import { Grid } from "@material-ui/core";

const InputContainer = props => {
    const {size} = props;
        return (
            <Grid item xs={size}>
                {props.children}
            </Grid>
    )
}
export default InputContainer;