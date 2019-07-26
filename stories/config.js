import { configure } from '@storybook/react';

// addDecorator(storyFn => <MuiThemeProvider>{storyFn()}</MuiThemeProvider>);

function loadStories() {
  require('../stories/basic');
  require('../stories/fetch');
}

configure(loadStories, module);
