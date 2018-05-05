## mui-downshift
Thin layer over paypal's [downshift](https://github.com/paypal/downshift) to use [Material-UI 1.0](http://material-ui-next.com) visual components

For examples of `<MuiDownshift>` in action, see [demo](https://techniq.github.io/mui-downshift/) or view the [source](https://github.com/techniq/mui-downshift/tree/master/stories)

### Features
- Uses windowing for performance (via [react-virtualized](https://github.com/bvaughn/react-virtualized))
- Asynchronous loading of items
  - Infinite scrolling
  - Paginated loading
  - Delayed loading of items until menu is opened
- Customizable rendering (see `getListItem`, `getInputProps`, etc)
- Control opening menu on input focus (or only on explict toggle)
- Control height of menu based on number of items or pixels
- Dynamic row heights using react-virtualized's [CellMeasurer](https://github.com/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md)
- Uses a portal to solve the z-index / [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) problem and Material-UI's popover z-index [value](https://github.com/callemall/material-ui/blob/master/src/styles/zIndex.js)
- All other capabilities inherited from `downshift`

### Props
Property | Type | Required | Description
-------- | ---- | -------- | -----------
`items` | Array | ✓ | Items to show in menu
`getListItem` | Function | |  Return an instance of Material-UI's `<ListItem />` for each item.  defaultProps implementation handles simple cases.
`getListItemKey` | Function | | If defined, should return a deterministic key based on index within `items`, instead of just the default (default).  Passed to react-virtualized's CellMeasurer [keyMapper](https://github.com/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md#prop-types-1) prop.  Definining helps resolve an issue with menu changing size or the scroll position jumping around when appending more items.  See the paginated fetch for an example.
`getInputProps` | Function | | Customize look of Material-UI's `<FormControl>` and `<Input />`.  Result of function is merged with Downshift's `getInputProps`
`showEmpty` | Boolean | | If true, will render a single item if items is empty.  Will call `getListItem` (if defined) with a null `item` to handle display
`includeFooter` | Boolean | | If true, will render an additional item as the last item. Will call `getListItem` (if defined) with a null `item` to handle display.  Useful for paginated scrolling (see demo) and showing loading status beyond the `loading` prop.
`getInfiniteLoaderProps` | Function |  | If provided, will wrap menu in react-virtualized [InfiniteLoader](https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md) and pass the props returned from the function.  Be sure to provide all required props (`isRowLoaded`, `rowCount`, and `loadMoreRows`).  Used for infinite scrolling (see demo).
`getVirtualListProps` | Function |  | Pass or override props provided to underlying react-virtualized [List](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md) component.  Note: Setting `rowHeight` will remove `CellMeasurer` usage, which is used to calculate heights dynamically.  This can provide better performance, especially if set as a static value (ex. `48`)
`getRootProps` | Function | | Provide props to the root element that wraps the input and menu components
`menuItemCount` | Number | | Number of items to show on menu before scrolling.  Default `5`
`menuHeight` | Number | | Number of pixels to set menu before scrolling.  Overrides `menuItemCount` if set.  Default `null`
`loading` | Boolean | |  Show loading indicator
all props available on `downshift` | |  | `itemToString`, `onChange`, `onStateChange`, ...

### Running Storybook

This project has some [storybook](https://github.com/storybooks/storybook) stories.

To run storybook, you have to install the story dependencies first:

```bash
$ cd stories
$ yarn install
$ cd ..
```

Then use yarn to run the `storybook` script:

```bash
$ yarn storybook
```
