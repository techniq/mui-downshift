import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { ListItem, ListItemText, ListItemIcon, ListItemAvatar } from 'material-ui/List';
import PersonIcon from 'material-ui-icons/Person';

import MuiDownshift from '../src';
import StarWarsMultiSelect from './components/StarWarsMultiSelect';



storiesOf('Multi-select', module)
.add('chips', () => (
  <StarWarsMultiSelect
    onChange={action('onChange')}
  />
))