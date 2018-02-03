import React from 'react';

import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MuiInput, { InputLabel, InputAdornment } from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';

import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import Cancel from 'material-ui-icons/Cancel';

function Input({ getInputProps, loading, downshiftProps }) {
  const { label, labelProps, disabled, ...inputProps} = getInputProps ? getInputProps(downshiftProps) : {}

  return (
    <FormControl disabled={disabled} fullWidth>
      <InputLabel {...labelProps}>{label}</InputLabel>

      <MuiInput
        endAdornment={
          <InputAdornment position="end">
            { !disabled && !!downshiftProps.selectedItem && (
              <IconButton onClick={downshiftProps.clearSelection}>
                <Cancel />
              </IconButton>
            )}
    
            { !disabled && (
              <IconButton onClick={downshiftProps.toggleMenu}>
                {downshiftProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
              </IconButton>
            )}
          </InputAdornment>
        }

        {...downshiftProps.getInputProps(inputProps)}
      />

      { loading && (
        <LinearProgress style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2
        }}/>
      )}
    </FormControl>
  );
}

export default Input;
