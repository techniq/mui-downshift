import React, { Component } from 'react';
import {
  List as VirtualList,
  InfiniteLoader,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import { Popper } from 'react-popper';
import Portal from 'material-ui/Portal';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import zIndex from 'material-ui/styles/zIndex';

const styles = theme => ({
  keyboardFocused: {
    backgroundColor: theme.palette.text.divider,
  },
})

function getMenuHeight(rowHeight, items, menuItemCount, showEmpty, includeFooter) {
  const rowCount = getRowCount(items, includeFooter);
  if (rowCount) {
    const visibleCount = Math.min(rowCount, menuItemCount); // Maximum items before scrolling
    let height = 0;
    for (let i = 0; i < visibleCount; i++) {
      height += (typeof rowHeight === 'function') ? rowHeight({ index: i }) : rowHeight
    }
    return height;
  } else if (showEmpty) {
    // Return the height of a single item
    return (typeof rowHeight === 'function') ? rowHeight({ index: 0 }) : rowHeight
  } else {
    return 0;
  }
}

function getRowCount(items, includeFooter) {
  return (items ? items.length : 0) + (includeFooter ? 1 : 0)
}

class MuiVirtualList extends Component {
  cache = new CellMeasurerCache({
    // fixedWidth: true, // Adding causes problem with pagination and menu height shrinking, but removing leaves a warning: "CellMeasurerCache should only measure a cell's width or height. You have configured CellMeasurerCache to measure both. This will result in poor performance."
    defaultHeight: 48,
  });

  componentWillReceiveProps(nextProps) {
    if (
      this.props.width !== nextProps.width ||
      this.props.items !== nextProps.items
    ) {
      this.cache.clearAll(); // Clearing all causes paginated list to jump when loading, but not clearing causes issues with items at the same index but different heights (first item as "Loading", then being replaced with results)
      this.list.recomputeRowHeights();
    }
  }

  render () {
    const {
      items,
      width,
      menuItemCount,
      menuHeight,
      getListItem,
      showEmpty,
      includeFooter,
      getVirtualListProps,
      onRowsRendered,
      registerChild,
      downshiftProps,
      classes
    } = this.props;

    const virtualListProps = getVirtualListProps && getVirtualListProps({ downshiftProps });
    const rowHeight = (virtualListProps && virtualListProps.rowHeight) ? virtualListProps.rowHeight : this.cache.rowHeight;
    const useCellMeasurer = !(virtualListProps && virtualListProps.rowHeight); 

    // console.log('items.length', items && items.length);

    return (
      <VirtualList
        width={width}
        { ...downshiftProps.highlightedIndex != null && { scrollToIndex: downshiftProps.highlightedIndex }}
        height={menuHeight || getMenuHeight(rowHeight, items, menuItemCount, showEmpty, includeFooter)}
        rowCount={getRowCount(items, includeFooter)}
        rowHeight={rowHeight}
        rowRenderer={({ index, style, parent, key }) => {
          const item = items ? items[index] : null;
          const isHighlighted = downshiftProps.highlightedIndex === index;
          const className = classnames({ [classes.keyboardFocused]: isHighlighted });
          // Convenience helper to simplify standard usage
          const getItemProps = props => downshiftProps.getItemProps({ item, index, className, ...props })
          const listItem = getListItem({ getItemProps, item, index, downshiftProps, style });

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
                  {listItem}
                </div>
              </CellMeasurer>
            );
          } else {
            return (
              <div style={style} key={key}>
                {listItem}
              </div>
            )
          }

        }}
        noRowsRenderer={() => {
          // TODO: Support non-default (48) row height.  Either figure out how to use CellMeasurer (initial attempt failed) or allow passing an explicit height.  This might be  fixed now that the cache is cleared when `items` are changed
          const index = 0;
          const item = null;
          const isHighlighted = downshiftProps.highlightedIndex === index;
          const className = classnames({ [classes.keyboardFocused]: isHighlighted });
          // Convenience helper to simplify standard usage
          const getItemProps = props => downshiftProps.getItemProps({ item, index, className, ...props })
          return getListItem({ getItemProps, item, index, downshiftProps });
        }}  
        onRowsRendered={onRowsRendered}
        {...useCellMeasurer && { deferredMeasurementCache: this.cache }}
        ref={el => {
          this.list = el
          if (registerChild) {
            registerChild(el)
          }
        }}
        {...virtualListProps}
      />
    )
  }
}

function Menu({ getInfiniteLoaderProps, ...props }) {
  return props.downshiftProps.isOpen ? (
    <AutoSizer>
      {({ width }) => (
        <Portal>
          <Popper placement="bottom-start" style={{ zIndex: zIndex.modal }} onMouseUp={e => e.stopPropagation()}>
            <Paper style={{ width }}>
              { getInfiniteLoaderProps ? (
                <InfiniteLoader {...getInfiniteLoaderProps({ downshiftProps: props.downshiftProps })} >
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

export default withStyles(styles)(Menu);
