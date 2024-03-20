import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    vote: [],
    loading: false,
    error: null,
    success:false,
  };


  export const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {
      registerRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      },
      registerSuccess: (state, action) => {
        state.loading = false;
        state.vote.push(action.payload)
        state.success = true;
      },
      registerFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
      
      getVoteSuccess:(state,action)=>{
        state.loading = false;
        state.vote = action.payload;
      },
      getVoteRequest:(state,action)=>{
        state.loading = true;
        state.error = null;
  
      },
      getVoteFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    
      },
      updateVote: (state, actions) => {
        const index = state.vote.findIndex((x) => x._id === actions.payload._id);
        state.vote[index] = {
          _id: actions.payload._id,
          name: actions.payload.name,
        };
      },
  
      setUserInfo: (state, action) => {
        state.userInfo = action.payload;
      },

      deletevote: (state, actions) => {
        state.vote.splice(actions.payload, 1);
        
      },
    },
  });
  
  export const { getVoteFail,getVoteRequest,getVoteSuccess,registerFail,registerRequest,registerSuccess,updateVote,deletevote} = voteSlice.actions;
  
  export default voteSlice.reducer;