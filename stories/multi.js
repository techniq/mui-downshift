import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StarWarsMultiSelect from './components/StarWarsMultiSelect';

storiesOf('Multi-select', module).add('chips', () => <StarWarsMultiSelect onChange={action('onChange')} />);
