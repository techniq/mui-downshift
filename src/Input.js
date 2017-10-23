import React from 'react';

import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

function Input({ textFieldProps, actionButtonProps, loading }) {
  return (
    <div style={{ position: 'relative' }}>
      <TextField {...textFieldProps} fullWidth={true} />
      <ActionButton {...actionButtonProps} />
      {loading &&
        <LinearProgress
          style={{
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0,
            height: 2
          }}
        />}
    </div>
  );
}

function ActionButton({ reset, open, onCancelClick, onToggleClick }) {
  return reset
    ? <CancelButton onClick={onCancelClick} />
    : <ToggleButton onClick={onToggleClick} open={open} />;
}

function CancelButton(props) {
  return (
    <IconButton
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0
      }}
      {...props}
    >
      <Cancel />
    </IconButton>
  );
}

function ToggleButton({ open, ...props }) {
  return (
    <IconButton
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0
      }}
      {...props}
    >
      {open ? <ArrowDropUp /> : <ArrowDropDown />}
    </IconButton>
  );
}

export default Input;
