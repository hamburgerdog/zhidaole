import React from 'react';
import { HashRouter } from 'react-router-dom';

import { SimpleLayout } from './layout';
import AppContentRouter from './router';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <SimpleLayout>
          <AppContentRouter />
        </SimpleLayout>
      </HashRouter>
    );
  }
}

export default App;
