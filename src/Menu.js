import React, { Component } from 'react';
import { List as VirtualList, InfiniteLoader, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';

const styles = theme => ({
  keyboardFocused: {
    backgroundColor: theme.palette.divider,
  },
});

function getRowCount(items, includeFooter) {
  return (items ? items.length : 0) + (includeFooter ? 1 : 0);
}

function getMenuHeight(rowHeight, items, menuItemCount, showEmpty, includeFooter) {
  const rowCount = getRowCount(items, includeFooter);
  if (rowCount) {
    const visibleCount = Math.min(rowCount, menuItemCount); // Maximum items before scrolling
    let height = 0;
    for (let i = 0; i < visibleCount; i++) {
      height += typeof rowHeight === 'function' ? rowHeight({ index: i }) : rowHeight;
    }
    return height;
  } else if (showEmpty) {
    // Return the height of a single item
    return typeof rowHeight === 'function' ? rowHeight({ index: 0 }) : rowHeight;
  }
  return 0;
}

class MuiVirtualList extends Component {
  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 48,
    keyMapper: this.props.getListItemKey,
  });

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.getListItemKey !== nextProps.getListItemKey) {
      this.cache._keyMapper = nextProps.getListItemKey;
    }

    if (this.props.width !== nextProps.width) {
      // Need to recalculate all heights since new widths
      this.cache.clearAll();
      this.list.recomputeRowHeights();
    }

    if (this.props.items !== nextProps.items) {
      if (!this.props.getListItemKey) {
        // Only need to recalculate heights if no getListItemKey is defined as CellMeasureCache.defaultKeyMapper only uses indexes for keys (and new items at the same index might have different heights)
        this.cache.clearAll();
      }

      this.list.recomputeRowHeights();
    }
  }

  render() {
    const {
      items,
      width,
      menuItemCount,
      menuHeight,
      getListItem,
      showEmpty,
      includeFooter,
      getVirtualListProps,
      getListItemKey,
      onRowsRendered,
      registerChild,
      downshiftProps,
      classes,
    } = this.props;

    const virtualListProps = getVirtualListProps && getVirtualListProps({ downshiftProps });
    const rowHeight =
      virtualListProps && virtualListProps.rowHeight ? virtualListProps.rowHeight : this.cache.rowHeight;
    const useCellMeasurer = !(virtualListProps && virtualListProps.rowHeight);
    const height = menuHeight || getMenuHeight(rowHeight, items, menuItemCount, showEmpty, includeFooter);

    return (
      <VirtualList
        width={width}
        {...downshiftProps.highlightedIndex != null && { scrollToIndex: downshiftProps.highlightedIndex }}
        height={height}
        rowCount={getRowCount(items, includeFooter)}
        rowHeight={rowHeight}
        rowRenderer={({ index, style, parent, key }) => {
          const item = items ? items[index] : null;
          const isHighlighted = downshiftProps.highlightedIndex === index;
          const className = classnames({ [classes.keyboardFocused]: isHighlighted });
          // Convenience helper to simplify typical usage
          const getItemProps = props =>
            downshiftProps.getItemProps({
              item,
              index,
              className,
              ...props,
            });
          const listItem = getListItem({
            getItemProps,
            item,
            index,
            downshiftProps,
            style,
          });

          const _key = getListItemKey ? getListItemKey(index) : key;

          if (useCellMeasurer) {
            return (
              <CellMeasurer
                cache={this.cache}
                columnIndex={0}
                rowIndex={index}
                parent={parent}
                key={_key}
                width={width}
              >
                <div style={style}>{listItem}</div>
              </CellMeasurer>
            );
          }
          return (
            <div style={style} key={key}>
              {listItem}
            </div>
          );
        }}
        noRowsRenderer={() => {
          // TODO: Support non-default (48) row height.  Either figure out how to use CellMeasurer (initial attempt failed) or allow passing an explicit height.  This might be  fixed now that the cache is cleared when `items` are changed
          const index = 0;
          const item = null;
          const isHighlighted = downshiftProps.highlightedIndex === index;
          const className = classnames({ [classes.keyboardFocused]: isHighlighted });
          // Convenience helper to simplify typical usage
          const getItemProps = props =>
            downshiftProps.getItemProps({
              item,
              index,
              className,
              ...props,
            });
          return getListItem({
            getItemProps,
            item,
            index,
            downshiftProps,
          });
        }}
        onRowsRendered={args => {
          if (useCellMeasurer) {
            // Force update to recalculate menuHeight with updated cache values.  See issue #45
            this.forceUpdate();
          }
          onRowsRendered && onRowsRendered(args);
        }}
        {...useCellMeasurer && { deferredMeasurementCache: this.cache }}
        ref={el => {
          this.list = el;
          if (registerChild) {
            registerChild(el);
          }
        }}
        {...virtualListProps}
      />
    );
  }
}

function Menu({ getInfiniteLoaderProps, inputRef, ...props }) {
  return props.downshiftProps.isOpen ? (
    <AutoSizer>
      {({ width }) => (
        <Popper
          open={true}
          anchorEl={inputRef}
          placement="bottom-start"
          style={{ zIndex: zIndex.modal }}
          modifiers={{
            preventOverflow: { enabled: false },
            hide: { enabled: false },
          }}
        >
          <div {...props.downshiftProps.getMenuProps()}>
            <Paper style={{ width }}>
              {getInfiniteLoaderProps ? (
                <InfiniteLoader {...getInfiniteLoaderProps({ downshiftProps: props.downshiftProps })}>
                  {({ onRowsRendered, registerChild }) => (
                    <MuiVirtualList
                      {...props}
                      width={width}
                      onRowsRendered={onRowsRendered}
                      registerChild={registerChild}
                    />
                  )}
                </InfiniteLoader>
              ) : (
                <MuiVirtualList {...props} width={width} />
              )}
            </Paper>
          </div>
        </Popper>
      )}
    </AutoSizer>
  ) : null;
}

export default withStyles(styles)(Menu);
