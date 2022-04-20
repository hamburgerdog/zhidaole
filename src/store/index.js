import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';
import userSlice from './userSlice';

//  注册 redux-store 仓库
export const stroe = configureStore({
  reducer: {
    user: userSlice,
    counter: counterSlice,
  },
});
