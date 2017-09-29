## mui-downshift
Thin layer over paypal's [downshift](https://github.com/paypal/downshift) to use [Material UI](http://www.material-ui.com) visual components

For examples of `<MuiDownshift>` in action, see [demo](https://techniq.github.io/mui-downshift/) or view the [source](https://github.com/techniq/mui-downshift/tree/master/stories)

### Features
- Uses windowing for performance (via [react-virtualized](https://github.com/bvaughn/react-virtualized))
- Asynchronous loading of items
  - Infinite scrolling
  - Paginated loading
  - Delayed loading of items until menu is opened
- Control openining menu on input focus (or only on explict toggle) 
- Control height of menu based on number of items or pixels
- Customizable rendering (see `getInputProps`, `getListItemProps`, etc)

### Props
Property | Type | Required | Description
-------- | ---- | -------- | -----------
`items` | Array | ✓ | Items to show in menu
`getInputProps` | Function | | Customize look of Material-UI's TextField.  Do not confuse with Downshift's `getInputProps` passed down to child function
`getListItemProps` | Function | |  Customize look Material-UI's ListItem for each item
`getEmptyListItemProps` | Function | | Shows an empty list item with the following props if `items` is empty
`getInfiniteLoaderProps` | Function |  | If provided, will wrap menu in react-virtualized [InfiniteLoader](https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md) and pass the props returned from the function.  Be sure to provide all required props (`isRowLoaded`, `rowCount`, and `loadMoreRows`).  Used for infinite scrolling.
`getLoadMoreListItemProps` | Function | | If defined and returns an object, a list item will be added to the bottom of the list with the returned object as props.  Used for paginated scrolling.
`getVirtualListrops` | Function |  | Pass or override props provided to underlying react-virtualized [List](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md) component
`menuItemCount` | Number | | Number of items to show on menu before scrolling
`loading` | Boolean | |  Show loading indicator
all props available on `downshift` | |  | `onChange`, `onStateChange`, ...
