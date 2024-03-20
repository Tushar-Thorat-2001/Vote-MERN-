import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  votedInfo: {},
  loading: false,
  error: null,
  success:false,
};

export const votedSlice = createSlice({
  name: 'voted',
  initialState,
  reducers: {

    deleteinfo: (state) => {
      state.votedInfo = {};
    },
    
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.votedInfo= action.payload;
      state.success = true;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
   
    setUserInfo: (state, action) => {
      state.votedInfo = action.payload;
    },
  },
});

export const {  registerRequest, registerSuccess, registerFail,deleteinfo} = votedSlice.actions;

export default votedSlice.reducer;
