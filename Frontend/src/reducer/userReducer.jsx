import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  loading: false,
  error:null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = {};
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserSuccess:(state,action)=>{
      state.loading = false;
      state.userInfo = action.payload;
    },
    getUserRequest:(state,action)=>{
      state.loading = true;
      state.error = null;

    },
    getUserFail:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
  
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, logout, registerRequest, registerSuccess, registerFail,getUserFail,getUserRequest,getUserSuccess,setUserInfo} = authSlice.actions;

export default authSlice.reducer;
