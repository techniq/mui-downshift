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
    <MockFetch url="https://example.com/?startIndex=0&endIndex=20" 
      onDataChange={(newData, currentData = { total: 0, items: [] }) => {
        return { total: newData.total, items: [...currentData.items, ...newData.items] }
      }}
      manual
    >
      {({ loading, data, error, fetch, request, clearData }) => (
        <MuiDownshift
          items={data && data.items}
          itemCount={data && data.total}
          loadMoreItems={loading ? () => {} : (startIndex, endIndex) => {
            const url = new URL(request.url);
            const params = new URLSearchParams(url.search);
            params.set('startIndex', startIndex);
            params.set('endIndex', endIndex);
            url.search = params.toString();
            return fetch(url.toString())
          }}
          loading={loading}
          onStateChange={changes => {
            //console.log('changes', changes);
            if (changes.hasOwnProperty('inputValue')) {
              clearData();
              fetch(`https://example.com/?q=${changes.inputValue}&startIndex=0&endIndex=20`)
            } else if (changes.hasOwnProperty('isOpen') && data == null) {
              fetch(`https://example.com/?startIndex=0&endIndex=20`)
            }
          }}
        />
      )}
    </MockFetch>
  ))

const queryRegex = /q=(.*)/;
  
class MockFetch extends Component {
  /* Mock consistent fetch responses */
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

      if (searchParams.has('startIndex') || searchParams.has('endIndex')) {
        const startIndex = Number(searchParams.get('startIndex'));
        const endIndex = (Number(searchParams.get('endIndex')) || 9) + 1; // inclusive
        return mockResponse({ total: filteredItems.length, items: filteredItems.slice(startIndex, endIndex) }, 500)
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