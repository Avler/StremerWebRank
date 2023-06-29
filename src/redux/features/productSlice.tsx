import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: { value: { item: [] } },
  reducers: {
    getAllProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
