## New
- disablePopper
- disablePortal (only if `disablePopper` is not set)
  - Do not require `ParentSize` to measure

- Popper
  - Pros:
    - Provides smart positioning of Menu (open up if bottom most input)
    - Includes Portal that fixes Stacking context / overlap
  - Cons: 
    - Because render []

## TODO
- Props to Menu to set maxHeight, etc

- Width
  - If no `width` passed and no `disabePortal`, uses some ref's clientWidth
  - If `width` passed, uses it (<ParentSize>, etc)
  - Notes:
    - Portal mandates an explicit width being set on menu since it's rendered outside of the context