import React, { Component } from 'react';
import { List as VirtualList, InfiniteLoader, AutoSizer } from 'react-virtualized';
import { Popper } from 'react-popper';
import Portal from 'react-travel';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import zIndex from 'material-ui/styles/zIndex';

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

function getMenuHeight(items, menuItemCount, getListItemProps, emptyListItemProps, footerListItemProps) {
  const rowCount = getRowCount(items, footerListItemProps);
  if (rowCount) {
    const visibleCount = Math.min(rowCount, menuItemCount); // Maximum items before scrolling
    let height = 0;
    for (let i = 0; i < visibleCount; i++) {
      height += getRowHeight(items, i, getListItemProps, footerListItemProps) 
    }
    return height;
  } else if (emptyListItemProps) {
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

function getRowHeight(items, index, getListItemProps, footerListItemProps) {
  if (footerListItemProps && index === (items ? items.length : 1)) {
    return getItemHeight(footerListItemProps);
  } else if (items && index < items.length) {
    const item = items[index];
    const listItemProps = getListItemProps({ item, index });
    return getItemHeight(listItemProps);
  } else {
    // No `items` and no `getFooterListItemProps` defined
    return 0;
  }
}

function getRowCount(items, footerListItemProps) {
  return (items ? items.length : 0) + (footerListItemProps ? 1 : 0)
}

function MuiVirtualList({
  items,
  width,
  menuItemCount,
  menuHeight,
  highlightedIndex,
  selectedItem,
  getItemProps,
  getListItemProps,
  getEmptyListItemProps,
  getVirtualListProps,
  getFooterListItemProps,
  onRowsRendered,
  registerChild
}) {
  const emptyListItemProps = getEmptyListItemProps && getEmptyListItemProps();
  const footerListItemProps = getFooterListItemProps && getFooterListItemProps();

  // console.log('items.length', items && items.length);

  return (
    <VirtualList
      width={width}
      { ...highlightedIndex != null && { scrollToIndex: highlightedIndex}}
      height={menuHeight || getMenuHeight(items, menuItemCount, getListItemProps, emptyListItemProps, footerListItemProps)}
      rowCount={getRowCount(items, footerListItemProps)}
      rowHeight={({ index }) => getRowHeight(items, index, getListItemProps, footerListItemProps)}
      rowRenderer={({ index, style, key }) => {
        if (footerListItemProps && index === (items ? items.length : 1)) {
          return <ListItem key={key} {...footerListItemProps} style={{ ...footerListItemProps.style, ...style }} />;
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
        <Portal>
          <Popper placement="bottom-start" style={{ zIndex: zIndex.popover }} onMouseUp={e => e.stopPropagation()}>
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
          </Popper>
        </Portal>
      )}
    </AutoSizer>
  ) : null;
}

export default Menu;
