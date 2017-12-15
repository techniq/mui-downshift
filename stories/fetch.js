import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { all as starwarsNames } from 'starwars-names';

import MuiDownshift from '../src';
import MockFetch from './components/MockFetch';

const items = starwarsNames.map((text, value) => ({ text, value }));

storiesOf('Fetch', module)
  .add('basic', () => (
    <MockFetch items={items} url="https://example.com/">
      {({ loading, data, error, fetch }) => (
        <MuiDownshift
          items={data && data.items}
          loading={loading}
          onStateChange={changes => {
            if (changes.hasOwnProperty('inputValue')) {
              fetch(`https://example.com/?q=${changes.inputValue}`)
            }
          }}
        />
      )}
    </MockFetch>
  ))

  .add('no initial fetch', () => (
    <MockFetch items={items} url="https://example.com/" manual>
      {({ loading, data, error, fetch }) => (
        <MuiDownshift
          items={data && data.items}
          loading={loading}
          onStateChange={changes => {
            if (changes.hasOwnProperty('inputValue')) {
              fetch(`https://example.com/?q=${changes.inputValue}`)
            } else if (changes.hasOwnProperty('isOpen') && data == null) {
              fetch(`https://example.com/`)
            }
          }}
        />
      )}
    </MockFetch>
  ))

  .add('infinte loading', () => (
    <MockFetch items={items} url="https://example.com/?startIndex=0&stopIndex=20" 
      onDataChange={(newData, currentData = { total: 0, items: [] }) => {
        return { total: newData.total, items: [...currentData.items, ...newData.items] }
      }}
      manual
    >
      {({ loading, data, error, fetch, request }) => (
        <MuiDownshift
          items={data && data.items}
          getInfiniteLoaderProps={() => ({
            rowCount: data ? data.total : 0,
            isRowLoaded: ({ index }) => data ? !!data.items[index] : false,
            loadMoreRows: loading ? () => {} : ({ startIndex, stopIndex }) => {
              const url = new URL(request.url);
              const params = new URLSearchParams(url.search);
              params.set('startIndex', startIndex);
              params.set('stopIndex', stopIndex + 1);
              url.search = params.toString();
              return fetch(url.toString())
            }})
          }
          getFooterListItemProps={loading ? () => ({
            primaryText: 'Loading...',
            style: {
              fontStyle: 'italic',
              color: 'rgba(0,0,0,.5)'
            },
            disabled: true
          }) : null }
          getEmptyListItemProps={() => ({
            primaryText: 'No items found',
            style: {
              fontStyle: 'italic',
              color: 'rgba(0,0,0,.5)'
            },
            disabled: true
          })}
          loading={loading}
          onStateChange={changes => {
            if (changes.hasOwnProperty('inputValue')) {
              fetch(`https://example.com/?q=${changes.inputValue}&startIndex=0&stopIndex=20`, null, { ignorePreviousData: true })
            } else if (changes.hasOwnProperty('isOpen') && data == null) {
              fetch(`https://example.com/?startIndex=0&stopIndex=20`)
            }
          }}
        />
      )}
    </MockFetch>
  ))

  .add('paginated loading', () => (
    <MockFetch items={items} url="https://example.com/?startIndex=0&stopIndex=20" 
      onDataChange={(newData, currentData = { total: 0, items: [] }) => {
        return { total: newData.total, items: [...currentData.items, ...newData.items] }
      }}
      manual
    >
      {({ loading, data, error, fetch, request }) => (
        <MuiDownshift
          items={data && data.items}
          loading={loading}
          getFooterListItemProps={() => {
            if (loading) {
              return {
                primaryText: 'Loading...',
                style: {
                  fontStyle: 'italic',
                  color: 'rgba(0,0,0,.5)'
                },
                disabled: true
              }
            } else if (data && data.items.length < data.total) {
              return {
                primaryText: 'Load more items',
                style: {
                  background: '#ccc',
                  color: '#fff'
                },
                onClick: () => {
                  const url = new URL(request.url);
                  const params = new URLSearchParams(url.search);
                  const currentStartIndex = Number(params.get('startIndex'));
                  const currentStopIndex = Number(params.get('stopIndex'))
                  params.set('startIndex', currentStartIndex + 20);
                  params.set('stopIndex', currentStopIndex + 20);
                  url.search = params.toString();
                  fetch(url.toString())
                }
              }
            }
          }}
          getEmptyListItemProps={() => ({
            primaryText: 'No items found',
            style: {
              fontStyle: 'italic',
              color: 'rgba(0,0,0,.5)'
            },
            disabled: true
          })}
          onStateChange={changes => {
            if (changes.hasOwnProperty('inputValue')) {
              fetch(`https://example.com/?q=${changes.inputValue}&startIndex=0&stopIndex=20`, null, { ignorePreviousData: true })
            } else if (changes.hasOwnProperty('isOpen') && data == null) {
              fetch(`https://example.com/?startIndex=0&stopIndex=20`)
            }
          }}
        />
      )}
    </MockFetch>
  ))
