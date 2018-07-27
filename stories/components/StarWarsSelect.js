import React, { Component } from 'react';
import { all as starwarsNames } from 'starwars-names';
import MuiDownshift from '../../src';

const items = starwarsNames.map((label, value) => ({ label, value }));

export default class StarWarsSelect extends Component {
  state = {
    filteredItems: items,
  };

  handleStateChange = changes => {
    if (typeof changes.inputValue === 'string') {
      const filteredItems = items.filter(item => item.label.toLowerCase().includes(changes.inputValue.toLowerCase()));
      this.setState({ filteredItems });
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
      />
    );
  }
}
