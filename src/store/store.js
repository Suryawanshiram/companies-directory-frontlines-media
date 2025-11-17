import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "../features/companies.slice";

// Global Redux store configuration
const store = configureStore({
  reducer: {
    // Register companies slice under "companies" state key
    companies: companiesReducer,
  },

  // Enable Redux DevTools during development
  devTools: true,
});

export default store;
