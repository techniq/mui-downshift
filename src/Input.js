import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiInput from '@material-ui/core/Input';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Clear from '@material-ui/icons/Clear';

class Input extends Component {
  handleClearSelection = e => {
    const { downshiftProps, focusOnClear } = this.props;
    downshiftProps.clearSelection();

    if (focusOnClear) {
      this.input.focus();
    }
  };

  handleToggleMenu = e => {
    const {
      downshiftProps: { isOpen, openMenu, closeMenu },
    } = this.props;

    if (!isOpen) {
      this.input.focus();
      openMenu();
    } else {
      closeMenu();
    }
  };

  render() {
    const { inputRef, getInputProps, loading, downshiftProps } = this.props;
    const { label, labelProps, disabled, required, error, helperText, ...inputProps } = getInputProps
      ? getInputProps(downshiftProps)
      : {};

    return (
      <FormControl disabled={disabled} required={required} error={error} fullWidth>
        {label && (
          <InputLabel shrink={downshiftProps.isOpen || downshiftProps.inputValue ? true : undefined} {...labelProps}>
            {label}
          </InputLabel>
        )}
        <MuiInput
          inputRef={input => {
            this.input = input;
            inputRef && inputRef(input);
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
              position: 'relative',
              bottom: 2,
              height: 2,
              marginBottom: -2,
            }}
          />
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

export default Input;
