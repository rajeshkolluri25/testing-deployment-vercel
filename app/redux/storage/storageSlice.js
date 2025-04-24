import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tabValue: null,
  emails: [],
  selectedEmail: {},
  fromForgotPassword: null,
  roleId: "",
  builderDetails: {},
  pathUrl: null,
  page: null,
  query: null,
  menuIndex: null,
  signupEmail: "",
  email: "",
  number: "",
  details: {},
  searchAddress: {},
  searchCity: null,
  amenities: [],
  defaultCity: null,
};

const storageSlice = createSlice({
  name: "tabValue",
  initialState,
  reducers: {
    setTabValue: (state, action) => {
      state.tabValue = action.payload;
    },
    clearTabValue: (state) => {
      state.tabValue = null;
    },
    setFromForgotPassword: (state, action) => {
      state.fromForgotPassword = action.payload;
    },
    ClearFromForgotPassword: (state, action) => {
      state.fromForgotPassword = null;
    },

    setMultipleEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSelectedVerifyMail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    clearSelectedVerifyMail: (state, action) => {
      state.selectedEmail = {};
    },
    clearMultipleEmails: (state, action) => {
      state.emails = [];
    },
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    },
    clearRoleId: (state, action) => {
      state.roleId = "";
    },
    setBuilderDetails: (state, action) => {
      state.builderDetails = action.payload;
    },
    clearBuilderDetails: (state, action) => {
      state.builderDetails = {};
    },
    setSignUpEmail: (state, action) => {
      state.signupEmail = action.payload;
    },
    clearSignUpEmail: (state, action) => {
      state.signupEmail = "";
    },
    setPathUrl: (state, action) => {
      const { pathUrl, page, query, menuIndex } = action.payload;
      state.pathUrl = pathUrl;
      state.page = page;
      state.query = query;
      state.menuIndex = menuIndex;
    },
    setEditDetails: (state, action) => {
      console.log("setEditDetailsLog", action.payload);
      const { number, email, details } = action.payload;
      state.number = number;
      state.email = email;
      state.details = details;
    },
    clearEditDetails: (state, action) => {
      const { number, email, details } = action.payload;
      state.number = null;
      state.email = null;
      state.details = null;
    },

    clearPathUrl: (state) => {
      state.pathUrl = null;
    },
    setSearchAddress: (state, action) => {
      state.searchAddress = action.payload;
    },
    clearSearchAddress: (state) => {
      state.searchAddress = null;
    },
    setSearchCity: (state, action) => {
      state.searchCity = action.payload;
    },
    clearSearchCity: (state) => {
      state.searchCity = null;
    },
    setAmenitiesList: (state, action) => {
      state.amenities = action.payload;
    },
    setDefaultCity: (state, action) => {
      state.defaultCity = action.payload;
    },
    clearDefaultCity: (state) => {
      state.defaultCity = null;
    },
  },
});
export const {
  setTabValue,
  clearTabValue,
  setMultipleEmails,
  clearMultipleEmails,
  setSelectedVerifyMail,
  clearSelectedVerifyMail,
  setFromForgotPassword,
  ClearFromForgotPassword,
  clearRoleId,
  setRoleId,
  setBuilderDetails,
  clearBuilderDetails,
  setPathUrl,
  clearPathUrl,
  setSignUpEmail,
  clearSignUpEmail,
  setEditDetails,
  clearEditDetails,
  setSearchAddress,
  clearSearchAddress,
  setSearchCity,
  clearSearchCity,
  setAmenitiesList,
  setDefaultCity,
  clearDefaultCity,
} = storageSlice.actions;

export default storageSlice.reducer;
