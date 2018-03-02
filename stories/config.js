import { configure, addDecorator } from '@storybook/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// addDecorator(storyFn => <MuiThemeProvider>{storyFn()}</MuiThemeProvider>);

function loadStories() {
  require('../stories/basic');
  require('../stories/fetch');
}

configure(loadStories, module);
