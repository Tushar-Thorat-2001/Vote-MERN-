import { getVoteFail, getVoteRequest, getVoteSuccess,registerFail,registerRequest,registerSuccess,updateVote,deletevote} from "../reducer/voteReducer";
import axios from 'axios';

export const getVoteDetails = () => async (dispatch, getState) => {
  try {
    dispatch(getVoteRequest());

    const { auth } = getState();
    const { userInfo } = auth;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`http://localhost:5000/api/voter`, config);

    dispatch(getVoteSuccess(data));
  } catch (err) {
    dispatch(getVoteFail(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    ));
  }
};

export const Create = (name) => async (dispatch,getState) => {
  try {
    dispatch(registerRequest());

    const { auth } = getState();
    const { userInfo } = auth;
    console.log(userInfo)

    const config = {
      
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const  response = await axios.post('http://localhost:5000/api/voter/create', {name}, config);
   
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFail(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
};

export const update = (name,id,index)=>async(dispatch,getState)=>{
  try {
    const config = {
      
      headers: {
       
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`http://localhost:5000/api/voter/${id}`,{name},config);
    dispatch(updateVote(res.data))
    
  } catch (error) {
    dispatch(registerFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    
  }
}

export const deleteVote = (id,index)=> async(dispatch,getState)=>{
  try {
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
  
      },
    };
  
    const res = await axios.delete(`http://localhost:5000/api/voter/${id}`,config)
    dispatch(deletevote(index))
    dispatch(getVoteDetails());
  } catch (error) {
    dispatch(registerFail(error.response && error.response.data.message ? error.response.data.message : error.message));
  }

}