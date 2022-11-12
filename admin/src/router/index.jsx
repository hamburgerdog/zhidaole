import { Spin } from 'antd';
import React, { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterConfigList } from './config';

const RouterLoding = memo(() => (
  <Spin style={{ width: '100%', padding: '36px 0' }} tip="Loading..." delay={1000} />
));

const AppContentRouter = memo(() => {
  return (
    <Suspense fallback={<RouterLoding />}>
      <Routes>
        {RouterConfigList.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
});

export default AppContentRouter;
