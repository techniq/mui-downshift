import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';
import { List as VirtualList, InfiniteLoader, AutoSizer } from 'react-virtualized';

const LIST_ITEM_HEIGHTS = {
  default: 48,
  withAvatar: 56,
  withSecondaryText: 72
};

function hasProp(obj, props) {
  if (Array.isArray(props)) {
    return props.some(prop => prop in obj && obj[prop]);
  } else {
    return props in obj && obj[props]
  }
}

function getHeight({ items, getListItemProps, getEmptyListItemProps, menuItemCount }) {
  if (items && items.length) {
    const length = Math.min(items.length, menuItemCount); // Maximum items before scrolling
    const height = items.slice(0, length).reduce((result, item, index) => {
      const listItemProps = getListItemProps({ item, index });
      return (result += getItemHeight(listItemProps));
    }, 0);
    return height;
  } else if (getEmptyListItemProps) {
    const emptyListItemProps = getEmptyListItemProps();
    return getItemHeight(emptyListItemProps);
  } else {
    // No `items` and no `getEmptyListItemProps` defined
    return 0;
  }
}

function getItemHeight(listItemProps) {
  // Finds the largest height an item can be based on its props
  if (hasProp(listItemProps, 'secondaryText')) {
    return LIST_ITEM_HEIGHTS.withSecondaryText
  } else if (hasProp(listItemProps, ['leftAvatar', 'rightAvatar'])) {
    return LIST_ITEM_HEIGHTS.withAvatar
  } else {
    return LIST_ITEM_HEIGHTS.default
  }
}

class Menu extends Component {
  render() {
    const {
      items,
      itemCount,
      loadMoreItems,
      highlightedIndex,
      selectedItem,
      isOpen,
      getItemProps,
      getListItemProps,
      getEmptyListItemProps,
      menuHeight
    } = this.props;

    const rowCount = itemCount || (items ? items.length : 0);

    // console.log('rowCount', rowCount);

    function isRowLoaded ({ index }) {
      // console.log('isRowLoaded', index);
      return !!items[index];
    }
    
    function loadMoreRows ({ startIndex, stopIndex }) {
      // console.log('loadMoreRows', startIndex, stopIndex);
      return loadMoreItems(startIndex, stopIndex);
    }

    return isOpen ? (
      <AutoSizer>
        {({ width }) => (
          <Paper style={{ width }} transitionEnabled={false}>
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount}
            >
              {({ onRowsRendered, registerChild }) => (
                <VirtualList
                  width={width}
                  //scrollToIndex={highlightedIndex} // TODO: Mouse scrolling causes weird issue currently.  Seems to be related to `rowHeight` being a function `rowHeight={48}` works fine
                  height={menuHeight || getHeight(this.props)}
                  rowCount={items ? items.length : 0}
                  rowHeight={({ index }) => {
                    const item = items[index];
                    const listItemProps = getListItemProps({ item, index });
                    const height = getItemHeight(listItemProps);
                    return height;
                  }}
                  rowRenderer={({ index, style, key }) => {
                    const item = items[index];
                    const listItemProps = getListItemProps({ item, index, highlightedIndex, selectedItem, style })
                    const props = getItemProps({
                      index,
                      item,
                      isKeyboardFocused: highlightedIndex === index,
                      style:
                        selectedItem === item
                          ? { fontWeight: 'bold', ...style }
                          : style,
                      ...listItemProps
                    });

                    return <ListItem key={key} {...props} />;
                  }}
                  noRowsRenderer={() => <ListItem {...getEmptyListItemProps()} /> }
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                />
              )}
            </InfiniteLoader>
          </Paper>
        )}
      </AutoSizer>
    ) : null;
  }
}

export default Menu;
