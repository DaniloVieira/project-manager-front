import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import InputContainer from "../shared/InputContainer";

const DatePicker = (props) => {
  const {id, dtLabel, value, size, ...rest } = props;

  return (
    <InputContainer size={size}>
        <KeyboardDatePicker
            variant="inline"
            disableToolbar
            autoOk
            id={id}
            label={dtLabel}
            value={value}
            onError={console.log}
            {...rest}
            style={{ paddingRight: 10, paddingTop: 6 }}
            invalidDateMessage={null}
            clearable={`true`}
        />
    </InputContainer>
  );
};

export default DatePicker;
