import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLocationsByCompany,
  createLocation,
  updateLocation,
  deleteLocation,
} from './locationsThunks';

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsByCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLocationsByCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchLocationsByCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.items.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.items = state.items.filter((l) => l.id !== action.payload);
      });
  },
});

export default locationsSlice.reducer;
