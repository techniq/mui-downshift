import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Clear from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiInput from '@material-ui/core/Input';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  clearButton: {
    width: 14,
    '&:hover': {
      color: theme.palette.secondary.main
    }
  }
})

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
    const { getInputProps, loading, downshiftProps, classes } = this.props;
    const { label, labelProps, disabled, required, error, helperText, ...inputProps } = getInputProps
      ? getInputProps(downshiftProps)
      : {};

    return (
      <FormControl disabled={disabled} required={required} error={error} fullWidth>
        {label && <InputLabel {...labelProps}>{label}</InputLabel>}
        <MuiInput
          inputRef={input => {
            this.input = input;
          }}
          endAdornment={
            !disabled && (
              <InputAdornment position="end">
                {!!downshiftProps.selectedItem && (
                  <IconButton onClick={this.handleClearSelection} className={classes.clearButton} tabIndex={-1}>
                    <Clear style={{ fontSize: 18 }} />
                  </IconButton>
                )}

                <IconButton onClick={this.handleToggleMenu} style={{ width: 36 }} tabIndex={-1}>
                  {downshiftProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
              </InputAdornment >
            )
          }
          inputProps={{
            onFocus: downshiftProps.openMenu,
          }}
          {...downshiftProps.getInputProps(inputProps)}
        />

        {
          loading && (
            <LinearProgress
              style={{
                position: 'relative',
                bottom: 2,
                height: 2,
                marginBottom: -2,
              }}
            />
          )
        }
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl >
    );
  }
}

export default withStyles(styles)(Input);
