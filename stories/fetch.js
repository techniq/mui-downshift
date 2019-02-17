import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { all as starwarsNames } from 'starwars-names';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MuiDownshift from '../src';
import MockFetch from './components/MockFetch';

const items = starwarsNames.map((label, value) => ({ label, value }));

storiesOf('Fetch', module)
  .add('basic', () => (
    <MockFetch items={items} url="https://example.com/">
      {({ loading, data, error, fetch, clearData }) => (
        <MuiDownshift
          items={data && data.items}
          loading={loading}
          onStateChange={changes => {
            if (typeof changes.inputValue === 'string') {
              clearData();
              fetch(`https://example.com/?q=${changes.inputValue}`);
            }
          }}
        />
      )}
    </MockFetch>
  ))

  .add('no initial fetch', () => (
    <MockFetch items={items} url="https://example.com/" manual>
      {({ loading, data, error, fetch, clearData }) => (
        <MuiDownshift
          items={data && data.items}
          getListItem={({ getItemProps, item }) =>
            item ? (
              <ListItem button {...getItemProps()}>
                <ListItemText primary={item.label} />
              </ListItem>
            ) : loading ? (
              <ListItem button disabled>
                <ListItemText primary={<span style={{ fontStyle: 'italic' }}>Loading...</span>} />
              </ListItem>
            ) : (
              <ListItem button disabled>
                <ListItemText primary={<span style={{ fontStyle: 'italic' }}>No items found</span>} />
              </ListItem>
            )
          }
          showEmpty
          includeFooter={loading}
          loading={loading}
          onStateChange={changes => {
            if (typeof changes.inputValue === 'string') {
              clearData();
              fetch(`https://example.com/?q=${changes.inputValue}`);
            } else if (changes.isOpen !== undefined && data == null) {
              fetch('https://example.com/');
            }
          }}
        />
      )}
    </MockFetch>
  ))

  // .add('infinte loading', () => (
  //   <MockFetch
  //     items={items}
  //     url="https://example.com/?startIndex=0&stopIndex=20"
  //     onDataChange={(newData, currentData = { total: 0, items: [] }) => ({
  //       total: newData.total,
  //       items: [...currentData.items, ...newData.items],
  //     })}
  //     manual
  //   >
  //     {({ loading, data, error, fetch, request, clearData }) => (
  //       <MuiDownshift
  //         items={data && data.items}
  //         getInfiniteLoaderProps={({ downshiftProps }) => ({
  //           rowCount: data ? data.total : 0,
  //           isRowLoaded: ({ index }) => (data ? !!data.items[index] : false),
  //           loadMoreRows: loading
  //             ? () => {}
  //             : ({ startIndex, stopIndex }) => {
  //                 downshiftProps.setHighlightedIndex(null);

  //                 const url = new URL(request.url);
  //                 const params = new URLSearchParams(url.search);
  //                 params.set('startIndex', startIndex);
  //                 params.set('stopIndex', stopIndex + 1);
  //                 url.search = params.toString();
  //                 return fetch(url.toString());
  //               },
  //         })}
  //         getListItem={({ getItemProps, item }) =>
  //           item ? (
  //             <ListItem button {...getItemProps()}>
  //               <ListItemText primary={item.label} />
  //             </ListItem>
  //           ) : loading ? (
  //             <ListItem button disabled>
  //               <ListItemText primary={<span style={{ fontStyle: 'italic' }}>Loading...</span>} />
  //             </ListItem>
  //           ) : (
  //             <ListItem button disabled>
  //               <ListItemText primary={<span style={{ fontStyle: 'italic' }}>No items found</span>} />
  //             </ListItem>
  //           )
  //         }
  //         showEmpty
  //         includeFooter={loading}
  //         loading={loading}
  //         onStateChange={changes => {
  //           if (typeof changes.inputValue === 'string') {
  //             clearData();
  //             fetch(`https://example.com/?q=${changes.inputValue}&startIndex=0&stopIndex=20`, null, {
  //               ignorePreviousData: true,
  //             });
  //           } else if (changes.isOpen !== undefined && data == null) {
  //             fetch('https://example.com/?startIndex=0&stopIndex=20');
  //           }
  //         }}
  //       />
  //     )}
  //   </MockFetch>
  // ))

  .add('paginated loading', () => (
    <MockFetch
      items={items}
      url="https://example.com/?startIndex=0&stopIndex=10"
      onDataChange={(newData, currentData = { total: 0, items: [] }) => ({
        total: newData.total,
        items: [...currentData.items, ...newData.items],
      })}
      manual
    >
      {({ loading, data, error, fetch, request, clearData }) => {
        const hasMoreData = data && data.items.length < data.total;

        return (
          <MuiDownshift
            items={data && data.items}
            loading={loading}
            includeFooter={loading || hasMoreData}
            showEmpty
            getListItemKey={(rowIndex, columnIndex) => {
              if (data && data.items && data.items[rowIndex]) {
                return data.items[rowIndex].label;
              } else if (loading) {
                return 'loading';
              } else if (hasMoreData) {
                return 'hasMoreData';
              }
              return 'noItemsFound';
            }}
            getListItem={({ getItemProps, item, index, downshiftProps }) =>
              item ? (
                <ListItem button {...getItemProps()}>
                  <ListItemText primary={item.label} secondary="Test" />
                </ListItem>
              ) : loading ? (
                <ListItem button disabled>
                  <ListItemText primary={<span style={{ fontStyle: 'italic' }}>Loading...</span>} />
                </ListItem>
              ) : hasMoreData ? (
                <ListItem
                  button
                  style={{ backgroundColor: '#ccc' }}
                  onClick={() => {
                    downshiftProps.setHighlightedIndex(null);

                    const url = new URL(request.url);
                    const params = new URLSearchParams(url.search);
                    const currentStartIndex = Number(params.get('startIndex'));
                    const currentStopIndex = Number(params.get('stopIndex'));
                    params.set('startIndex', currentStartIndex + 10);
                    params.set('stopIndex', currentStopIndex + 10);
                    url.search = params.toString();
                    fetch(url.toString());
                  }}
                >
                  <ListItemText primary={<span style={{ color: '#fff' }}>Load more items</span>} />
                </ListItem>
              ) : (
                <ListItem button disabled>
                  <ListItemText primary={<span style={{ fontStyle: 'italic' }}>No items found</span>} />
                </ListItem>
              )
            }
            onStateChange={changes => {
              if (typeof changes.inputValue === 'string') {
                clearData();
                fetch(`https://example.com/?q=${changes.inputValue}&startIndex=0&stopIndex=10`, null, {
                  ignorePreviousData: true,
                });
              } else if (changes.isOpen !== undefined && data == null) {
                fetch('https://example.com/?startIndex=0&stopIndex=10');
              }
            }}
          />
        );
      }}
    </MockFetch>
  ));
