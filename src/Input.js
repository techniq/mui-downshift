import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiInput from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Clear from '@material-ui/icons/Clear';

const variantComponent = {
  standard: MuiInput,
  filled: FilledInput,
  outlined: OutlinedInput,
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.labelRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.variant === 'outlined') {
      this.labelNode = ReactDOM.findDOMNode(this.labelRef.current);
      this.forceUpdate();
    }
  }

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
    const { inputRef, getInputProps, loading, downshiftProps, variant } = this.props;
    const { label, labelProps, disabled, required, error, helperText, ...inputProps } = getInputProps
      ? getInputProps({
          ...downshiftProps,
          inputRef: this.input,
          handleClearSelection: this.handleClearSelection,
          handleToggleMenu: this.handleToggleMenu,
        })
      : {};

    const shrink =
      downshiftProps.isOpen ||
      downshiftProps.inputValue ||
      inputProps.startAdornment ||
      (labelProps && labelProps.shrink)
        ? true
        : undefined;
    const InputMore = {};
    if (variant === 'outlined') {
      if (typeof shrink !== 'undefined') {
        InputMore.notched = shrink;
      }
      InputMore.labelWidth = (this.labelNode && this.labelNode.offsetWidth) || 0;
    }
    const InputComponent = variantComponent[variant];

    return (
      <FormControl disabled={disabled} required={required} error={error} fullWidth>
        {label && (
          <InputLabel
            ref={this.labelRef}
            variant={variant}
            shrink={shrink}
            {...downshiftProps.getLabelProps()}
            {...labelProps}
          >
            {label}
          </InputLabel>
        )}
        <InputComponent
          inputRef={input => {
            this.input = input;
            inputRef && inputRef(input);
          }}
          endAdornment={
            !disabled && (
              <InputAdornment position="end">
                {!!downshiftProps.selectedItem && (
                  <IconButton onClick={this.handleClearSelection} aria-label="Clear selection">
                    <Clear />
                  </IconButton>
                )}
                <IconButton onClick={this.handleToggleMenu} aria-label="Toggle menu open">
                  {downshiftProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
              </InputAdornment>
            )
          }
          onFocus={downshiftProps.openMenu}
          {...InputMore}
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
