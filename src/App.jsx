import React, { memo } from 'react';
import { HashRouter } from 'react-router-dom';

import { SimpleLayout } from './layout';
import AppContentRouter from './router';

const App = memo(() => {
  return (
    <HashRouter>
      <SimpleLayout>
        <AppContentRouter />
      </SimpleLayout>
    </HashRouter>
  );
});

export default App;
