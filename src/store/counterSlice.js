import { createSlice } from '@reduxjs/toolkit';

//  redux-toolkit   最佳实践指南
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 666,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
