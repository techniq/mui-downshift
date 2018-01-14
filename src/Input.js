import React from 'react';

import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import Cancel from 'material-ui-icons/Cancel';

function Input({ getInputProps, loading, downshiftProps }) {
  const textFieldProps = downshiftProps.getInputProps({ ...(getInputProps && getInputProps(downshiftProps)) })
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        fullWidth={true}
        {...textFieldProps}
      />

      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          display: 'flex'
        }}
      >
        { !textFieldProps.disabled && !!downshiftProps.selectedItem && (
          <IconButton onClick={downshiftProps.clearSelection}>
            <Cancel />
          </IconButton>
        )}

        { !textFieldProps.disabled && (
          <IconButton onClick={downshiftProps.toggleMenu}>
            {downshiftProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        )}
      </div>

      { loading && (
        <LinearProgress
          style={{
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0,
            height: 2
          }}
        />
      )}
    </div>
  );
}

export default Input;
