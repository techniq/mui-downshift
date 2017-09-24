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
          items={data}
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
          items={data}
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

const queryRegex = /q=(.*)/;
  
class MockFetch extends Component {
  /* Mock consistent fetch responses */
  componentWillMount() {
    fetchMock.get('*', url => {
      console.log('fetch', url);
      let filteredItems = items;

      if (queryRegex.test(url)) {
        const query = queryRegex.exec(url)[1];
        if (query) {
          filteredItems = items.filter(
            item => item.text.toLowerCase().includes(query.toLowerCase())
          );
        }
      }

      return mockResponse(filteredItems.slice(0, 10), 500)
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