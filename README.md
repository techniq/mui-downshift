## mui-downshift
Thin layer over paypal's [downshift](https://github.com/paypal/downshift) to use [Material UI](http://www.material-ui.com) visual components

For examples of `<MuiDownshift>` in action, see [demo](https://techniq.github.io/mui-downshift/) or view the [source](https://github.com/techniq/mui-downshift/tree/master/stories)

### Features
- Windowing (performance)
- Asynchronous loading of items including infinite scrolling
- Customizable rendering - see `getInputProps`, `getListItemProps`, etc

### Props
Property | Type | Required | Description
-------- | ---- | -------- | -----------
`items` | Array | ✓ | Items to show in menu
`getInputProps` | Function | | Customize look of Material-UI's TextField.  Do not confuse with Downshift's `getInputProps` passed down to child function
`getListItemProps` | Function | |  Customize look Material-UI's ListItem for each item
`getEmptyListItemProps` | Function | | Shows an empty list item with the following props if `items` is empty
`getInfiniteLoaderProps` | Function |  | If provided, will wrap menu in react-virtualized [InfiniteLoader](https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md) and pass the props returned from the function.  Be sure to provide all required props (`isRowLoaded`, `rowCount`, and `loadMoreRows`)
`getVirtualListrops` | Function |  | Pass or override props provided to underlying react-virtualized [List](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md) component
`menuItemCount` | Number | | Number of items to show on menu before scrolling
`loading` | Boolean | |  Show loading indicator
all props available on `downshift` | |  | `onChange`, `onStateChange`, ...

### Infinite scrolling
- `threshold` should be bigger than page size (default: 15)
- See [demo](https://github.com/techniq/react-fetch-component/blob/master/src/Fetch.js) using [react-fetch-component](https://github.com/techniq/react-fetch-component)