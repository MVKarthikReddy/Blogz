import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};


const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
      incrementCount: (state) => {
        state.count += 1;
      },
      decrementCount: (state) => {
        state.count -= 1;
      },
      setCount: (state, action) => {
        state.count = action.payload;
      },

    },
});


export const {
  incrementCount,
  decrementCount,
  setCount
    
    } = commentSlice.actions;

export default commentSlice.reducer;