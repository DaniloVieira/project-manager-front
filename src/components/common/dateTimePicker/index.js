import React from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import InputContainer from "../shared/InputContainer";

const DateTimePicker = (props) => {
  const {id, dtLabel, value, size, ...rest } = props;

  return (
    <InputContainer size={size}>
        <KeyboardDateTimePicker
            autoOk
            id={id}
            label={dtLabel}
            value={value}
            ampm={false}
            onError={console.log}
            {...rest}
            style={{ paddingRight: 10, paddingTop: 6 }}
        />
    </InputContainer>
  );
};

export default DateTimePicker;
