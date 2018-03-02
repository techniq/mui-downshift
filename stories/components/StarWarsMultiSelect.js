import React, { Component } from 'react';
import { all as starwarsNames } from 'starwars-names';
import Chip from 'material-ui/Chip';

import MuiDownshift from '../../src';

const items = starwarsNames.map((text, value) => ({ text, value }));

const CustomInput = ({ selectedItems, removeItem, ...props }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      { selectedItems && selectedItems.map(i => (
        <Chip label={i.text} key={i.value} onDelete={() => removeItem(i)} style={{ marginRight: 4, marginBottom: 4 }}/>
      ))}

      <input {...props} style={{ display: 'inline-block', flexGrow: 1, minWidth: 105, width: 'auto' }} />
    </div>
  )
}

export default class StarWarsMultiSelect extends Component {
  state = {
    inputValue: '',
    filteredItems: items,
    selectedItems: [],
  }

  handleStateChange = changes => {
    console.log('handleStateChange', changes)
    if (changes.hasOwnProperty('inputValue')) {
      if (changes.hasOwnProperty('isOpen') && !changes.isOpen) {
        this.setState({ inputValue: '', filteredItems: items })
      } else {
        const filteredItems = items.filter(
          item => item.text.toLowerCase().includes(changes.inputValue.toLowerCase())
        );
        this.setState({ inputValue: changes.inputValue, filteredItems })
      }
    }
  }

  // handleInputValueChange = inputValue => {
  //   // console.log('handleInputValueChange', inputValue)
  //   if (inputValue) {
  //     const filteredItems = items.filter(
  //       item => item.text.toLowerCase().includes(inputValue.toLowerCase())
  //     );
  //     this.setState({ filteredItems })
  //   }
  // }

  handleChange = (selectedItem, downshift) => {
    this.setState(prevState => {
      let selectedItems;
      if (selectedItem == null) {
        // Clear all items
        console.log('clearing all items');
        selectedItems = [];
        // this.clearItems();
      } else if (this.state.selectedItems.includes(selectedItem)) {
        // Remove item
        console.log('removing item');
        selectedItems = prevState.selectedItems.filter(i => i !== selectedItem);
        // this.removeItem(selectedItem);
      } else {
        // Add item
        console.log('adding item');
        selectedItems = [...prevState.selectedItems, selectedItem];
        // this.addItem(selectedItem);
      }

      if (this.props.onChange) {
        this.props.onChange(selectedItems);
      }

      // console.log('resetting downshift');
      // downshift.reset();

      console.log('new state', selectedItems);
      return { selectedItems };
    });
  }

  // handleChange = selectedItem => {
  //   if (this.state.selectedItems.includes(selectedItem)) {
  //     this.removeItem(selectedItem)
  //   } else {
  //     this.addSelectedItem(selectedItem)
  //   }
  // }

  // addItem = item => {
  //   this.setState(prevState => ({
  //     selectedItems: [...prevState.selectedItems, item],
  //   }))
  // }

  removeItem = item => {
    this.setState(prevState => {
      return {
        selectedItems: prevState.selectedItems.filter(i => i !== item),
      }
    })
  }

  // clearItems = () => this.setState({ selectedItems: [] })

  // itemToString = item => {
  //   if (Array.isArray(item)) {
  //     // return item.map(this.itemToString).join(', ');
  //     return `${item.length} selected`;
  //   } else {
  //     return item ? item.text : ''
  //   }
  // }

  render() {
    const { onChange, ...props } = this.props; // Do not pass `onChange` directly to MuiDownshift (called within on `onChange`)
    const { inputValue, filteredItems, selectedItems } = this.state;

    return (

      <MuiDownshift
        items={filteredItems}
        selectedItem={null}
        inputValue={inputValue}

        getInputProps={() => ({
          label: 'Star Wars character',
          labelProps: {
            shrink: true,
          },
          placeholder: 'Choose wisely',
          inputComponent: CustomInput,
          inputProps: {
            selectedItems,
            removeItem: this.removeItem
          }
        })}

        breakingChanges={{
          resetInputOnSelection: true
        }}

        // itemToString={this.itemToString}
        onStateChange={this.handleStateChange}
        // onInputValueChange={this.handleInputValueChange}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}