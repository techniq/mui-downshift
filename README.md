## mui-downshift
Thin layer over paypal's [downshift](https://github.com/paypal/downshift) to use [Material UI](http://www.material-ui.com) visual components

For examples of `<MuiDownshift>` in action, see [demo](https://techniq.github.io/mui-downshift/) or view the [source](https://github.com/techniq/mui-downshift/tree/master/stories)

### Features
- Uses windowing for performance (via [react-virtualized](https://github.com/bvaughn/react-virtualized))
- Asynchronous loading of items
  - Infinite scrolling
  - Paginated loading
  - Delayed loading of items until menu is opened
- Customizable rendering (see `getInputProps`, `getListItemProps`, etc)
- Control opening menu on input focus (or only on explict toggle) 
- Control height of menu based on number of items or pixels
- Uses a portal to solve the z-index / [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) problem and Material UI's popover z-index [value](https://github.com/callemall/material-ui/blob/master/src/styles/zIndex.js)
- All other capabilities inherited from `downshift`

### Props
Property | Type | Required | Description
-------- | ---- | -------- | -----------
`items` | Array | ✓ | Items to show in menu
`getInputProps` | Function | | Customize look of Material-UI's `<TextField />`.  Do not confuse with Downshift's `getInputProps` passed down to child function
`getListItemProps` | Function | |  Customize look Material-UI's `<ListItem />` for each item
`getEmptyListItemProps` | Function | | Shows an empty list item with the following props if `items` is empty
`getInfiniteLoaderProps` | Function |  | If provided, will wrap menu in react-virtualized [InfiniteLoader](https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md) and pass the props returned from the function.  Be sure to provide all required props (`isRowLoaded`, `rowCount`, and `loadMoreRows`).  Used for infinite scrolling (see demo).
`getFooterListItemProps` | Function | | If defined and returns an object, a list item will be added to the bottom of the list with the returned object as props.  Useful for paginated scrolling (see demo) and showing loading status beyond the `loading` prop.
`getVirtualListProps` | Function |  | Pass or override props provided to underlying react-virtualized [List](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md) component
`getRootProps` | Function | | Provide props to the root element that wraps the input and menu components
`menuItemCount` | Number | | Number of items to show on menu before scrolling.  Default `5`
`menuHeight` | Number | | Number of pixels to set menu before scrolling.  Overrides `menuItemCount` if set.  Default `null`
`loading` | Boolean | |  Show loading indicator
all props available on `downshift` | |  | `itemToString`, `onChange`, `onStateChange`, ...
