import React, { Component } from 'react';
import Fetch from 'react-fetch-component';
import fetchMock from 'fetch-mock';

function mockResponse(response, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(response), delay);
  });
}

/* Mock for consistent fetch responses */
class MockFetch extends Component {
  componentWillMount() {
    const { items } = this.props;

    fetchMock.get('*', url => {
      let filteredItems = items;

      const { searchParams } = new URL(url);
      if (searchParams.has('q')) {
        const query = searchParams.get('q');
        if (query) {
          filteredItems = items.filter(item => item.text.toLowerCase().includes(query.toLowerCase()));
        }
      }

      let response = null;
      if (searchParams.has('startIndex') || searchParams.has('stopIndex')) {
        const startIndex = Number(searchParams.get('startIndex'));
        const stopIndex = (Number(searchParams.get('stopIndex')) || 10);
        response = { total: filteredItems.length, items: filteredItems.slice(startIndex, stopIndex) };
      } else {
        response = { total: filteredItems.length, items: filteredItems };
      }
      console.log('fetch', url, response);
      return mockResponse(response, 500);
    });
  }

  componentWillUnmount() {
    fetchMock.restore();
  }

  render() {
    return <Fetch {...this.props} />;
  }
}

export default MockFetch;
