import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'smart',
  avatar: 'https://avatars.githubusercontent.com/u/100409110?v=4',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
});

export default userSlice.reducer;
