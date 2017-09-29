##  Bugs
  - Large 'X' on IE
    - https://github.com/callemall/material-ui/issues/5055
  - `scrollToIndex` issue

## Features
  - Nested / optgroups (using `<Subheader />` and `<Divider />` or nesting of `<ListItem>`s)
  - Multiselect (chips)
  - Highlight inputValue on items ([react-highlight-words](https://github.com/bvaughn/react-highlight-words))
    - Can/should this be handled by passing inputValue to `getListItemProps` and let the user implement use `react-highlight-words`/etc?
  - Customize loading (spinner or bar)
  - `getLoadingListItemProps` - show while loading at the bottom of the list (if data is cleared during filtering will also show directly under input)
    - Mostly available now using `getFooterListItemProps`.  Not showing while request is in flight while filtering
  - Overriding Input icons
  - DONE: Rich list them (multiline, bolding, etc)

## Verify
  - Make sure clicking on scroll in IE 11 doesn't close menu
  - Scolling window updates menu position
  - Handling of selected item that was not loaded yet (<Fetch />)

## Deploying
  - Documentation
    - Update README with info about props
    - Show source on storybook examples