import {registerFail,registerRequest,registerSuccess} from "../reducer/votedReducer"
import axios from 'axios';

export const register = (userID,voterID,email) => async (dispatch) => {
    
    try {
      dispatch(registerRequest());
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const  response = await axios.post('http://localhost:5000/api/votedUser/create', { userID,voterID,email}, config);
      
      dispatch(registerSuccess(response.data));
    } catch (error) {
      dispatch(registerFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
  };
  