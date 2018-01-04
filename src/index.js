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
      selectedItem,
      ...props
    } = this.props;

    return (
      <Manager>
        <Downshift
          itemCount={items ? items.length : 0} // Needed for windowing
          itemToString={itemToString}
          {...props}
        >
          {downshiftProps => {
            return (
              <div {...getRootProps && getRootProps()}>
                <Target>
                  <Input
                    getInputProps={getInputProps}
                    loading={loading}
                    downshiftProps={downshiftProps}
                  />
                </Target>

                <Menu 
                  items={items}
                  getListItemProps={getListItemProps}
                  getEmptyListItemProps={getEmptyListItemProps}
                  getInfiniteLoaderProps={getInfiniteLoaderProps}
                  getVirtualListProps={getVirtualListProps}
                  getFooterListItemProps={getFooterListItemProps}
                  menuItemCount={menuItemCount}
                  menuHeight={menuHeight}
                  downshiftProps={downshiftProps} // pass down all props to be relayed (ex. `getInfiniteLoaderProps(downshiftProps)`)
                />
              </div>
            );
          }}
        </Downshift>
      </Manager>
    );
  }
}

export default MuiDownshift;
