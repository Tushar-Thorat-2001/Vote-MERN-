import React, { useEffect } from 'react';
import { logoutUser } from "../actions/userActions";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {deleteinfo} from "../reducer/votedReducer"

const Completed = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

 

 
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(deleteinfo());
    nav("/");
  };

 

  return (
    <div className='text-4xl flex justify-center items-center w-full h-full flex-col '>
      Thank you for voting
      <form onSubmit={handleLogout}>
      <button className='p-5 text-xl m-5 bg-red-500 rounded-lg' type='submit'>
        Logout
      </button>
      </form>
    </div>
  );
};

export default Completed;
