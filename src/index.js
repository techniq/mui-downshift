import React, { Component } from 'react';
import Downshift from 'downshift';
import { Manager, Target, Popper } from 'react-popper';

import Input from './Input';
import Menu from './Menu';

class MuiDownshift extends Component {
  static defaultProps = {
    itemToString: item => (item ? item.text : ''),
    getListItemProps: ({ item, index }) => ({
      primaryText: item ? item.text : '' // TODO: would be nice if this was `props.itemToString(item)`;
    }),
    menuItemCount: 5
  };

  state = {
    isOpen: false
  }

  handleStateChange = changes => {
    // Workaround: https://github.com/paypal/downshift/issues/164#issuecomment-326393357
    if (changes.hasOwnProperty('isOpen')) {
      setTimeout(() => {
        this.setState({ isOpen: changes.isOpen });
      });
    }

    this.props.onStateChange && this.props.onStateChange(changes);
  };

  render() {
    const {
      items,
      getInputProps,
      getListItemProps,
      getEmptyListItemProps,
      getInfiniteLoaderProps,
      getVirtualListProps,
      getFooterListItemProps,
      getRootProps,
      itemToString,
      loading,
      menuHeight,
      menuItemCount,
      onStateChange, // called in `handleStateChange` above
      ...props
    } = this.props;

    return (
      <Manager>
        <Downshift
          itemCount={items ? items.length : 0} // Needed for windowing
          itemToString={itemToString}
          onStateChange={this.handleStateChange}
          isOpen={this.state.isOpen}
          {...props}
        >
          {downshiftProps => {
            const inputProps = {
              loading: loading,
              textFieldProps: downshiftProps.getInputProps({
                ...(getInputProps && getInputProps(downshiftProps))
                //ref: node => (this.inputRef = node),
              }),
              actionButtonProps: {
                open: downshiftProps.isOpen,
                reset: !!downshiftProps.selectedItem,
                onToggleClick: () => {
                  downshiftProps.toggleMenu();
                  //this.inputRef.focus();
                },
                onCancelClick: () => {
                  downshiftProps.clearSelection();
                }
                // TODO: getActionButtonProps && getActionButtonProps(downshiftProps) ?
              }
            };

            const menuProps = {
              items,
              highlightedIndex: downshiftProps.highlightedIndex,
              selectedItem: downshiftProps.selectedItem,
              isOpen: downshiftProps.isOpen,
              getItemProps: downshiftProps.getItemProps,
              getListItemProps,
              getEmptyListItemProps,
              getInfiniteLoaderProps,
              getVirtualListProps,
              getFooterListItemProps,
              menuItemCount,
              menuHeight
            };

            return (
              <div {...getRootProps && getRootProps()}>
                <Target>
                  <Input {...inputProps} />
                </Target>

                <Menu {...menuProps} />
              </div>
            );
          }}
        </Downshift>
      </Manager>
    );
  }
}

export default MuiDownshift;
