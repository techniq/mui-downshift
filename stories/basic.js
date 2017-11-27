import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Avatar from 'material-ui/Avatar';
import PersonIcon from 'material-ui/svg-icons/social/person';
import { all as starwarsNames } from 'starwars-names';

import MuiDownshift from '../src';

const items = starwarsNames.map((text, value) => ({ text, value }));

export default class StarWarsSelect extends Component {
  state = {
    filteredItems: items,
  }

  handleStateChange = changes => {
    if (changes.hasOwnProperty('inputValue')) {
      const filteredItems = items.filter(
        item => item.text.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems })
    }
  }

  render() {
    const { filteredItems } = this.state;
    return (
      <MuiDownshift
        items={filteredItems}
        onStateChange={this.handleStateChange}
        {...this.props}
      />
    );
  }
}

storiesOf('Basic', module)
  .add('defaults (empty)', () => <MuiDownshift />)
  .add('items only', () => <StarWarsSelect />)
  .add('disabled', () => <StarWarsSelect getInputProps={() => ({ disabled: true })} />)
  .add('loading', () => <StarWarsSelect loading />);

storiesOf('Input', module)
  .add('show menu on focus', () => (
    <StarWarsSelect
      getInputProps={({ openMenu }) => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely',
        onFocus: openMenu,
      })}
      onChange={action('onChange')}
    />
  ))

storiesOf('List item', module)
  .add('default (text only)', () => (
    <StarWarsSelect
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely',
      })}
      onChange={action('onChange')}
    />
  ))
  .add('styled text', () => (
    <StarWarsSelect
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely',
      })}
      getListItemProps={({ item, index }) => ({
        primaryText: <span style={{ color: 'red' }}>{item.text}</span>
      })}
      onChange={action('onChange')}
    />
  ))
  .add('left icon', () => (
    <StarWarsSelect
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely'
      })}
      getListItemProps={({ item, index }) => ({
        primaryText: item.text,
        leftIcon: <PersonIcon />
      })}
      onChange={action('onChange')}
    />
  ))
  .add('left avatar', () => (
    <StarWarsSelect
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely'
      })}
      getListItemProps={({ item, index }) => ({
        primaryText: item.text,
        leftAvatar: <Avatar icon={<PersonIcon />} />
      })}
      onChange={action('onChange')}
    />
  ))
  .add('secondary text', () => (
    <StarWarsSelect
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely'
      })}
      getListItemProps={({ item, index }) => ({
        primaryText: item.text,
        secondaryText: 'character'
      })}
      onChange={action('onChange')}
    />
  ))
  .add('variable props', () => (
    <StarWarsSelect
      getListItemProps={({ item, index }) => {
        return (index % 2) ? {
          primaryText: item.text,
          secondaryText: 'character'
        } : {
          primaryText: item.text,
        }
      }}
      onChange={action('onChange')}
    />
  ))
  .add('all', () => (
    <StarWarsSelect
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely'
      })}
      getListItemProps={({ item, index }) => ({
        primaryText: item.text,
        secondaryText: 'character',
        leftAvatar: <Avatar icon={<PersonIcon />} />
      })}
      onChange={action('onChange')}
    />
  ))
  .add('empty list (filtered)', () => (
    <StarWarsSelect
      items={[]}
      getInputProps={() => ({
        floatingLabelText: 'Star Wars character',
        hintText: 'Choose wisely'
      })}
      getEmptyListItemProps={() => ({
        primaryText: 'No items found',
        style: {
          fontStyle: 'italic',
          color: 'rgba(0,0,0,.5)'
        },
        disabled: true
      })}
      onChange={action('onChange')}
    />
  ))
  .add('long text', () => (
    <StarWarsSelect
      getListItemProps={({ item, index }) => ({
        primaryText: `${item.text} ${item.text} ${item.text} ${item.text}`,
      })}
      onChange={action('onChange')}
    />
  ))
  .add('loading footer', () => {
    const loading = true;
    return (
      <MuiDownshift
        items={[
          { text: 'one' },
          { text: 'two' },
          { text: 'three' },
        ]}
        getFooterListItemProps={() => ({
          primaryText: 'Loading...',
          style: {
            fontStyle: 'italic',
            color: 'rgba(0,0,0,.5)'
          },
          disabled: true
        })}
        loading={loading}
        isOpen={true}
      />
    )
  })

storiesOf('Menu', module)
  .add('isOpen = true', () => (
    <StarWarsSelect
      isOpen={true}
      onChange={action('onChange')}
    />
  ))
  .add('height by item count (3)', () => (
    <StarWarsSelect
      menuItemCount={3}
      onChange={action('onChange')}
    />
  ))
  .add('height by item count (10)', () => (
    <StarWarsSelect
      menuItemCount={10}
      onChange={action('onChange')}
    />
  ))
  .add('height by pixels (315)', () => (
    <StarWarsSelect
      menuHeight={315}
      onChange={action('onChange')}
    />
  ))

storiesOf('VirtualList', module)
  .add('static rowHeight (no CellMeasurer)', () => (
    <StarWarsSelect
      getVirtualListProps={() => ({ rowHeight: 48 })}
      onChange={action('onChange')}
    />
  ))
  .add('dynamic rowHeight (no CellMeasurer)', () => (
    <StarWarsSelect
      getListItemProps={({ item, index }) => {
        return (index % 2) ? {
          primaryText: item.text,
          secondaryText: 'character'
        } : {
          primaryText: item.text,
        }
      }}
      getVirtualListProps={() => {
        return {
          rowHeight: ({ index }) => index % 2 ? 72 : 48 
        }
      }}
      onChange={action('onChange')}
    />
  ))

storiesOf('Root', module)
  .add('change z-index of root', () => (
    <div>
      <StarWarsSelect
        menuItemCount={3}
        onChange={action('onChange')}
        getRootProps={() => ({ style: { zIndex: 1 }})}
      />
      <div style={{ willChange: 'transform', background: '#ddd' }}>`will-change: "transform"` set</div>
    </div>
  ))
  .add('overlapping menus', () => (
    <div>
      <StarWarsSelect
        getInputProps={() => ({
          floatingLabelText: 'Star Wars character',
          hintText: 'Choose wisely'
        })}
        onChange={action('onChange')}
      />
      <StarWarsSelect
        getInputProps={() => ({
          floatingLabelText: 'Star Wars character',
          hintText: 'Choose wisely'
        })}
        onChange={action('onChange')}
      />
    </div>
  ))
