import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: { value: { item: [] } },
  reducers: {
    getAllProducts: (state, action) => {
      state.value.item = action.payload.item;
    },
  },
});

export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
