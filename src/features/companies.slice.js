import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companiesData from "../db/companies";

// Async thunk: simulates API call and returns local companies data
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => companiesData
);

const companiesSlice = createSlice({
  name: "companies",

  // Centralized state for company list UI
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },

  reducers: {},

  // Handles all async thunk states
  extraReducers: (builder) => {
    builder
      // Request started → show loading
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // Request success → update list
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })

      // Request failed → store error
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default companiesSlice.reducer;
