## mui-downshift
Thin layer over paypal's [downshift](https://github.com/paypal/downshift) to use [Material UI](http://www.material-ui.com) visual components

For examples of `<MuiDownshift>` in action, see [demo](https://techniq.github.io/mui-downshift/) or view the [source](https://github.com/techniq/mui-downshift/tree/master/stories)

### Features
- Windowing (performance)
- Asynchronous loading of items including infinite scrolling
- Customizable rendering - see `getInputProps`, `getListItemProps`, `getEmptyListItem`

### Props
- `items` - Items to show in menu.  Required
- `itemCount` - Total number of items available.  Used with `loadMoreItems` to load additional menu items (ex. infinte loading)
- `loadMoreItems` - Function (`startIndex, endIndex`).  Must return a promise
- `getInputProps` - Customize look of Material-UI's TextField.  Do not confuse with Downshift's `getInputProps` passed down to child function
- `getListItemProps` - Customize look of Material-UI's ListItem.
- `getEmptyListItemProps` - Shows an empty list item with the following props if `items` is empty
- `menuItemCount` - Number of items to show on menu before scrolling
- `loading` - Show loading indicator
- all props available on `downshift` (`onChange`, `onStateChange`, etc)

Infinite scrolling
- `threshold` should be bigger than page size (default: 15)
- See [demo](https://github.com/techniq/react-fetch-component/blob/master/src/Fetch.js) using [react-fetch-component](https://github.com/techniq/react-fetch-component)