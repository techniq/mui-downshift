##  Bugs
  - IE: Loading more items (infinite/pagiations) resets scroll
    - Need to confirm fixed in examples (downshiftProps.setHighlightedIndex)

## Features
  - Nested / optgroups (using `<Subheader />` and `<Divider />` or nesting of `<ListItem>`s)
  - Multiselect (chips or "4 selected" and show select in dropdown (maybe even top))
  - Highlight inputValue on items ([react-highlight-words](https://github.com/bvaughn/react-highlight-words))
    - Can/should this be handled by passing inputValue to `getListItemProps` and let the user implement use `react-highlight-words`/etc?
  - Customize loading (spinner or bar)
  - Overriding Input icons
