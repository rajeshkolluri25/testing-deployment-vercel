import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: {},
};

const authUserSlice = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    clearAdminData: (state) => {
      state.adminData = {};
    },
   
  },
});

export const {
  setAdminData,
  clearAdminData,
} = authUserSlice.actions;

export default authUserSlice.reducer;
