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

function getHeight(items, menuItemCount, getListItemProps, getEmptyListItemProps) {
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

function MuiVirtualList({
  items,
  menuItemCount,
  width,
  highlightedIndex,
  selectedItem,
  getItemProps,
  getListItemProps,
  getEmptyListItemProps,
  getVirtualListProps,
  getLoadMoreListItemProps,
  menuHeight,
  onRowsRendered,
  registerChild
}) {
  const loadMoreListItemProps = getLoadMoreListItemProps && getLoadMoreListItemProps();

  // console.log('items.length', items && items.length);

  return (
    <VirtualList
      width={width}
      //scrollToIndex={highlightedIndex} // TODO: Mouse scrolling causes weird issue currently.  Seems to be related to `rowHeight` being a function `rowHeight={48}` works fine
      height={menuHeight || getHeight(items, menuItemCount, getListItemProps, getEmptyListItemProps)}
      rowCount={(items ? items.length : 0) + (loadMoreListItemProps ? 1 : 0)}
      rowHeight={({ index }) => {
        if (loadMoreListItemProps && index >= items.length) {
          const height = getItemHeight(loadMoreListItemProps);
          return height;

        } else {
          const item = items[index];
          const listItemProps = getListItemProps({ item, index });
          const height = getItemHeight(listItemProps);
          return height;
        }
      }}
      rowRenderer={({ index, style, key }) => {
        if (loadMoreListItemProps && index >= items.length) {
          return <ListItem key={key} {...loadMoreListItemProps} style={{ ...loadMoreListItemProps.style, ...style }} />;
        } else {
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
        }
      }}
      noRowsRenderer={() => <ListItem {...getEmptyListItemProps()} /> }
      onRowsRendered={onRowsRendered}
      ref={registerChild}
      {...getVirtualListProps && getVirtualListProps()}
    />
  )
}

function Menu({
  isOpen,
  getInfiniteLoaderProps,
  ...props
}) {
  return isOpen ? (
    <AutoSizer>
      {({ width }) => (
        <Paper style={{ width }} transitionEnabled={false}>
          { getInfiniteLoaderProps ? (
            <InfiniteLoader {...getInfiniteLoaderProps()} >
              {({ onRowsRendered, registerChild }) => (
                <MuiVirtualList {...props} width={width} onRowsRendered={onRowsRendered} registerChild={registerChild} />
              )}
            </InfiniteLoader>
          ) : (
            <MuiVirtualList {...props} width={width} />
          )}
        </Paper>
      )}
    </AutoSizer>
  ) : null;
}

export default Menu;
