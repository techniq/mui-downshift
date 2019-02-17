import React, { Component } from 'react';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';
import { ParentSize } from '@vx/responsive';

const styles = theme => ({
  keyboardFocused: {
    backgroundColor: theme.palette.divider,
  },
});

// class Size extends Component {
//   constructor(props) {
//     super(props);
//     this.sizeRef = React.createRef();
//   }

//   render() {
//     return <div ref={this.sizeRef}>{this.props.children(this.sizeRef.current)}</div>;
//   }
// }

class Menu extends Component {
  state = {
    width: null,
  };

  constructor(props) {
    super(props);
    // this.menuRef = React.createRef();
  }

  componentDidMount() {
    // // const width = this.menuRef.clientWidth;
    // // console.log('setting width', width);
    // this.setState({ width });
    // Force an initial re-render so the inputRef is set and can be used to set the width
    // this.forceUpdate();
  }

  renderItems({ items, getListItem, downshiftProps, classes }) {
    return (
      items &&
      items.map((item, index) => {
        const isHighlighted = downshiftProps.highlightedIndex === index;
        const className = classnames({ [classes.keyboardFocused]: isHighlighted });
        // Convenience helper to simplify typical usage
        const getItemProps = props =>
          downshiftProps.getItemProps({
            item,
            index,
            className,
            ...props,
          });
        const listItem = getListItem({
          getItemProps,
          item,
          index,
          downshiftProps,
          key: index,
        });

        return listItem;
      })
    );
  }

  render() {
    const { items, downshiftProps, getListItem, inputRef, rootRef, classes, ...props } = this.props;

    // console.log('inputRef', inputRef);

    // return (
    //   <Popper
    //     log={console.log('inputRef', inputRef)}
    //     open={downshiftProps.isOpen}
    //     anchorEl={inputRef}
    //     placement="bottom-start"
    //     style={{ zIndex: zIndex.modal }}
    //     // modifiers={{
    //     //   preventOverflow: { enabled: false },
    //     //   hide: { enabled: false },
    //     // }}
    //     // disablePortal
    //   >
    //     <div style={{ width: inputRef && inputRef.clientWidth / 2, background: 'red' }}>hello</div>
    //     {/* <div style={{ width: node && node.clientWidth, background: 'red' }}>hello</div> */}
    //   </Popper>
    // );

    // return (
    //   <Size>
    //     {node => {
    //       console.log('node', node);
    //       return (
    //         <Popper
    //           log={console.log('menuNode', this.menuNode)}
    //           open={true}
    //           anchorEl={inputRef}
    //           placement="bottom-start"
    //           style={{ zIndex: zIndex.modal }}
    //           // modifiers={{
    //           //   preventOverflow: { enabled: false },
    //           //   hide: { enabled: false },
    //           // }}
    //           // disablePortal
    //         >
    //           <div style={{ width: node && node.clientWidth / 2, background: 'red' }}>hello</div>
    //           {/* <div style={{ width: node && node.clientWidth, background: 'red' }}>hello</div> */}
    //         </Popper>
    //       );
    //     }}
    //   </Size>
    // );

    // return (
    //   <div ref={this.menuRef}>
    //     <div style={{ background: 'red' }}>menu {console.log('menuNode', this.menuRef.current)}</div>
    //   </div>
    // );

    // return (
    //   <div ref={node => (this.menuNode = node)}>
    //     <div style={{ background: 'red' }}>menu {console.log('menuNode', this.menuNode)}</div>
    //   </div>
    // );

    // return (
    //   <div {...downshiftProps.getMenuProps({ ref: node => (this.menuNode = node) })}>
    //     <h1>menu {console.log('menuNode', this.menuNode)}</h1>
    //   </div>
    // );

    console.log('rootRef', rootRef.current && rootRef.current.clientWidth);

    return (
      // <ParentSize>
      //   {({ width }) => (
      <div ref={node => (this.menuWrapperRef = node)}>
        <Popper
          // log={console.log('menuNode', this.menuNode)}
          open={downshiftProps.isOpen}
          anchorEl={inputRef}
          // placement="bottom-start"
          // style={{ zIndex: zIndex.modal }}
          // modifiers={{
          //   preventOverflow: { enabled: false },
          //   hide: { enabled: false },
          // }}
          // disablePortal // breaks zIndex/overlap of other me us
        >
          <div {...(downshiftProps.isOpen ? downshiftProps.getMenuProps({}, { suppressRefError: true }) : {})}>
            <Paper
              square
              // style={{ width: inputRef ? inputRef.clientWidth : null }}
              style={{
                width: rootRef ? rootRef.current.clientWidth : null,
                maxHeight: 300,
                overflow: 'auto',
              }}
              // style={{ width: this.menuRef ? this.menuRef.clientWidth : null, maxHeight: 200, overflow: 'auto' }}
              // style={{ width, maxHeight: 200, overflow: 'auto' }}
              // style={{ width: '100%', maxHeight: 200, overflow: 'auto' }}
              // style={{ maxHeight: 200, overflow: 'auto', zIndex: zIndex.modal }}
              // style={{ width: this.state.width, maxHeight: 200, overflow: 'auto' }}
            >
              {this.renderItems({ items, getListItem, downshiftProps, classes })}
            </Paper>
          </div>
        </Popper>
      </div>
    );
    // </ParentSize>
  }
}

export default withStyles(styles)(Menu);
