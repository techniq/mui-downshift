import React, { Component } from 'react';
import { all as starwarsNames } from 'starwars-names';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MuiDownshift from '../../src';

const items = starwarsNames.map((label, value) => ({ label, value }));

const styles = theme => ({
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
});

class StarWarsMultiSelect extends Component {
  state = {
    inputValue: '',
    filteredItems: items,
    selectedItems: [],
  };

  handleChange = (item, downshiftProps) => {
    this.setState(state => {
      const selectedItems = [...state.selectedItems, item];

      if (this.props.onChange) {
        this.props.onChange(selectedItems);
      }

      downshiftProps.openMenu();

      return {
        inputValue: '',
        selectedItems,
        filteredItems: items,
      };
    });
  };

  handleInputChange = event => {
    const { value } = event.target;
    const filteredItems = items.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));

    this.setState({
      filteredItems,
      inputValue: value,
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItems = [...state.selectedItems];
      selectedItems.splice(selectedItems.indexOf(item), 1);
      return { selectedItems };
    });
  };

  inputProps = () => ({
    onChange: this.handleInputChange,
    startAdornment: this.state.selectedItems.map(item => (
      <Chip
        key={item.value}
        tabIndex={-1}
        label={item.label}
        className={this.props.classes.chip}
        onDelete={this.handleDelete(item)}
      />
    )),
    endAdornment: null,
  });

  getListItem = ({ getItemProps, item }) => (
    <ListItem button {...getItemProps()} disabled={this.state.selectedItems.indexOf(item) !== -1}>
      <ListItemText primary={item.primary || item.label} secondary={item.secondary} />
    </ListItem>
  );

  render() {
    const { filteredItems, inputValue } = this.state;
    const { onChange, ...props } = this.props; // eslint-disable-line no-unused-vars

    return (
      <MuiDownshift
        getInputProps={this.inputProps}
        getListItem={this.getListItem}
        inputValue={inputValue}
        items={filteredItems}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export default withStyles(styles)(StarWarsMultiSelect);
