##  Bugs
  - Large 'X' on IE
    - https://github.com/callemall/material-ui/issues/5055
  - `scrollToIndex` issue
  - Pass downshift props to all get* props (ex. `getInfiniteLoaderProps` / etc)
  - Tab complete to down arrow causes ref error
  - Need to change react (and maybe material-ui) as a peerDependency (might fix tab complete issue)

## Features
  - Nested / optgroups (using `<Subheader />` and `<Divider />` or nesting of `<ListItem>`s)
  - Multiselect (chips)
  - Highlight inputValue on items ([react-highlight-words](https://github.com/bvaughn/react-highlight-words))
    - Can/should this be handled by passing inputValue to `getListItemProps` and let the user implement use `react-highlight-words`/etc?
  - Customize loading (spinner or bar)
  - Clear items while searching (show "Loading..." or "Searching...")
    - Should be possibly by clearing `items` while `loading === true` but not working.  Also need to distringuish between loading additional items vs. searching
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