import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "locationSlice",
  initialState: {
    locationDetails: {},
    userLocationDetails: {},
  },
  reducers: {
    setLocationDetails: (state, action) => {
      state.locationDetails = action.payload;
    },
    clearLocationDetails: (state) => {
      state.locationDetails = null;
    },
    setUserLocationDetails: (state, action) => {
      state.userLocationDetails = action.payload;
    },
    clearUserLocationDetails: (state) => {
      state.userLocationDetails = null;
    },
  },
});

export const {
  setLocationDetails,
  clearLocationDetails,
  setUserLocationDetails,
  clearUserLocationDetails,
} = locationSlice.actions;

export default locationSlice.reducer;
