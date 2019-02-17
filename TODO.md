##  Bugs
  - IE: Loading more items (infinite/paginations) resets scroll
    - Need to confirm fixed in examples (downshiftProps.setHighlightedIndex)

## Features
  - Nested / optgroups (using `<Subheader />` and `<Divider />` or nesting of `<ListItem>`s)
  - Multiselect (chips or "4 selected" and show select in dropdown (maybe even top))
  - Highlight inputValue on items ([react-highlight-words](https://github.com/bvaughn/react-highlight-words))
    - Can/should this be reading `downshift.inputValue` in `getListItem` and use `react-highlight-words`/etc?
  - Customize loading (spinner or bar)
  - Overriding Input icons



## Rewrite
- https://github.com/paypal/downshift/issues/551
- Use React.createContext - https://codesandbox.io/s/github/kentcdodds/downshift-examples/tree/master/?module=%2Fsrc%2Fother-examples%2Fhoc
- Remove fullWidth by default?


- Popper
  - Problems it fixes
    - Showing menu up when at bottom of page
  - Problems it causes
    - 
- Portal
  - Problems it fixes
    - Stacking context
  - Problems it causes
    - Measuring of width where out of layout
  