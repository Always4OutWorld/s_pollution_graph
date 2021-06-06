import React from 'react';
import {
    InputLabel,
    Select,
    MenuItem,
  } from '@material-ui/core';

const SelectField = ({
    options,
    label = '',
    value = null,
    onChange = () => {},
    error="",
    name = ''
}) => {
    return (
        <div>
        {label && (
          <InputLabel shrink>
            {label}
          </InputLabel>
        )}
        <Select
          fullWidth
          value={value}
          onChange={onChange}
          name={name}
        >
          {(options || []).map((option, idx) => (
            <MenuItem
              key={idx}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <p className="errortext">{error}</p>
      </div>
    );
}

export default SelectField;