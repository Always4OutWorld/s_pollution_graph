import React from 'react';
import {
   TextField
  } from '@material-ui/core';
import moment from 'moment';

const CommonTextField = ({
    label = '',
    type = 'date',
    value,
    onChange = () => {},
    name,
}) => {
    return (
        <TextField
            fullWidth
            id="date"
            label={label}
            name={name}
            type={type}
            value={value}
            defaultValue={moment().format("YYYY-MM-DD")}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onChange}
        />
    );
}

export default CommonTextField;