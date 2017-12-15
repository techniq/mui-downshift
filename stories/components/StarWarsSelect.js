import React, { Component } from 'react';
import { all as starwarsNames } from 'starwars-names';

import MuiDownshift from '../../src';

const items = starwarsNames.map((text, value) => ({ text, value }));

export default class StarWarsSelect extends Component {
  state = {
    filteredItems: items,
  }

  handleStateChange = changes => {
    if (changes.hasOwnProperty('inputValue')) {
      const filteredItems = items.filter(
        item => item.text.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems })
    }
  }

  render() {
    const { filteredItems } = this.state;
    return (
      <MuiDownshift
        items={filteredItems}
        onStateChange={this.handleStateChange}
        {...this.props}
      />
    );
  }
}