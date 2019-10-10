import React from 'react';
import PropTypes from 'prop-types';
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

function handleClearSelection(innerInputRef, inputProps) {
  const { downshiftProps, focusOnClear } = inputProps;
  downshiftProps.clearSelection();

  if (focusOnClear) {
    innerInputRef.focus();
  }
}

function handleToggleMenu(innerInputRef, inputProps) {
  const {
    downshiftProps: { isOpen, openMenu, closeMenu },
  } = inputProps;

  if (!isOpen) {
    innerInputRef.focus();
    openMenu();
  } else {
    closeMenu();
  }
}

const Input = props => {
  const labelRef = React.useRef(null);
  const [innerInputRef, setInnerInputRef] = React.useState(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(labelRef.current ? labelRef.current.offsetWidth : 0);
  }, []);

  const { inputRef, getInputProps, loading, downshiftProps, variant } = props;
  const { label, disabled, required, error, helperText, ...inputProps } = getInputProps
    ? getInputProps({
        ...downshiftProps,
        inputRef: innerInputRef,
        handleClearSelection: () => handleClearSelection(innerInputRef, props),
        handleToggleMenu: () => handleToggleMenu(innerInputRef, props),
      })
    : {};

  const shrink = downshiftProps.isOpen || downshiftProps.inputValue || inputProps.startAdornment ? true : undefined;
  const InputMore = {};
  if (variant === 'outlined') {
    if (typeof shrink !== 'undefined') {
      InputMore.notched = shrink;
    }
    InputMore.labelWidth = labelWidth;
  }
  const InputComponent = variantComponent[variant];

  return (
    <FormControl disabled={disabled} required={required} error={error} fullWidth>
      {label && (
        <InputLabel ref={labelRef} variant={variant} shrink={shrink} {...downshiftProps.getLabelProps()}>
          {label}
        </InputLabel>
      )}
      <InputComponent
        inputRef={input => {
          setInnerInputRef(input);
          inputRef && inputRef(input);
        }}
        endAdornment={
          !disabled && (
            <InputAdornment position="end">
              {!!downshiftProps.selectedItem && (
                <IconButton onClick={() => handleClearSelection(innerInputRef, props)} aria-label="Clear selection">
                  <Clear />
                </IconButton>
              )}
              <IconButton onClick={() => handleToggleMenu(innerInputRef, props)} aria-label="Toggle menu open">
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
};

Input.propTypes = {
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  downshiftProps: PropTypes.object,
  focusOnClear: PropTypes.bool,
  inputRef: PropTypes.func,
  getInputProps: PropTypes.func,
  loading: PropTypes.bool,
};

Input.defaultProps = {
  variant: 'standard',
  downshiftProps: {},
  focusOnClear: false,
  inputRef: null,
  getInputProps: () => ({}),
  loading: false,
};

export default Input;
