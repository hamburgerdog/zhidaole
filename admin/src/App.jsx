import React, { memo } from 'react';
import { HashRouter } from 'react-router-dom';

import { SimpleLayout } from './layout';
import AppContentRouter from './router';

const App = memo(() => {
  return (
    <HashRouter>
      <SimpleLayout>
        <div style={{ padding: 8 }}>
          <AppContentRouter />
        </div>
      </SimpleLayout>
    </HashRouter>
  );
});

export default App;
