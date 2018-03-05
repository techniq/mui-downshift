import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MuiInput, { InputLabel, InputAdornment } from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import Clear from 'material-ui-icons/Clear';

class Input extends Component {
  handleClearSelection = e => {
    this.props.downshiftProps.clearSelection();

    // Hack to fix issue #9
    this.input.focus();
    // this.input.blur();
  };

  handleToggleMenu = e => {
    const { downshiftProps: { isOpen, openMenu, closeMenu } } = this.props;

    if (!isOpen) {
      this.input.focus();
      openMenu();
    } else {
      closeMenu();
    }
  };

  render() {
    const { getInputProps, loading, downshiftProps } = this.props;
    const { label, labelProps, disabled, ...inputProps } = getInputProps ? getInputProps(downshiftProps) : {};

    return (
      <FormControl disabled={disabled} fullWidth>
        {label && <InputLabel {...labelProps}>{label}</InputLabel>}

        <MuiInput
          inputRef={input => {
            this.input = input;
          }}
          endAdornment={
            !disabled && (
              <InputAdornment position="end">
                {!!downshiftProps.selectedItem && (
                  <IconButton onClick={this.handleClearSelection}>
                    <Clear />
                  </IconButton>
                )}

                <IconButton onClick={this.handleToggleMenu}>
                  {downshiftProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
              </InputAdornment>
            )
          }
          inputProps={{
            onFocus: downshiftProps.openMenu,
          }}
          {...downshiftProps.getInputProps(inputProps)}
        />

        {loading && (
          <LinearProgress
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
            }}
          />
        )}
      </FormControl>
    );
  }
}

export default Input;
