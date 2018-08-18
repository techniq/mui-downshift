import React, { Component } from 'react';
import { all as starwarsNames } from 'starwars-names';
import MuiDownshift from '../../src';
import PropTypes from 'prop-types';

const items = starwarsNames.map((label, value) => ({ label, value }));

class StarWarsSelect extends Component {
  static defaultProps = {
    blurOnSelect: false,
  };

  state = {
    filteredItems: items,
  };

  handleStateChange = changes => {
    if (typeof changes.inputValue === 'string') {
      const filteredItems = items.filter(item => item.label.toLowerCase().includes(changes.inputValue.toLowerCase()));
      this.setState({ filteredItems });
    }
    if (this.input && this.props.blurOnSelect) {
      this.input.blur();
    }
  };

  render() {
    const { filteredItems } = this.state;
    return (
      <MuiDownshift
        items={filteredItems}
        onStateChange={this.handleStateChange}
        // getListItemKey={rowIndex => filteredItems[rowIndex].value}
        // keyMapper={rowIndex => filteredItems[rowIndex] && filteredItems[rowIndex].label}
        {...this.props}
        inputRef={node => {
          this.input = node;
        }}
      />
    );
  }
}

StarWarsSelect.propTypes = {
  blurOnSelect: PropTypes.bool,
};

export default StarWarsSelect;
