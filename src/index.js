import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Input from './Input';
import Menu from './Menu';

class MuiDownshift extends Component {
  rootRef = React.createRef();
  render() {
    const {
      items,
      itemToString,
      getRootProps,

      // Input
      getInputProps,
      focusOnClear,
      loading,

      // Menu
      getListItem,
      getListItemKey,
      showEmpty,
      includeFooter,
      // getInfiniteLoaderProps,
      // getVirtualListProps,
      // menuHeight,
      // menuItemCount,

      ...props
    } = this.props;
    return (
      <Downshift
        itemCount={(items ? items.length : 0) + (includeFooter ? 1 : 0)} // Needed for windowing
        itemToString={itemToString}
        {...props}
      >
        {downshiftProps => (
          <div style={{ background: 'red', display: 'inline-block' }} ref={this.rootRef}>
            <Input
              getInputProps={getInputProps}
              focusOnClear={focusOnClear}
              loading={loading}
              downshiftProps={downshiftProps}
              inputRef={node => {
                this.inputRef = node;
                if (this.props.inputRef && typeof this.props.inputRef === 'function') {
                  this.props.inputRef(node);
                }
              }}
            />

            <Menu
              items={items}
              getListItem={getListItem}
              getListItemKey={getListItemKey}
              showEmpty={showEmpty}
              includeFooter={includeFooter}
              // getInfiniteLoaderProps={getInfiniteLoaderProps}
              // getVirtualListProps={getVirtualListProps}
              // menuItemCount={menuItemCount}
              // menuHeight={menuHeight}
              downshiftProps={downshiftProps}
              inputRef={this.inputRef}
              rootRef={this.rootRef}
            />
          </div>
        )}
      </Downshift>
    );
  }
}

MuiDownshift.defaultProps = {
  itemToString: item => (item ? item.label : ''),
  getListItem({ getItemProps, item, index }) {
    return item ? (
      <ListItem button {...getItemProps()}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        {item.avatar && <ListItemAvatar>{item.avatar}</ListItemAvatar>}

        <ListItemText primary={item.primary || item.label} secondary={item.secondary} />
      </ListItem>
    ) : index === 0 ? (
      <ListItem button disabled>
        <ListItemText primary={<span style={{ fontStyle: 'italic' }}>No items found</span>} />
      </ListItem>
    ) : null; // TODO: should we handle this or require user to implement `getListItem` at this point (`includeFooter` or an array of null/undefined)?
  },
  menuItemCount: 5,
  inputRef: undefined,
};

MuiDownshift.propTypes = {
  items: PropTypes.array,
  itemToString: PropTypes.func,
  selectedItem: PropTypes.object,
  getRootProps: PropTypes.func,

  // Input
  getInputProps: PropTypes.func,
  focusOnClear: PropTypes.bool,
  loading: PropTypes.bool,
  inputRef: PropTypes.func,

  // Menu
  getListItem: PropTypes.func,
  getListItemKey: PropTypes.func,
  showEmpty: PropTypes.bool,
  includeFooter: PropTypes.bool,
  // getInfiniteLoaderProps: PropTypes.func,
  // getVirtualListProps: PropTypes.func,
  // menuHeight: PropTypes.number,
  // menuItemCount: PropTypes.number,
};

export const stateChangeTypes = Downshift.stateChangeTypes;
export const resetIdCounter = Downshift.resetIdCounter;
export default MuiDownshift;
