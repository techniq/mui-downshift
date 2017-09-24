##  Bugs
  - *Large 'X' on IE
    - https://github.com/callemall/material-ui/issues/5055
  - DONE: Handle empty list returned (filtered, etc)
  - DONE: Handle passing ListItem props and setting `height` on `VirutalList` correctly

## Features
  - DONE: Handle filtering outside of MuiComplete
  - DONE: Handle using <Fetch />
    - DONE: Does not fetch until open
  - *Supporting fetching/loading more items
      - Infinite scrolling
        - See https://github.com/bvaughn/react-virtualized/blob/master/source/InfiniteLoader/InfiniteLoader.example.js
      - Paginated ("load more" button at the bottom)
      - How does this work when you've selected an item not loaded yet
  - Nested / optgroups (using `<Subheader />` and `<Divider />` or nesting of `<ListItem>`s)
  - Multiselect (chips)
  - Highlight inputValue on items ([react-highlight-words](https://github.com/bvaughn/react-highlight-words))
  - Customize loading (spinner or bar)
  - Customize 
  - DONE: Rich list them (multiline, bolding, etc)

## Input customization
  - Overriding Input icons
  - DONE: Consider passing in entire object from downshift child function (at least the actions and state, maybe not the other prop getters) and replace "inputProps" with "getInputProps"
    - "getInputProps" might be confusing since downshift has this as a prop getter but doesn't receive the aforementioned actions/states
  - DONE: Support enabling/disabling showing menu on input focus

##  Menu customization
  - Expose "getMenuProps"?
    - Do all of these get applied to <VirtualList>, what about <Paper>/wrapper
  - DONE: Max height (based on number of items to show)

## Verify
  - *Make sure clicking on scroll in IE 11 doesn't close menu
  - *Scolling window updates menu position

## Deploying
  - Documentation
    - Update README with info about props
    - Show source on storybook examples