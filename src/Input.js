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
  }

  handleToggleMenu = e => {
    const { downshiftProps: { toggleMenu, isOpen }} = this.props;
    
    /*
    // TODO: Focus input on toggle, but be sure to support the following use cases
    // - Works when also opening menu on input focus, ex.
          <StarWarsSelect
            getInputProps={({ openMenu }) => ({ onFocus: e => { openMenu() }
            })}
          />
        - Works without opening menu on input focus
        - Supports closing the menu when toggling close (with/without input focus opening)
    */

    // e.stopPropagation();
    // if (!isOpen) {
    // //   // Going to be opened
    //   this.input.focus();
    // }
    toggleMenu();
  }

  render() {
    const { getInputProps, loading, downshiftProps } = this.props;
    const { label, labelProps, disabled, ...inputProps } = getInputProps
      ? getInputProps(downshiftProps)
      : {};

    return (
      <FormControl disabled={disabled} fullWidth>
        <InputLabel {...labelProps}>{label}</InputLabel>

        <MuiInput
          inputRef={input => (this.input = input)}
          endAdornment={
            <InputAdornment position="end">
              {!disabled &&
                !!downshiftProps.selectedItem && (
                  <IconButton onClick={this.handleClearSelection}>
                    <Clear />
                  </IconButton>
                )}

              {!disabled && (
                <IconButton onClick={this.handleToggleMenu}>
                  {downshiftProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
              )}
            </InputAdornment>
          }
          onFocus={downshiftProps.openMenu}
          {...downshiftProps.getInputProps(inputProps)}
        />

        {loading && (
          <LinearProgress
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2
            }}
          />
        )}
      </FormControl>
    );
  }
}

export default Input;
