import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Fetch from 'react-fetch-component';
import fetchMock from 'fetch-mock';
import { all as starwarsNames } from 'starwars-names';

import MuiDownshift from '../src';

const items = starwarsNames.map((text, value) => ({ text, value }));

storiesOf('Fetch', module)
  .add('basic', () => (
    <MockFetch url="https://example.com/">
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
    <MockFetch url="https://example.com/" manual>
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
    <MockFetch url="https://example.com/?startIndex=0&stopIndex=20" 
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
    <MockFetch url="https://example.com/?startIndex=0&stopIndex=20" 
      onDataChange={(newData, currentData = { total: 0, items: [] }) => {
        return { total: newData.total, items: [...currentData.items, ...newData.items] }
      }}
      manual
    >
      {({ loading, data, error, fetch, request }) => (
        <MuiDownshift
          items={data && data.items}
          loading={loading}
          getLoadMoreListItemProps={() => (data && data.items.length < data.total) ? {
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
          } : null }
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

/* Mock for consistent fetch responses */
class MockFetch extends Component {
  componentWillMount() {
    fetchMock.get('*', url => {
      // console.log('fetch', url);
      let filteredItems = items;

      var urlObj = new URL(url);
      var searchParams = new URLSearchParams(urlObj.search);
      if (searchParams.has('q')) {
        const query = searchParams.get('q')
        if (query) {
          filteredItems = items.filter(
            item => item.text.toLowerCase().includes(query.toLowerCase())
          );
        }
      }

      if (searchParams.has('startIndex') || searchParams.has('stopIndex')) {
        const startIndex = Number(searchParams.get('startIndex'));
        const stopIndex = (Number(searchParams.get('stopIndex')) || 10);
        return mockResponse({ total: filteredItems.length, items: filteredItems.slice(startIndex, stopIndex) }, 500)
      } else {
        return mockResponse({ total: filteredItems.length, items: filteredItems }, 500)
      }
    });
  }

  componentWillUnmount() {
    fetchMock.restore();
  }

  render() {
    return <Fetch {...this.props} />;
  }
}

function mockResponse(response, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(response), delay);
  });
}