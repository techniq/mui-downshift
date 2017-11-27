import React, { Component } from 'react';
import {
  List as VirtualList,
  InfiniteLoader,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import { Popper } from 'react-popper';
import Portal from 'react-travel';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import zIndex from 'material-ui/styles/zIndex';

function getMenuHeight(rowHeight, items, menuItemCount, emptyListItemProps, footerListItemProps) {
  const rowCount = getRowCount(items, footerListItemProps);
  if (rowCount) {
    const visibleCount = Math.min(rowCount, menuItemCount); // Maximum items before scrolling
    let height = 0;
    for (let i = 0; i < visibleCount; i++) {
      height += (typeof rowHeight === 'function') ? rowHeight({ index: i }) : rowHeight
    }
    return height;
  } else if (emptyListItemProps) {
    return (typeof rowHeight === 'function') ? rowHeight({ index: 0 }) : rowHeight
  } else {
    return 0;
  }
}

function getRowCount(items, footerListItemProps) {
  return (items ? items.length : 0) + (footerListItemProps ? 1 : 0)
}

class MuiVirtualList extends Component {
  cache = new CellMeasurerCache({
    defaultHeight: 48,
    fixedWidth: true
  });

  render () {
    const {
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
      registerChild,
      downshiftProps
    } = this.props;

    const emptyListItemProps = getEmptyListItemProps && getEmptyListItemProps(downshiftProps);
    const footerListItemProps = getFooterListItemProps && getFooterListItemProps(downshiftProps);
    const virtualListProps = getVirtualListProps && getVirtualListProps(downshiftProps);
    const rowHeight = (virtualListProps && virtualListProps.rowHeight) ? virtualListProps.rowHeight : this.cache.rowHeight;
    const useCellMeasurer = !(virtualListProps && virtualListProps.rowHeight); 

    // console.log('items.length', items && items.length);

    return (
      <VirtualList
        width={width}
        { ...highlightedIndex != null && { scrollToIndex: highlightedIndex}}
        height={menuHeight || getMenuHeight(rowHeight, items, menuItemCount, emptyListItemProps, footerListItemProps)}
        rowCount={getRowCount(items, footerListItemProps)}
        rowHeight={rowHeight}
        rowRenderer={({ index, style, parent, key }) => {
          let props = null;
          if (footerListItemProps && index === (items ? items.length : 1)) {
            props = footerListItemProps;
          } else {
            const item = items[index];
            const listItemProps = getListItemProps({ item, index, highlightedIndex, selectedItem, style })

            props = getItemProps({
              index,
              item,
              isKeyboardFocused: highlightedIndex === index,
              ...selectedItem === item && { style: { fontWeight: 'bold' } },
              ...listItemProps
            });
          }

          if (useCellMeasurer) {
            return (
              <CellMeasurer
                cache={this.cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
              >
                <div style={style}>
                  <ListItem key={key} {...props} />
                </div>
              </CellMeasurer>
            );
          } else {
            return (
              <ListItem
                key={key}
                {...props}
                style={{ ...props.style, ...style }}
              />
            )
          }

        }}
        noRowsRenderer={() => <ListItem {...emptyListItemProps} /> } // TODO: Support non-default (48) row height.  Either figure out how to use CellMeasurer (initial attempt failed) or allow passing an explicit height
        onRowsRendered={onRowsRendered}
        {...useCellMeasurer && { deferredMeasurementCache: this.cache }}
        ref={registerChild}
        {...virtualListProps}
      />
    )
  }
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
                <InfiniteLoader {...getInfiniteLoaderProps(props.downshiftProps)} >
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
